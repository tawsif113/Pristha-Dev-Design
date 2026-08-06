# Pristha Platform API Specification

Complete backend REST API endpoint specification required to make every UI feature and page in Pristha fully functional.

---

## 1. Authentication & User Profile

| Method | Endpoint | Description | Request Body / Query Params | Response Payload Summary |
| :--- | :--- | :--- | :--- | :--- |
| `POST` | `/api/v1/auth/login` | Authenticate user via email/username & password | `{ emailOrUsername, password, rememberMe }` | `{ token, user: { id, username, fullName, avatarUrl } }` |
| `POST` | `/api/v1/auth/signup` | Register a new reader/writer account | `{ fullName, username, email, password }` | `{ token, user: { id, username, fullName, email } }` |
| `POST` | `/api/v1/auth/google` | OAuth 2.0 Google sign-in | `{ idToken }` | `{ token, user: { id, username, email } }` |
| `POST` | `/api/v1/auth/magic-link` | Send passwordless login link via email | `{ email }` | `{ success: true, message: "Magic link sent" }` |
| `GET` | `/api/v1/me` | Fetch current logged-in user profile & session | Authorization: Bearer Header | `{ user: { id, username, fullName, bio, avatarUrl } }` |
| `GET` | `/api/v1/profiles/:username` | Fetch public author profile details & published work | Param: `username` | `{ author: { id, name, bio, booksCount, followersCount }, books: [] }` |
| `PATCH` | `/api/v1/me/settings` | Update user profile, bio, avatar, and preferences | `{ fullName, bio, avatarUrl, emailNotifications }` | `{ user: updatedUserObject }` |

---

## 2. Books & Discovery Catalog

| Method | Endpoint | Description | Request Body / Query Params | Response Payload Summary |
| :--- | :--- | :--- | :--- | :--- |
| `GET` | `/api/v1/books` | Search & filter books (Discover page) | Query: `q`, `format`, `genre`, `shelf`, `page`, `pageSize` | `{ items: [BookSummary], total, page, totalPages }` |
| `GET` | `/api/v1/books/featured` | Fetch featured books for Home ("টাটকা পাতা") | None | `{ items: [BookSummary] }` |
| `GET` | `/api/v1/books/:slug` | Fetch complete book details, synopsis, & chapter index | Param: `slug` | `{ book: BookDetail, chapters: [ChapterSummary] }` |
| `POST` | `/api/v1/books/:bookId/save` | Save or unsave book to user's library | `{ bookId, action: "save" \| "unsave" }` | `{ bookId, isSaved: boolean }` |

---

## 3. Chapter Reader & Watermarking

| Method | Endpoint | Description | Request Body / Query Params | Response Payload Summary |
| :--- | :--- | :--- | :--- | :--- |
| `GET` | `/api/v1/books/:bookId/chapters/:chapterId` | Fetch chapter content for reading view | Params: `bookId`, `chapterId` | `{ chapter: { id, title, content, number, totalPages } }` |
| `POST` | `/api/v1/reader/progress` | Sync reading progress, page position & time spent | `{ bookId, chapterId, percentageRead, pageNumber, totalPages, timeSpentSeconds }` | `{ success: true, percentageRead }` |
| `GET` | `/api/v1/reader/resume` | Get last read chapter & position for "Continue reading" card | None | `{ book: BookSummary, chapter: ChapterSummary, percentageRead: 38 }` |

---

## 4. Quick Reads (ক্ষুদ্রগল্প ও মুক্তচিন্তা)

| Method | Endpoint | Description | Request Body / Query Params | Response Payload Summary |
| :--- | :--- | :--- | :--- | :--- |
| `GET` | `/api/v1/posts` | Fetch Quick Reads feed stream | Query: `kind` (`thought` \| `short-story` \| `essay`), `page`, `pageSize` | `{ items: [StandalonePost], total, page }` |
| `POST` | `/api/v1/posts` | Create a new standalone micro-thought or short story | `{ kind, title?, content, tags? }` | `{ post: StandalonePost }` |
| `POST` | `/api/v1/posts/:postId/like` | Like or applaud a post | Param: `postId` | `{ postId, liked: boolean, likesCount: number }` |
| `POST` | `/api/v1/posts/:postId/bookmark` | Bookmark / Save a post | Param: `postId` | `{ postId, bookmarked: boolean }` |
| `GET` | `/api/v1/posts/:postId/comments` | Fetch comments & nested replies for a post | Param: `postId` | `{ comments: [CommentItem] }` |
| `POST` | `/api/v1/posts/:postId/comments` | Post a comment or sub-reply | `{ content, parentCommentId? }` | `{ comment: CommentItem }` |

