import download from 'image-downloader'
import mime from "mime-types"


export const downloadImage = async (Link, dest) => {
    const mimeType = mime.lookup(Link)
    const contentType = mime.contentType(mimeType)
    const extension = mime.extension(contentType)
    const filename = `${Date.now()}.${extension}`;

    const fullPath = `${dest}${filename}`

    try {
        const options = {
            url: Link,
            dest: fullPath,
        };


        await download.image(options)

        return filename;



    } catch (error) {
        console.log('Erro', error);
    }




}


