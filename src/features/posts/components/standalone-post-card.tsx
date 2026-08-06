"use client";

import { useState } from "react";
import type { StandalonePost } from "@/src/types/domain";
import { Icon } from "@/src/components/ui/icon";

interface ReplyItem {
  id: string;
  authorName: string;
  authorAvatar: string;
  publishedAt: string;
  content: string;
}

interface CommentItem {
  id: string;
  authorName: string;
  authorAvatar: string;
  publishedAt: string;
  content: string;
  replies: ReplyItem[];
}

const initialMockComments: Record<string, CommentItem[]> = {
  default: [
    {
      id: "c1",
      authorName: "আরিফুর রহমান",
      authorAvatar: "আ",
      publishedAt: "১৫ মিনিট আগে",
      content: "খুব সুন্দর ও গভীর একটি ভাবনা। বিশেষ করে শেষের লাইনটি মন ছুঁয়ে গেল।",
      replies: [
        {
          id: "r1",
          authorName: "রুমানা কবীর",
          authorAvatar: "র",
          publishedAt: "১০ মিনিট আগে",
          content: "ধন্যবাদ আরিফ ভাই! আপনার প্রশংসায় অনুপ্রাণিত হলাম।",
        },
      ],
    },
    {
      id: "c2",
      authorName: "ফাতেমা জোহরা",
      authorAvatar: "ফা",
      publishedAt: "১ ঘণ্টা আগে",
      content: "বৃষ্টির দিনে এমন অনুগল্প পড়তে বেশ ভালো লাগে। পরবর্তী পর্বের অপেক্ষায় রইলাম।",
      replies: [],
    },
  ],
};

const TEXT_LIMIT = 180;

