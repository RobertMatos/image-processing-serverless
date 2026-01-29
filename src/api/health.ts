export const handler = async () => {
    return {
        status: 200,
        body: JSON.stringify({
            status: 'ok',
            service: 'image-processing'
        })
    }
}