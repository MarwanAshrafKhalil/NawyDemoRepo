import path from "path";
import mime from "mime-types";
import { bucketName, s3 } from "./bucketCred";
import { DeleteObjectCommand, PutObjectCommand } from "@aws-sdk/client-s3";

export async function uploadFileToS3(file: Buffer, Name: string) {
  const fileExtension = path.extname(Name);
  const fileName = `${path.basename(
    Name,
    fileExtension
  )}_${Date.now()}${fileExtension}`;
  const contentType = mime.lookup(fileExtension);

  const params = {
    Bucket: bucketName,
    Key: fileName,
    Body: file,
    ContentType: contentType || "application/octet-stream",
  };
  try {
    const command = new PutObjectCommand(params);
    await s3.send(command);
    return { success: true, fileName };
  } catch (error) {
    if (error instanceof Error) {
      return { success: false, error: error.message };
    } else {
      return { success: false, error: "Error occured while uploading media" };
    }
  }
}

export async function deleteFile(imageName: string) {
  const params = {
    Bucket: bucketName,
    Key: imageName,
  };

  try {
    const data = await s3.send(new DeleteObjectCommand(params));

    return data.$metadata.httpStatusCode;
  } catch (error) {
    return {
      success: false,
      message: "Failed to delete/find existing image",
      error: error,
    };
  }
}
