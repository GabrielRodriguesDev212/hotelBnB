
import "dotenv/config";


import { app } from "./server.js";

// const express2 = require('express') com require seria assim tem que jogar na const direto!!



const { PORT } = process.env;


app.listen(PORT, () => {
    try {
        console.log(`O servido está rodando na porta ${PORT}`)
    } catch {
        console.log('error')
    }
})