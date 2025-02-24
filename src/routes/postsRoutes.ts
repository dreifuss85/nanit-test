import express from "express";
import {
  createPost,
  getPosts,
} from "../controllers/postsController";

const router = express.Router();

router.post("/post", createPost);
router.get("/post", getPosts);

export default router;
