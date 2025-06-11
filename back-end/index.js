import express from "express";
import "dotenv/config";
import UserRoutes from "./domains/users/routes.js"
import cors from "cors"
import cookieParser from "cookie-parser";
import PlaceRoutes from "./domains/places/routes.js"
// const express2 = require('express') com require seria assim tem que jogar na const direto!!


const app = express();
const { PORT } = process.env;

app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
}))
app.use("/users", UserRoutes)
app.use("/places", PlaceRoutes)


app.listen(PORT, () => {
    try {
        console.log(`O servido está rodando na porta ${PORT}`)
    } catch {
        console.log('error')
    }
})