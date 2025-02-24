import { Request, Response, RequestHandler } from "express";
import { PostService } from "../services/postService";

const postService = new PostService();

export const createPost: RequestHandler = async (req: Request, res: Response) => {
  try {
    const { content } = req.body;
    const post = await postService.createPost(content);
    res.status(201).json(post);
  } catch (error: Error | unknown) {
    handleError(error, res);
  }
};

export const getPosts: RequestHandler = async (req: Request, res: Response) => {
  try {
    const posts = await postService.getAllPosts();
    res.json(posts);
  } catch (error: Error | unknown) {
    handleError(error, res);
  }
};

const handleError = (error: Error| unknown, res: Response) => {
  if (error instanceof Error) {
    return res.status(400).json({ message: error.message });
  }
  res.status(500).json({ message: "An unknown error occurred" });
}