export function StandalonePostCard({ post }: { post: StandalonePost }) {
  const isThought = post.kind === "thought";
  const [liked, setLiked] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);
  const [likesCount, setLikesCount] = useState(post.likesCount);
  const [commentsOpen, setCommentsOpen] = useState(false);
  const [isTextExpanded, setIsTextExpanded] = useState(false);

  // Comments state
  const [comments, setComments] = useState<CommentItem[]>(
    initialMockComments[post.id] || initialMockComments.default,
  );
  const [newCommentText, setNewCommentText] = useState("");
  const [replyingToId, setReplyingToId] = useState<string | null>(null);
  const [replyText, setReplyText] = useState("");

  const needsTruncation = post.content.length > TEXT_LIMIT;
  const displayedContent =
    needsTruncation && !isTextExpanded
      ? post.content.slice(0, TEXT_LIMIT) + "..."
      : post.content;

  function toggleLike() {
    if (liked) {
      setLiked(false);
      setLikesCount((prev) => prev - 1);
    } else {
      setLiked(true);
      setLikesCount((prev) => prev + 1);
    }
  }

  function toggleBookmark() {
    setBookmarked((prev) => !prev);
  }

  function handleAddComment(e: React.FormEvent) {
    e.preventDefault();
    if (!newCommentText.trim()) return;

    const newComment: CommentItem = {
      id: `comment-${comments.length + 1}`,
      authorName: "রুমানা কবীর",
      authorAvatar: "র",
      publishedAt: "মুহূর্ত আগে",
      content: newCommentText.trim(),
      replies: [],
    };

    setComments([...comments, newComment]);
    setNewCommentText("");
  }

  function handleAddReply(commentId: string, e: React.FormEvent) {
    e.preventDefault();
    if (!replyText.trim()) return;

    const targetComment = comments.find((c) => c.id === commentId);
    const replyCount = targetComment ? targetComment.replies.length : 0;

    const newReply: ReplyItem = {
      id: `reply-${commentId}-${replyCount + 1}`,
      authorName: "রুমানা কবীর",
      authorAvatar: "র",
      publishedAt: "মুহূর্ত আগে",
      content: replyText.trim(),
    };

    setComments((prev) =>
      prev.map((comment) =>
        comment.id === commentId
          ? { ...comment, replies: [...comment.replies, newReply] }
          : comment,
      ),
    );

    setReplyText("");
    setReplyingToId(null);
  }

  const kindLabel =
    post.kind === "thought"
      ? "মুক্তচিন্তা"
      : post.kind === "short-story"
        ? "অনুগল্প"
        : "ক্ষুদ্র প্রবন্ধ";

  return (
    <article className={`standalone-post-card ${post.kind}`}>
      <div className="post-header">
        <div className="post-author-info">
          <span className="author-avatar">
            {post.authorAvatar || post.authorName.charAt(0)}
          </span>
          <div className="author-details">
            <div className="author-name-row">
              <strong className="author-name" lang="bn">
                {post.authorName}
              </strong>
              <span className="kind-badge" lang="bn">
                {kindLabel}
              </span>
            </div>
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
          {displayedContent}
          {needsTruncation && (
            <button
              type="button"
              className="see-more-btn"
              onClick={() => setIsTextExpanded((prev) => !prev)}
              lang="bn"
            >
              {isTextExpanded ? "  [সংক্ষিপ্ত করুন]" : "  আরও পড়ুন"}
            </button>
          )}
        </p>
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

      <footer className="post-actions">
        <button
          type="button"
          className={`action-btn ${liked ? "active" : ""}`}
          onClick={toggleLike}
          aria-label={`${likesCount} Likes`}
        >
          <Icon name="heart" size={16} />
          <span lang="bn">{likesCount.toLocaleString()}</span>
        </button>

        <button
          type="button"
          className={`action-btn ${commentsOpen ? "active" : ""}`}
          onClick={() => setCommentsOpen((prev) => !prev)}
          aria-label={`${comments.length} Comments`}
        >
          <Icon name="bookmark" size={16} />
          <span lang="bn">{comments.length} মন্তব্য</span>
        </button>

        <button
          type="button"
          className="action-btn"
          aria-label="Share story"
        >
          <Icon name="arrow" size={16} />
          <span lang="bn">শেয়ার</span>
        </button>

        <button
          type="button"
          className={`action-btn bookmark-btn ${bookmarked ? "active" : ""}`}
          onClick={toggleBookmark}
          aria-label="Bookmark story"
        >
          <Icon name="bookmark" size={16} />
        </button>
      </footer>

      {/* Expandable Comments & Reply Section */}
      {commentsOpen && (
        <section className="post-comments-section">
          <h4 className="comments-heading" lang="bn">
            মন্তব্যসমূহ ({comments.length})
          </h4>

          {/* New Comment Input Form */}
          <form onSubmit={handleAddComment} className="comment-input-form">
            <input
              type="text"
              placeholder="একটি মন্তব্য বা প্রতিক্রিয়া লিখুন..."
              value={newCommentText}
              onChange={(e) => setNewCommentText(e.target.value)}
              className="comment-input"
              lang="bn"
            />
            <button
              type="submit"
              className="comment-submit-btn"
              disabled={!newCommentText.trim()}
              lang="bn"
            >
              পাঠান
            </button>
          </form>

          {/* Comments List */}
          <div className="comments-list">
            {comments.map((comment) => (
              <div key={comment.id} className="comment-item">
                <div className="comment-header">
                  <span className="comment-avatar">{comment.authorAvatar}</span>
                  <div className="comment-meta">
                    <strong className="comment-author" lang="bn">
                      {comment.authorName}
                    </strong>
                    <span className="comment-time" lang="bn">
                      {comment.publishedAt}
                    </span>
                  </div>
                </div>

                <p className="comment-content" lang="bn">
                  {comment.content}
                </p>

                <div className="comment-actions">
                  <button
                    type="button"
                    className="reply-trigger-btn"
                    onClick={() =>
                      setReplyingToId(
                        replyingToId === comment.id ? null : comment.id,
                      )
                    }
                    lang="bn"
                  >
                    উত্তর দিন
                  </button>
                </div>

                {/* Reply Form */}
                {replyingToId === comment.id && (
                  <form
                    onSubmit={(e) => handleAddReply(comment.id, e)}
                    className="reply-input-form"
                  >
                    <input
                      type="text"
                      placeholder={`${comment.authorName}-কে উত্তর দিন...`}
                      value={replyText}
                      onChange={(e) => setReplyText(e.target.value)}
                      className="reply-input"
                      lang="bn"
                    />
                    <button
                      type="submit"
                      className="reply-submit-btn"
                      disabled={!replyText.trim()}
                      lang="bn"
                    >
                      উত্তর দিন
                    </button>
                  </form>
                )}

                {/* Nested Replies */}
                {comment.replies && comment.replies.length > 0 && (
                  <div className="replies-list">
                    {comment.replies.map((reply) => (
                      <div key={reply.id} className="reply-item">
                        <div className="reply-header">
                          <span className="reply-avatar">
                            {reply.authorAvatar}
                          </span>
                          <div className="reply-meta">
                            <strong className="reply-author" lang="bn">
                              {reply.authorName}
                            </strong>
                            <span className="reply-time" lang="bn">
                              {reply.publishedAt}
                            </span>
                          </div>
                        </div>
                        <p className="reply-content" lang="bn">
                          {reply.content}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      )}
    </article>
  );
}
