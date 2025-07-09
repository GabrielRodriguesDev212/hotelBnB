import { Router } from "express";
import { connectDb } from "../../config/db.js"
import Booking from "./model.js"
import { JWTVerify } from "../../utils/jwt.js";


const router = Router();


router.get('/', async (req, res) => {
    connectDb()

    try {

        const { _id: id } = await JWTVerify(req)

        try {
            const bookingsDocs = await Booking.find({ user: id }).populate('place')
            res.json(bookingsDocs)

        } catch (error) {
            console.log(error)
            res.status(500).json("Deu erro ao encontrar as comodidades reservada do usuário")
        }



    } catch (error) {
        console.log(error)
        res.status(500).json("Deu erro ao encontrar o usuário")
    }





})

router.post('/', async (req, res) => {

    connectDb()

    const { place, user, price, total, checkin, checkout, guests, nights } = req.body

    try {


        const bookingDoc = await Booking.create({
            place,
            user,
            price,
            total,
            checkin,
            checkout,
            guests,
            nights
        })

        res.json(bookingDoc)

    } catch (error) {
        res.status(500).json("Erro ao criar a reserva", error)
    }


})



export default router;