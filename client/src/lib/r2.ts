import { S3Client } from "@aws-sdk/client-s3";
import { ENDPOINT, ACCESS_KEY_ID, SECRET_ACCESS_KEY } from "./constants";

export const r2Client = new S3Client({
  region: "auto",
  endpoint: ENDPOINT,
  credentials: {
    accessKeyId: ACCESS_KEY_ID,
    secretAccessKey: SECRET_ACCESS_KEY,
  },
});
