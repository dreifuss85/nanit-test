import mongoose, { Document, Schema } from "mongoose";

export interface IPost extends Document {
  content: string;
}

const PostSchema = new Schema<IPost>({
  content: { type: String, required: true },
});

export default mongoose.model<IPost>("Post", PostSchema);