import { S3Client } from "@aws-sdk/client-s3";
import { PutObjectCommand } from "@aws-sdk/client-s3";

const REGION = "us-east-1";

export default async function uploadFile(
  name: string,
  mimetype: string,
  buffer: Buffer
): Promise<void> {
  const s3Client = new S3Client({ region: REGION });

  const params = {
    Bucket: "ww3-bucket",
    Key: name,
    Body: buffer,
    ACL: "public-read",
    ContentType: mimetype,
  };

  console.log("uploading the file", name);

  try {
    await s3Client.send(new PutObjectCommand(params));
    console.log(
      "Successfully created " +
        params.Key +
        " and uploaded it to " +
        params.Bucket +
        "/" +
        params.Key
    );
  } catch (err) {
    console.log("Error", err);
  }
}
