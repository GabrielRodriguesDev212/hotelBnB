import "dotenv/config";
import mongoose from "mongoose";


const { MONGO_URL } = process.env


export const connectDb = async () => {

    try {
        await mongoose.connect(MONGO_URL);
        console.log(`O banco de dados foi conectado!`)
    } catch (error) {
        console.log(`Deu algum erro ao conectar!`, error)
    }

}


// try {
//     mongoose.connect(MONGO_URL);
//     console.log(`O banco de dados foi conectado!`)
// } catch (error) {
//     console.log(`Deu algum erro ao conectar!`, error)
// }