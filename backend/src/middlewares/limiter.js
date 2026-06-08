import rateLimit from "express-rate-limit";

const limiter = rateLimit({
    windowMs: 8 * 60 * 1000,
    max: 100,
    message: { 
        status: 429,
        error: "Too many Request"
    }
})

export default limiter