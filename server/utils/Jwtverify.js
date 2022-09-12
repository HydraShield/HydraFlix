import jwt from "jsonwebtoken";

const verify = (req, res, next) => {
    const authHeader = req.headers.token;
    if (authHeader && authHeader.startsWith("Berear ")) {
        const token = authHeader.substring(7);

        jwt.verify(token, process.env.SECRET, (err, user) => {
            if(err){
                res.status(403).json("Invalid token");
            }
            else{
                req.user = user;
                next();
            }
        });
    } else {
        return res.status(401).json("you are not Authenticated!");
    }
};

export default verify;