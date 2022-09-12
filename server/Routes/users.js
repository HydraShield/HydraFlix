import express from "express";
import Users from "../mongodb/Users.js";
import bcrypt from "bcrypt";
import verify from "../utils/Jwtverify.js";

const router = express.Router();

router.put("/:id", verify, async (req, res) => {
    if (req.user.id === req.params.id || req.user.isAdmin) {
        if (req.body.password) {
            const salt = await bcrypt.genSalt(10);
            req.body.password = await bcrypt.hash(req.body.password, salt);
        }

        try {
            const updatedUser = await Users.findByIdAndUpdate(
                req.params.id,
                { $set: req.body },
                { new: true },
            );
            const { password, ...info } = updatedUser._doc;
            res.status(200).json(info);

        } catch (e) {
            res.status(500).json(e);
        }
    }
    else {
        res.status(403).json("You are unauthorized!")
    }
});

router.delete("/:id", verify, async (req, res) => {
    if (req.user.id === req.params.id || req.user.isAdmin) {
        try {
            await Users.findByIdAndDelete(req.params.id);
            res.status(200).json("User has been deleted...");

        } catch (e) {
            res.status(500).json(e);
        }
    }
    else {
        res.status(403).json("You are unauthorized!")
    }
});

router.get("/find/:id", async (req, res) => {
    try {
        const user = await Users.findById(req.params.id);
        const { password, ...info } = user._doc;
        res.status(200).json(info);

    } catch (e) {
        res.status(500).json(e);
    }
});

router.get("/", verify, async (req, res) => {
    const query = req.query.new;
    if (req.user.isAdmin) {
        try {
            const users = query ?
                await Users.find().sort({ _id: -1 }).limit(5) :
                await Users.find();
            res.status(200).json(users);

        } catch (e) {
            res.status(500).json(e);
        }
    }
    else {
        res.status(403).json("You are unauthorized!")
    }
});

router.get("/stats", async (req, res) => {
    const today = new Date();
    const latYear = today.setFullYear(today.setFullYear() - 1);

    try {
        const data = await Users.aggregate([
            {
                $project: {
                    month: { $month: "$createdAt" },
                },
            },
            {
                $group: {
                    _id: "$month",
                    total: { $sum: 1 },
                },
            },
        ]);
        res.status(200).json(data)
    } catch (err) {
        res.status(500).json(err);
    }
});

export default router;