---

## 5. Library, Bookmarks & Reading Streak

| Method | Endpoint | Description | Request Body / Query Params | Response Payload Summary |
| :--- | :--- | :--- | :--- | :--- |
| `GET` | `/api/v1/me/library` | Fetch saved books on `/library` page | None | `{ items: [LibraryItem] }` |
| `GET` | `/api/v1/me/streak` | Fetch weekly reading activity & daily streak count | Query: `month` (e.g. `2026-08`) | `{ currentStreakDays: 14, weekData: [{ day, fullDay, minutes, today }] }` |
| `GET` | `/api/v1/me/reading-history` | Fetch complete reading log and finished stories | Query: `page`, `pageSize` | `{ items: [HistoryItem], total }` |
| `GET` | `/api/v1/me/bookmarks` | Fetch bookmarked passages and quotes | Query: `page`, `pageSize` | `{ items: [BookmarkItem], total }` |

---

## 6. Writer Studio & Chapter Editor

| Method | Endpoint | Description | Request Body / Query Params | Response Payload Summary |
| :--- | :--- | :--- | :--- | :--- |
| `GET` | `/api/v1/studio/overview` | Fetch writer studio summary, drafts list, and word count stats | None | `{ studioBooks: [StudioBook], activeDraft, totalWordsWritten }` |
| `POST` | `/api/v1/studio/books` | Create a new manuscript/book draft | `{ title, description, genre, language }` | `{ book: StudioBook }` |
| `GET` | `/api/v1/studio/books/:bookId/chapters/:chapterId` | Load chapter draft in WYSIWYG editor | Params: `bookId`, `chapterId` | `{ chapter: { id, title, content, words } }` |
| `PUT` | `/api/v1/studio/books/:bookId/chapters/:chapterId` | Auto-save chapter content & title | `{ title, content, wordsCount, status: "draft" \| "published" }` | `{ chapterId, updatedWords, savedAt }` |
| `GET` | `/api/v1/studio/audience` | Fetch reader demographics, retention, & readership stats | Query: `timeframe` | `{ totalReaders, retentionRate, demographics }` |
| `GET` | `/api/v1/studio/analytics` | Fetch readership metrics, word trends & weekly writing streak | Query: `range` | `{ wordTrends, weeklyStreakDays, topChapters }` |

---

## 7. Publishing House Workspace

| Method | Endpoint | Description | Request Body / Query Params | Response Payload Summary |
| :--- | :--- | :--- | :--- | :--- |
| `GET` | `/api/v1/house/overview` | Fetch publishing house portal overview & metrics | None | `{ activeContracts, pendingSubmissionsCount, catalogTotal }` |
| `GET` | `/api/v1/house/catalogue` | List all managed publications and contracts | Query: `status`, `genre` | `{ items: [PublicationItem] }` |
| `GET` | `/api/v1/house/submissions` | List incoming manuscript submissions | Query: `status` (`pending` \| `under-review` \| `accepted`) | `{ submissions: [SubmissionItem] }` |
| `PATCH` | `/api/v1/house/submissions/:id` | Accept, reject, or request revisions on a manuscript submission | `{ status, feedbackNotes }` | `{ submissionId, updatedStatus }` |
| `GET` | `/api/v1/house/scouting` | Fetch trending unsigned authors & viral stories for scouting | None | `{ trendingAuthors: [AuthorSummary], viralStories: [BookSummary] }` |
| `GET` | `/api/v1/house/storefront` | Fetch storefront revenue, orders & book pre-order data | None | `{ totalSales, revenueChart, recentOrders }` |
| `GET` | `/api/v1/house/team` | List editorial team members and permissions | None | `{ teamMembers: [TeamMember] }` |

---

## 8. Notifications & Global Search

| Method | Endpoint | Description | Request Body / Query Params | Response Payload Summary |
| :--- | :--- | :--- | :--- | :--- |
| `GET` | `/api/v1/notifications` | Fetch user notification inbox items | Query: `page`, `unreadOnly` | `{ items: [NotificationItem], unreadCount }` |
| `PATCH` | `/api/v1/notifications/read` | Mark notifications as read | `{ notificationIds: [] }` | `{ success: true }` |
| `GET` | `/api/v1/search` | Global instant search (Cmd+K modal) | Query: `q` | `{ books: [], chapters: [], authors: [] }` |
