import express from "express";
import MongoConnect from "./mongodb/MongoConnect.js";
import dotenv from "dotenv";
import authRoute from "./Routes/auth.js";
import userRouter from "./Routes/users.js";
import movieRouter from "./Routes/movies.js";
import listRouter from "./Routes/lists.js";

const app = express();
app.use(express.json());
dotenv.config();

MongoConnect();

app.use("/api/auth", authRoute);
app.use("/api/users", userRouter);
app.use("/api/movies", movieRouter);
app.use("/api/lists", listRouter);

app.listen(3030, () => console.log("server running at 3030"));
