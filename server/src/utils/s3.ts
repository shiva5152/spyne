
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import dotenv from 'dotenv'
dotenv.config();

const bucketName = process.env.AWS_BUCKET_NAME;
const region = process.env.AWS_BUCKET_REGION;
const accessKeyId = process.env.AWS_ACCESS_KEY;
const secretAccessKey = process.env.AWS_SECRET_KEY;

// console.log(bucketName, region, accessKeyId, secretAccessKey);



export const getSignedUrlForUpload = async (fileName: string, userId: string) => {
    if (!bucketName || !region || !accessKeyId || !secretAccessKey) {
        throw new Error('S3 client not initialized');
    }

    const s3Client = new S3Client({
        region: region || "",
        credentials: {
            accessKeyId: accessKeyId || "",
            secretAccessKey: secretAccessKey || "",
        },
    });
    const s3key = `discussion/${userId + fileName}`
    const command = new PutObjectCommand({
        Bucket: bucketName,
        Key: s3key,
    });

    const signedUrl = await getSignedUrl(s3Client, command, { expiresIn: 3600 });
    const objectUrl = `https://${bucketName}.s3.${region}.amazonaws.com/${s3key}`;

    return { url: signedUrl, objectUrl };
};
