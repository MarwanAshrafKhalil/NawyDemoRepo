import { Router, Request, Response } from "express";
import pool from "../db";
import multer from "multer";
import zlib from "zlib";
import { uploadFileToS3 } from "../utils/uploadMedia";
import { bucketName, s3 } from "../utils/bucketCred";
import { GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

const router = Router();
const upload = multer();
router.get("/", async (req: Request, res: Response) => {
  res.json("route is working!");
});

router.get("/all", async (req: Request, res: Response) => {
  try {
    const client = await pool.connect();
    await client.query("BEGIN");

    const query = "SELECT * FROM apartments";
    const result = await pool.query(query);
    client.release();

    for (const apartment of result.rows) {
      const getObjectParams = {
        Bucket: bucketName,
        Key: apartment.imagename,
      };

      const fetchURL = new GetObjectCommand(getObjectParams);
      const url = await getSignedUrl(s3, fetchURL);
      apartment.Url = url;
    }

    res.json(result.rows);
  } catch (err) {
    console.error("Error fetching apartments:", err);
    res.status(500).send({ error: "Server Error" });
  }
});

router.get("/unit/:id", async (req: Request, res: Response) => {
  const apartmentId = req.params.id;
  try {
    const client = await pool.connect();
    await client.query("BEGIN");

    const query = `SELECT * FROM apartments WHERE id =${apartmentId}`;
    const result = await pool.query(query);
    client.release();

    for (const apartment of result.rows) {
      const getObjectParams = {
        Bucket: bucketName,
        Key: apartment.imagename,
      };

      const fetchURL = new GetObjectCommand(getObjectParams);
      const url = await getSignedUrl(s3, fetchURL);
      apartment.Url = url;
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.error("Error fetching apartments:", err);
    res.status(500).send({ error: "Server Error" });
  }
});

router.post(
  "/add",
  upload.single("image"),
  async (req: Request, res: Response) => {
    const {
      apt_name,
      apt_city,
      bedrooms_count,
      bathrooms_count,
      area_m2,
      installment_plan: installment_period,
      apt_price,
      apt_delivery_date,
      compound,
    } = req.body;

    const apt_country = "Egypt";

    const file = req.file;
    if (!file) {
      return res.status(400).json({ error: "No file Uploaded" });
    }

    const buffer = Buffer.from(await file.buffer);
    const imageRes = await uploadFileToS3(buffer, file.originalname);

    if (!imageRes.success) {
      return res.status(500).json({
        success: false,
        message: "Error while uploading media.",
        error: imageRes.error,
      });
    }

    const imageName = imageRes.fileName;

    try {
      const client = await pool.connect();
      await client.query("BEGIN");
      const query = `
      INSERT INTO apartments (
        apt_name,
        apt_city,
        apt_country,
        bedrooms_count,
        bathrooms_count,
        area_m2,
        installment_period,
        apt_price,
        apt_delivery_date,
        compound,
        imagename
     
          ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9,$10,$11)
          RETURNING *;
        `;
      const values = [
        apt_name,
        apt_city,
        apt_country,
        bedrooms_count,
        bathrooms_count,
        area_m2,
        installment_period,
        apt_price,
        apt_delivery_date,
        compound,
        imageName,
      ];

      const result = await pool.query(query, values);
      await client.query("COMMIT");
      client.release();
      res.json(result.rows[0]);
    } catch (err) {
      console.error(err);
      res.status(500).send("Server Error");
    }
  }
);
export default router;
