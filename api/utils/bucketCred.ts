import { S3Client } from "@aws-sdk/client-s3";
import dotenv from "dotenv";
dotenv.config();

export const bucketName = process.env.BUCKET_NAME;
export const bucketRegion = process.env.BUCKET_REGION;
export const accessKey = process.env.ACCESS_KEY;
export const secretAccesskey = process.env.SECRET_ACCESS_KEY;

export const s3 = new S3Client({
  credentials: {
    accessKeyId: accessKey || "",
    secretAccessKey: secretAccesskey || "",
  },
  region: bucketRegion || "us-east-1",
});
