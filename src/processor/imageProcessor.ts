import {GetObjectCommand, PutObjectCommand, S3Client} from "@aws-sdk/client-s3";
import { S3Event } from "aws-lambda";
import sharp from "sharp";

const s3 = new S3Client({});

export const handler = async (event: S3Event) => {
    for (const record of event.Records) {
        const bucket = record.s3.bucket.name;
        const key = decodeURIComponent(record.s3.object.key.replace(/\+/g, ' '));

        console.log("processing: ", bucket, key);

       // Baixar imagem original
       const originalObject = await s3.send(
           new GetObjectCommand({
               Bucket: bucket,
               Key: key
           })
       );

       const imageBuffer = await streamToBuffer(originalObject.Body as any);

       const processedImage = await sharp(imageBuffer)
           .resize(1024)
           .jpeg({quality: 80})
           .toBuffer();

       const outputKey = `processed/${key.split('/').pop()}`

       // Salvar no bucket que que criei de imagme processada
       await s3.send(
           new PutObjectCommand({
               Bucket: process.env.PROCESSED_BUCKET!,
               Key: outputKey,
               Body: processedImage,
               ContentType: 'image/jpeg'
           })
       );

       console.log("Saved: ", outputKey);
    }
}

const streamToBuffer = async (stream: any): Promise<Buffer> => {
    const chunks: any[] = [];

    for await (const chunk of stream) {
        chunks.push(chunk);
    }

    return Buffer.concat(chunks);
}