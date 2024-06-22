export const errorMiddleware = (err, req, res, next) => {
    const message = err.message || "Internal Server Error"
    const statusCode = err.status || 500

    return res.status(statusCode).json({
        success : false,
        message : message
    })
}