import { Router } from "express"
import { connectDb } from "../../config/db.js"
import User from "./model.js"
const router = Router()
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import 'dotenv/config'
import { JWTSign, JWTVerify } from "../../utils/jwt.js"



const bcryptSalt = bcrypt.genSaltSync();
router.get('/', async (req, res) => {
    connectDb();

    try {
        const userDoc = await User.find()
        res.json(userDoc)
    } catch (error) {
        res.status(500).json(error)

    }

})

router.get('/profile', async (req, res) => {
    const { token } = req.cookies

    if (token) {
        const userInfo = await JWTVerify(req)
        res.json(userInfo)
    }
})



router.post('/', async (req, res) => {
    connectDb();

    try {

        const { name, email, password } = req.body
        const encryptedPassword = bcrypt.hashSync(password, bcryptSalt)

        const newUserDoc = await User.create({
            name,
            email,
            password: encryptedPassword,
        })
        const { _id } = newUserDoc
        const newObjUser = { name, email, _id }




        try {
            const token = await JWTSign(newObjUser)
            res.cookie('token', token).json(newObjUser);
        } catch (error) {
            res.status(500).json('Erro ao assinar o JWT', error)
        }

    } catch (error) {
        res.status(500).json(error)
    }

})

router.post('/login', async (req, res) => {
    connectDb();

    const { email, password } = req.body //Pega a requisão do corpo da seção em JSON e destrutura




    try {
        const userDoc = await User.findOne({ email })

        if (userDoc) {
            const passwordCorrect = bcrypt.compareSync(password, userDoc.password)
            const { name, _id } = userDoc;


            if (passwordCorrect) {
                const newObjUser = { name, email, _id }

                try {
                    const token = await JWTSign(newObjUser)
                    res.cookie('token', token).json(newObjUser)

                } catch (error) {

                    res.status(500).json('Erro ao assinar o JWT', error)
                }


            } else {

                res.status(400).json('Senha incorreta!')
            }

        } else {
            res.status(400).json("Usuário não encontrado!")
        }

    } catch (error) {
        res.status(500).json(error)
    }


})


router.post('/logout', async (req, res) => {
    res.clearCookie("token").json("Deslogado com sucesso!")
})

export default router;