import { Router } from "express";
import { connectDb } from "../../config/db.js"
import Place from "./model.js"
import { JWTVerify } from "../../utils/jwt.js";
import { sendToS3, uploadImage, downloadImage } from "./controller.js"

const router = Router();




router.post('/', async (req, res) => {
    connectDb()

    const {
        title,
        city,
        photos,
        description,
        extras,
        perks,
        price,
        checkin,
        checkout,
        guests } = req.body

    try {

        const { _id } = await JWTVerify(req)

        const newplaceDoc = await Place.create({
            owner: _id,
            title,
            city,
            photos,
            description,
            extras,
            perks,
            price,
            checkin,
            checkout,
            guests

        })

        res.json(newplaceDoc)
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }

})

router.post('/upload/link', async (req, res) => {


    const { link } = req.body
    try {
        const { filename, fullPath, mimeType } = await downloadImage(link)


        const fileURL = await sendToS3(filename, fullPath, mimeType)

        res.json(fileURL)
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }

})

router.post('/upload', uploadImage().array('files', 10), async (req, res) => {
    const { files } = req

    const filesPromise = new Promise((resolve, reject) => {

        const fileURLArray = []
        files.forEach(async (file, index) => {
            const { filename, path, mimetype } = file


            try {
                const fileURL = await sendToS3(filename, path, mimetype)

                fileURLArray.push(fileURL)


            } catch (error) {
                console.log('Deu algum erro ao subir para o S3', error)
                reject(error)

            }
        })

        const idInterval = setInterval(() => {
            if (files.length === fileURLArray.length) {
                clearInterval(idInterval)

                resolve(fileURLArray)
            }
        }, 100)



    })

    const fileURLArrayResolve = await filesPromise;

    res.json(fileURLArrayResolve)
})


export default router;