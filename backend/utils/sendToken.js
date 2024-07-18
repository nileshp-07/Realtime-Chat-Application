import jwt from "jsonwebtoken"

export const sendToken = (res , user, message) => {
   const token = jwt.sign({_id: user._id, username: user.username}, process.env.JWT_SECRET);
   console.log(process.env.NODE_ENV)
   res.status(200).cookie("token", token , {
      maxAge: 10 * 24 * 60 * 60 * 1000, // 10 days in milliseconds
      sameSite: 'lax',
      httpOnly: true,
      secure: false 
   }).json({
        success : true,
        token,
        message,
        user
   })
}