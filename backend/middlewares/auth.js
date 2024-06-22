import jwt from "jsonwebtoken"

const isAuthenticated = (req, res, next) => {
    const token = req.cookies.token;

    if(!token){
        return res.status(401).json({
            success: false,
            message : "Token is not found, please login first"
        })
    }

    const decodedPayload = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decodedPayload;
    next();
}


export {isAuthenticated};   //another way to export