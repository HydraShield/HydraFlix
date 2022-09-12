import express from "express";
import Users from "../mongodb/Users.js";
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";

const router = express.Router();

router.post("/register", async (req, res) => {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(req.body.password, salt);

    const newUser = new Users({
        username: req.body.username,
        email: req.body.email,
        password: hash,
    })

    try {
        const user = await newUser.save();
        const { password, ...info } = user._doc;
        res.status(201).json(info);
    } catch (e) {
        res.status(500).json(e);
    }
});

router.post("/login", async (req, res) => {
    try {
        const user = await Users.findOne({ email: req.body.email });
        if (!user) {
            res.status(401).json("Invalid credential");
            return;
        }

        const flag = await bcrypt.compare(req.body.password, user.password);
        if (!flag) {
            res.status(401).json("Invalid credential");
            return;
        }

        const accessToken = jwt.sign(
            { id: user._id, isAdmin: user.isAdmin },
            process.env.SECRET,
            { algorithm: "HS256", expiresIn: "5d" }
        );

        const { password, ...info } = user._doc;
        res.status(200).json({...info, accessToken});

    } catch (e) {
        res.status(500).json(e);
    }
});

export default router;