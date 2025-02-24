import { PostRepository } from "../repositories/postRepository";
import { IPost } from "../models/postsModel";

export class PostService {
  private postRepository: PostRepository;

  constructor() {
    this.postRepository = new PostRepository();
  }

  async createPost(content: string): Promise<IPost> {
    if (!content) {
      throw new Error("Missing required fields");
    }
    return await this.postRepository.createPost(content);
  }

  async getAllPosts(): Promise<IPost[]> {
    return await this.postRepository.getAllPosts();
  }
}
