import { DataSource } from "apollo-datasource";
import { getClient } from "./client";

class PostAPI extends DataSource {
  postReducer(post: {
    id: any;
    title: any;
    description: any;
    lng: any;
    lat: any;
    url: any;
    author: any;
  }) {
    return {
      id: post.id,
      title: post.title,
      description: post.description,
      lng: post.lng,
      lat: post.lat,
      url: post.url,
      author: post.author,
    };
  }

  async getAllPosts() {
    const client = await getClient();
    try {
      const res = await client.query(
        "SELECT * FROM posts, users WHERE username = author;"
      );
      client.release();
      return Promise.all(res.rows.map((post) => this.postReducer(post)));
    } catch (e) {
      console.error(e.stack);
      return [];
    }
  }

  async getPostById({ postId }: { postId: any }) {
    const text = "SELECT * FROM posts WHERE id = $1;";
    const values = [postId];
    const client = await getClient();
    try {
      const res = await client.query(text, values);
      client.release();
      return this.postReducer(res.rows[0]);
    } catch (e) {
      console.error(e.stack);
      client.release();
      return null;
    }
  }

  async submitPost(args: {
    user: string;
    title: any;
    description: any;
    lng: any;
    lat: any;
    url: any;
  }) {
    console.log("username " + args.user);

    const text =
      "INSERT INTO posts(title, description, lng, lat, author, url) VALUES($1, $2, $3, $4, $5, $6) RETURNING *";
    const values = [
      args.title,
      args.description,
      args.lng,
      args.lat,
      args.user,
      args.url,
    ];
    const client = await getClient();

    try {
      const res = await client.query(text, values);
      client.release();
      console.log("res " + JSON.stringify(res));
      const post = this.postReducer(res.rows[0]);
      return { success: true, message: "ok", postId: post.id };
    } catch (e) {
      console.error(e.stack);
      client.release();
      return { success: false, message: "Internal server error." };
    }
  }
}

export default PostAPI;
