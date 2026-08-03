import { mockStandalonePosts } from "@/src/mocks/posts";
import type { StandalonePost, PostKind } from "@/src/types/domain";

export class PostService {
  async getFeaturedPosts(): Promise<StandalonePost[]> {
    return Promise.resolve(mockStandalonePosts);
  }

  async searchPosts(options?: {
    kind?: PostKind | "all";
    query?: string;
  }): Promise<StandalonePost[]> {
    let results = mockStandalonePosts;

    if (options?.kind && options.kind !== "all") {
      results = results.filter((post) => post.kind === options.kind);
    }

    if (options?.query) {
      const q = options.query.toLowerCase();
      results = results.filter(
        (post) =>
          post.content.toLowerCase().includes(q) ||
          post.title?.toLowerCase().includes(q) ||
          post.authorName.toLowerCase().includes(q),
      );
    }

    return Promise.resolve(results);
  }
}

export const postService = new PostService();
