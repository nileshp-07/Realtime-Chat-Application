import jwt from "jsonwebtoken"

export const sendToken = (res , user, message) => {
   const token = jwt.sign({_id: user._id, username: user.username}, process.env.JWT_SECRET);

   res.status(200).cookie("token", token , {
      maxAge : 10 * 24 * 60 * 60 * 1000,
      sameSite : "none",
      httpOnly : true,
      secure :  true
   }).json({
        success : true,
        message,
        user
   })
}