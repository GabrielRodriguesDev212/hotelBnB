import express from "express";
import "dotenv/config";
import UserRoutes from "./domains/users/routes.js"
import cors from "cors"

const app = express();
const { PORT } = process.env;

app.use(express.json())
app.use(cors())
app.use("/users", UserRoutes)


app.listen(PORT, () => {
    try {
        console.log(`O servido está rodando na porta ${PORT}`)
    } catch {
        console.log('error')
    }
})