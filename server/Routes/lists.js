import express from "express";
import verify from "../utils/Jwtverify.js";
import List from "../mongodb/List.js";

const router = express.Router();

router.post("/", verify, async (req, res) => {
    if (req.user.isAdmin) {
        const newList = new List(req.body);
        try {
            const list = await newList.save();
            res.status(201).json(list);
        } catch (error) {
            res.status(500).json(error);
        }
    }
    else {
        res.status(403).json("Only admin can access!")
    }
});

router.delete("/:id", verify, async (req, res) => {
    if (req.user.isAdmin) {
        try {
            await List.findByIdAndDelete(req.params.id);
            res.status(200).json("List has been deleted");
        } catch (error) {
            res.status(500).json(error);
        }
    }
    else {
        res.status(403).json("Only admin can access!")
    }
});

router.get("/find/:id", verify, async (req, res) => {
    try {
        const list = await List.findById(req.params.id);
        res.status(200).json(list);
    } catch (error) {
        res.status(500).json(error);
    }
});

router.get("/", verify, async (req, res) => {
    const typeQuery = req.query.type;
    const gerneQuery = req.query.genre;
    let list = [];
    try {
        if (typeQuery) {
            if (gerneQuery) {
                list = await List.aggregate([
                    { $sample: { size: 10 } },
                    { $match: { type: typeQuery, genre: gerneQuery } }
                ]);
            }
            else {
                list = await List.aggregate([
                    { $sample: { size: 10 } },
                    { $match: { type: typeQuery } }
                ]);
            }
        }
        else {
            list = await List.aggregate([
                { $sample: { size: 10 } }
            ])
        }
        res.status(200).json(list);
    } catch (error) {
        res.status(500).json(error);
    }
});

export default router;