import Post, { IPost } from "../models/postsModel";

export class PostRepository {
  async createPost(content: string): Promise<IPost> {
    const newPost = new Post({ content });
    return await newPost.save();
  }

  async getAllPosts(): Promise<IPost[]> {
    return await Post.find();
  }
}
