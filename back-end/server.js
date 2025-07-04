import express from "express";
import UserRoutes from "./domains/users/routes.js"
import cors from "cors"
import cookieParser from "cookie-parser";
import PlaceRoutes from "./domains/places/routes.js"
import { fileURLToPath } from "url";
import { dirname } from "path";
export const app = express();


export const __filename = fileURLToPath(import.meta.url)
export const __dirname = dirname(__filename)




app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
}))
app.use("/users", UserRoutes)
app.use("/places", PlaceRoutes)

app.use('/tmp', express.static(__dirname + "/tmp"))
