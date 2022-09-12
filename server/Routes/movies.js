import express from "express";
import verify from "../utils/Jwtverify.js";
import Movie from "../mongodb/Movies.js";

const router = express.Router();

router.post("/", verify, async (req, res) => {
    if (req.user.isAdmin) {
        const newMovie = new Movie(req.body);
        try {
            const movie = await newMovie.save();
            res.status(201).json(movie);
        } catch (error) {
            res.status(500).json(error);
        }
    }
    else {
        res.status(403).json("Only admin can access!")
    }
});

router.put("/:id", verify, async (req, res) => {
    if (req.user.isAdmin) {
        try {
            const movie = await Movie.findByIdAndUpdate(
                req.params.id,
                { $set: req.body },
                { new: true }
            );
            res.status(200).json(movie);
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
            await Movie.findByIdAndDelete(req.params.id);
            res.status(200).json("Movie has been Deleted");
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
        const movie = await Movie.findById(req.params.id);
        res.status(200).json(movie);
    } catch (error) {
        res.status(500).json(error);
    }
});

router.get("/random", verify, async (req, res) => {
    const type = req.query.type;
    try {
        let movie;
        if (type === "series") {
            movie = await Movie.aggregate([
                { $match: { isSeries: true } },
                { $sample: 1 }
            ]);
        } else {
            movie = await Movie.aggregate([
                { $match: { isSeries: false } },
                { $sample: 1 }
            ]);
        }

        res.status(200).json(movie);
    } catch (error) {
        res.status(500).json(error);
    }
});

router.get("/", verify, async (req, res) => {
    if (req.user.isAdmin) {
        try {
            const movies = await Movie.find();
            res.status(200).json(movies.reverse());
        } catch (error) {
            res.status(500).json(error);
        }
    }
    else {
        res.status(403).json("Only admin can access!")
    }
});

export default router;