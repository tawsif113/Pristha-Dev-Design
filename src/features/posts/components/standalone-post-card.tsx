import type { StandalonePost } from "@/src/types/domain";
import { Icon } from "@/src/components/ui/icon";

export function StandalonePostCard({ post }: { post: StandalonePost }) {
  const isThought = post.kind === "thought";

  return (
    <article className={`standalone-post-card ${post.kind}`}>
      <div className="post-header">
        <div className="post-author-info">
          <span className="author-avatar">
            {post.authorAvatar || post.authorName.charAt(0)}
          </span>
          <div>
            <strong className="author-name" lang="bn">
              {post.authorName}
            </strong>
            <small className="author-handle">@{post.authorUsername}</small>
          </div>
        </div>
        <div className="post-meta">
          {post.readingTimeMinutes && (
            <span className="post-read-time" lang="bn">
              {post.readingTimeMinutes} মিনিট পাঠ
            </span>
          )}
          <time className="post-time" lang="bn">
            {post.publishedAtLabel}
          </time>
        </div>
      </div>

      <div className="post-body">
        {post.title && (
          <h3 className="post-title" lang="bn">
            {post.title}
          </h3>
        )}
        <p className={`post-text ${isThought ? "is-thought" : ""}`} lang="bn">
          {post.content}
        </p>
        {isThought && <i className="thought-quote-mark" aria-hidden="true" />}
      </div>

      {post.tags && post.tags.length > 0 && (
        <div className="post-tags">
          {post.tags.map((tag) => (
            <span key={tag} className="post-tag-badge" lang="bn">
              #{tag}
            </span>
          ))}
        </div>
      )}

      <div className="post-actions">
        <button
          type="button"
          className="action-btn"
          aria-label={`${post.likesCount} Likes`}
        >
          <Icon name="heart" size={16} />
          <span lang="bn">{post.likesCount.toLocaleString()}</span>
        </button>
        <button
          type="button"
          className="action-btn"
          aria-label={`${post.commentsCount} Comments`}
        >
          <Icon name="bookmark" size={16} />
          <span lang="bn">{post.commentsCount.toLocaleString()}</span>
        </button>
        <button
          type="button"
          className="action-btn"
          aria-label="Share story"
        >
          <Icon name="arrow" size={16} />
          <span>শেয়ার</span>
        </button>
        <button
          type="button"
          className="action-btn bookmark-btn"
          aria-label="Bookmark story"
        >
          <Icon name="bookmark" size={16} />
        </button>
      </div>
    </article>
  );
}
