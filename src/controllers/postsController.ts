import { Request, Response, RequestHandler } from "express";
import Post, { IPost } from "../models/postsModel";
import { v4 as uuidv4 } from "uuid";

export const createPost: RequestHandler = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const { content } = req.body;

  if (!content) {
    res.status(400).json({ message: "Missing required fields" });
    return;
  }

  const newPost: IPost = new Post({ content });
  await newPost.save();

  res.sendStatus(201);;
};

export const getPosts = async (req: Request, res: Response) => {
  const posts = await Post.find();
  res.json(posts);
};
