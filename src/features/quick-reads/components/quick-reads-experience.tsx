"use client";

import { useState } from "react";
import { Icon } from "@/src/components/ui/icon";
import { PageHeader } from "@/src/components/layout/page-header";
import { StandalonePostCard } from "@/src/features/posts/components/standalone-post-card";
import type { StandalonePost, PostKind } from "@/src/types/domain";

const filterTabs = [
  { id: "all", label: "সব" },
  { id: "thought", label: "মুক্তচিন্তা" },
  { id: "short-story", label: "অনুগল্প" },
  { id: "essay", label: "প্রবন্ধ" },
];

export function QuickReadsExperience({
  initialPosts,
}: {
  initialPosts: StandalonePost[];
}) {
  const [posts, setPosts] = useState<StandalonePost[]>(initialPosts);
  const [activeFilter, setActiveFilter] = useState("all");
  const [newPostText, setNewPostText] = useState("");
  const [selectedKind, setSelectedKind] = useState<PostKind>("thought");
  const [postTitle, setPostTitle] = useState("");
  const [isExpanded, setIsExpanded] = useState(false);

  const filteredPosts = posts.filter((post) => {
    if (activeFilter === "all") return true;
    return post.kind === activeFilter;
  });

  function handleCreatePost(e: React.FormEvent) {
    e.preventDefault();
    if (!newPostText.trim()) return;

    const createdPost: StandalonePost = {
      id: "post-" + Date.now(),
      slug: "post-" + Date.now(),
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
    setIsExpanded(false);
  }

  return (
    <div className="product-page quick-reads-page page-enter">
      <PageHeader
        eyebrow="Quick Reads"
        title="ক্ষুদ্রগল্প ও মুক্তচিন্তা"
        subtitle="স্বাধীন লেখকদের তাৎক্ষণিক ভাবনা, অনুভূতি ও অনুগল্পের অফুরন্ত প্রবাহ।"
      />

      <div className="quick-reads-layout">
        {/* Quick Post Creator Box */}
        <section className="quick-post-composer">
          <form onSubmit={handleCreatePost}>
            <div className="composer-top">
              <span className="composer-avatar">র</span>
              <div className="composer-inputs">
                {isExpanded && selectedKind !== "thought" && (
                  <input
                    type="text"
                    placeholder="গল্পের শিরোনাম (ঐচ্ছিক)"
                    value={postTitle}
                    onChange={(e) => setPostTitle(e.target.value)}
                    className="composer-title-input"
                    lang="bn"
                  />
                )}
                <textarea
                  placeholder="আজ আপনার মনে কী চিন্তা আসছে? লিখুন আপনার মুক্তচিন্তা বা অনুগল্প..."
                  value={newPostText}
                  onChange={(e) => setNewPostText(e.target.value)}
                  onFocus={() => setIsExpanded(true)}
                  rows={isExpanded ? 4 : 2}
                  className="composer-textarea"
                  lang="bn"
                />
              </div>
            </div>

            {isExpanded && (
              <div className="composer-actions">
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
                    প্রবন্ধ
                  </button>
                </div>

                <div className="composer-submit-group">
                  <button
                    type="button"
                    className="secondary-button"
                    onClick={() => {
                      setIsExpanded(false);
                      setNewPostText("");
                      setPostTitle("");
                    }}
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
              </div>
            )}
          </form>
        </section>

        {/* Filter Pills */}
        <div className="quick-reads-filters" role="tablist" aria-label="Filter quick reads">
          {filterTabs.map((tab) => (
            <button
              key={tab.id}
              role="tab"
              aria-selected={activeFilter === tab.id}
              className={`filter-pill ${activeFilter === tab.id ? "active" : ""}`}
              onClick={() => setActiveFilter(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Endless Feed Stream */}
        <section className="quick-reads-feed" aria-label="Endless stream of posts">
          {filteredPosts.length > 0 ? (
            filteredPosts.map((post) => (
              <StandalonePostCard key={post.id} post={post} />
            ))
          ) : (
            <div className="quick-reads-empty">
              <p>এই বিভাগে কোনো পোস্ট পাওয়া যায়নি।</p>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
