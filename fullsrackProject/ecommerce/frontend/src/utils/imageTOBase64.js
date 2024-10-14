export const imageTOBase64 = async(image) => {
    const render = new FileReader();
    render.readAsDataURL(image);
     let dataUrl = await new Promise ((resolve, reject) => {
         render.onload = () => {
             resolve(render.result)
         }
         render.onerror = (error) => {
             reject(error)
         }
     })
    return dataUrl
}