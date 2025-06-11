
import jwt from "jsonwebtoken"
import 'dotenv/config'


const { JWT_SECRET_KEY } = process.env
export const JWTVerify = (req) => {

    const { token } = req.cookies

    if (token) {
        return new Promise((resolve, reject) => {

            jwt.verify(token, JWT_SECRET_KEY, {}, (error, userInfo) => {

                if (error) {
                    console.log("Deu algum erro:", error)
                    reject(error)
                }

                resolve(userInfo)

            });




        })



    } else {
        return null

    }


}

export const JWTSign = (newObjUser) => {
    return new Promise((resolve, reject) => {

        jwt.sign(newObjUser, JWT_SECRET_KEY, { expiresIn: "2d" }, (error, token) => {
            if (error) {
                console.log("Deu algum erro:", error)
                reject(error)
            }

            resolve(token)
        })

    })

}