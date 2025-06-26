import "dotenv/config";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import fs from "fs";
import multer from "multer";
import { __dirname } from "../../server.js";
import download from 'image-downloader'
import mime from "mime-types"

const getExtension = (path) => {
    const mimeType = mime.lookup(path)
    const contentType = mime.contentType(mimeType)
    const extension = mime.extension(contentType)

    return extension
}

const { S3_ACESS_KEY, S3_SECRET_KEY, BUCKET } = process.env;




export const sendToS3 = async (filename, path, mimetype) => {

    const client = new S3Client({
        region: "us-east-2", credentials: {
            accessKeyId: S3_ACESS_KEY,
            secretAccessKey: S3_SECRET_KEY,
        }
    });



    const command = new PutObjectCommand({
        Bucket: BUCKET,
        Key: filename,
        Body: fs.readFileSync(path),
        ContentType: mimetype,
        ACL: 'public-read',
    });

    try {
        await client.send(command)
        return `https://${BUCKET}.s3.us-east-2.amazonaws.com/${filename}`
    } catch (error) {

        console.log(error)
    }


}

export const downloadImage = async (Link) => {

    const extension = getExtension(Link)
    const destination = `${__dirname}/tmp/`
    const filename = `${Date.now()}.${extension}`;

    const fullPath = `${destination}${filename}`

    try {
        const options = {
            url: Link,
            dest: fullPath,
        };


        await download.image(options)

        return { filename, fullPath };



    } catch (error) {
        console.log('Erro', error);
    }




}


export const uploadImage = () => {
    const storage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, `${__dirname}/tmp/`)
        },
        filename: function (req, file, cb) {
            const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
            const extension = getExtension(file.originalname)
            cb(null, `${uniqueSuffix}.${extension}`)
        }
    })


    return multer({ storage: storage })
}

