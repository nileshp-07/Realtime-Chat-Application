import {ZodError} from "zod"

const validateSchema = (schema) => (req, res , next) => {
    try{
        // Validate request body
        if (req.body && Object.keys(req.body).length > 0) {
            schema.parse(req.body);
        }
    
        // Validate query parameters
        if (req.query && Object.keys(req.query).length > 0) {
            schema.parse(req.query);
        }
  


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