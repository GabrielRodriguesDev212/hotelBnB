import { Router } from "express";
import { connectDb } from "../../config/db.js"
import Place from "./model.js"
import { JWTVerify } from "../../utils/jwt.js";

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


export default router;