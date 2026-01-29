import { APIGatewayProxyHandler } from 'aws-lambda';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

const s3 = new S3Client({});

export const handler: APIGatewayProxyHandler = async () => {
    const key = `uploads/${Date.now()}.jpg`;

    const command = new PutObjectCommand({
        Bucket: process.env.ORIGINAL_BUCKET!,
        Key: key,
        ContentType: 'image/jpeg',
    });

    const uploadUrl = await getSignedUrl(s3, command, {
        expiresIn: 60,
    });

    return {
        statusCode: 200,
        body: JSON.stringify({
            uploadUrl,
            key,
        }),
    };
};
