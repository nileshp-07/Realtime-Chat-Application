import {ZodError} from "zod"

const validateSchema = (schema) => (req, res , next) => {
    try{
        schema.parse(req.body);

        next();
    }
    catch(error)
    {
        if(error instanceof ZodError)
            {
                return res.status(400).json({
                    error :  error.issues[0].message
                })
            }
    }
}

export default validateSchema;