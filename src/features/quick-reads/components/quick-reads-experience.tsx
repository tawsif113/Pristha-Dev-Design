"use client";

import { useState } from "react";
import { Icon } from "@/src/components/ui/icon";
import { PageHeader } from "@/src/components/layout/page-header";
import { StandalonePostCard } from "@/src/features/posts/components/standalone-post-card";
import type { StandalonePost, PostKind } from "@/src/types/domain";

const filterTabs = [
  { id: "all", label: "সব" },
  { id: "short-story", label: "অনুগল্প" },
  { id: "thought", label: "মুক্তচিন্তা" },
  { id: "essay", label: "ক্ষুদ্র প্রবন্ধ" },
];

export function QuickReadsExperience({
  initialPosts,
}: {
  initialPosts: StandalonePost[];
}) {
  const [posts, setPosts] = useState<StandalonePost[]>(initialPosts);
  const [activeFilter, setActiveFilter] = useState("all");
  const [composerOpen, setComposerOpen] = useState(false);
  const [newPostText, setNewPostText] = useState("");
  const [selectedKind, setSelectedKind] = useState<PostKind>("thought");
  const [postTitle, setPostTitle] = useState("");

  const filteredPosts = posts.filter((post) => {
    if (activeFilter === "all") return true;
    return post.kind === activeFilter;
  });

  function handleCreatePost(e: React.FormEvent) {
    e.preventDefault();
    if (!newPostText.trim()) return;

    const createdPost: StandalonePost = {
      id: `post-created-${posts.length + 1}`,
      slug: `post-created-${posts.length + 1}`,
      kind: selectedKind,
      title: postTitle.trim() || undefined,
      content: newPostText.trim(),
      authorName: "রুমানা কবীর",
      authorUsername: "rumana_kabir",
      authorAvatar: "র",
      publishedAtLabel: "মুহূর্ত আগে",
      likesCount: 1,
      commentsCount: 0,
      sharesCount: 0,
      bookmarksCount: 0,
      tags: selectedKind === "thought" ? ["মুক্তচিন্তা"] : ["অনুগল্প"],
    };

    setPosts([createdPost, ...posts]);
    setNewPostText("");
    setPostTitle("");
    setComposerOpen(false);
  }

  return (
    <div className="product-page quick-reads-page page-enter">
      <PageHeader
        eyebrow="Quick Reads"
        title="অনুগল্প ও মুক্তচিন্তা"
        subtitle="স্বাধীন লেখকদের সংক্ষিপ্ত সাহিত্য, অনুগল্প ও ভাবনা।"
        action={
          <button
            type="button"
            className="primary-button"
            onClick={() => setComposerOpen((prev) => !prev)}
          >
            <Icon name="plus" size={17} />
            <span>নতুন লেখা যোগ করুন</span>
          </button>
        }
      />

      {composerOpen && (
        <section className="quick-post-composer-card">
          <header className="composer-card-header">
            <h3 lang="bn">আপনার নতুন লেখা লিখুন</h3>
            <button
              type="button"
              className="composer-close-btn"
              onClick={() => setComposerOpen(false)}
              aria-label="Close"
            >
              ✕
            </button>
          </header>
          <form onSubmit={handleCreatePost}>
            <div className="composer-kind-selector">
              <button
                type="button"
                className={`kind-pill ${selectedKind === "thought" ? "active" : ""}`}
                onClick={() => setSelectedKind("thought")}
              >
                মুক্তচিন্তা
              </button>
              <button
                type="button"
                className={`kind-pill ${selectedKind === "short-story" ? "active" : ""}`}
                onClick={() => setSelectedKind("short-story")}
              >
                অনুগল্প
              </button>
              <button
                type="button"
                className={`kind-pill ${selectedKind === "essay" ? "active" : ""}`}
                onClick={() => setSelectedKind("essay")}
              >
                ক্ষুদ্র প্রবন্ধ
              </button>
            </div>

            {selectedKind !== "thought" && (
              <input
                type="text"
                placeholder="গল্পের শিরোনাম"
                value={postTitle}
                onChange={(e) => setPostTitle(e.target.value)}
                className="composer-title-input"
                lang="bn"
              />
            )}

            <textarea
              placeholder={
                selectedKind === "thought"
                  ? "আপনার ভাবনা বা অনুভূতির কথা লিখুন..."
                  : "আপনার অনুগল্পটি লিখুন..."
              }
              value={newPostText}
              onChange={(e) => setNewPostText(e.target.value)}
              rows={5}
              className="composer-textarea"
              lang="bn"
            />

            <div className="composer-footer">
              <button
                type="button"
                className="secondary-button"
                onClick={() => setComposerOpen(false)}
              >
                বাতিল
              </button>
              <button
                type="submit"
                className="primary-button"
                disabled={!newPostText.trim()}
              >
                প্রকাশ করুন <Icon name="arrow" size={16} />
              </button>
            </div>
          </form>
        </section>
      )}

      <div className="quick-reads-container">
        {/* Filter Pills Bar */}
        <nav className="quick-reads-filter-bar" aria-label="Filter quick reads">
          <span className="filter-label">বিভাগ:</span>
          {filterTabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              role="tab"
              aria-selected={activeFilter === tab.id}
              className={`filter-pill ${activeFilter === tab.id ? "active" : ""}`}
              onClick={() => setActiveFilter(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </nav>

        {/* Editorial Feed Stream */}
        <div className="quick-reads-stream" aria-label="Stream of stories and thoughts">
          {filteredPosts.length > 0 ? (
            filteredPosts.map((post) => (
              <StandalonePostCard key={post.id} post={post} />
            ))
          ) : (
            <div className="quick-reads-empty">
              <p lang="bn">এই বিভাগে কোনো লেখা পাওয়া যায়নি।</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
