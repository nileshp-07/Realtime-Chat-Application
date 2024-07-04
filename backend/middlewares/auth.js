import jwt from "jsonwebtoken"

const isAuthenticated = (req, res, next) => {
    const token = req.cookies.token ||
                    req.body.token  ||
                    req.header("Authorization").replace("Bearer ", "");


    if(!token){
        return res.status(401).json({
            success: false,
            message : "Token is not found, please login first"
        })
    }
    console.log(token);

    const decodedPayload = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decodedPayload;
    next();
}


export {isAuthenticated};   //another way to export