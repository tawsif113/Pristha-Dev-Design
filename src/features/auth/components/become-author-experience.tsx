"use client";

import { useState } from "react";
import Link from "next/link";
import { Icon } from "@/src/components/ui/icon";
import { PageHeader } from "@/src/components/layout/page-header";
import { routes } from "@/src/config/routes";
import { usePristha } from "@/src/features/app-state/pristha-provider";

const TARGET_WORDS = 1200;

export function BecomeAuthorExperience() {
  const { isAuthor, completeAuthorOnboarding, showToast } = usePristha();
  const [step, setStep] = useState<1 | 2 | 3>(isAuthor ? 3 : 1);

  // Step 1: Questionnaire state
  const [favBooks, setFavBooks] = useState("");
  const [favWriter, setFavWriter] = useState("");
  const [lastReadBook, setLastReadBook] = useState("");
  const [writingFrequency, setWritingFrequency] = useState("daily");

  // Step 2: Sample Writing state
  const [sampleTitle, setSampleTitle] = useState("");
  const [sampleText, setSampleText] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const wordCount = sampleText
    .trim()
    .split(/\s+/)
    .filter((w) => w.length > 0).length;
  const wordProgress = Math.min(100, Math.round((wordCount / TARGET_WORDS) * 100));

  function handleStep1Submit(e: React.FormEvent) {
    e.preventDefault();
    if (!favBooks.trim() || !favWriter.trim() || !lastReadBook.trim()) {
      showToast("দয়া করে প্রশ্নের উত্তরগুলো পূরণ করুন।");
      return;
    }
    setStep(2);
  }

  function handleStep2Submit(e: React.FormEvent) {
    e.preventDefault();
    if (!sampleText.trim()) {
      showToast("দয়া করে আপনার ১২০০ শব্দের নমুনা লেখাটি লিখুন।");
      return;
    }

    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      completeAuthorOnboarding();
      setStep(3);
    }, 1000);
  }

  return (
    <div className="product-page become-author-page page-enter">
      <PageHeader
        eyebrow="Author Onboarding"
        title="পাঠক থেকে লেখক অনবোর্ডিং"
        subtitle="পৃষ্ঠায় লেখক হিসেবে গল্প ও উপন্যাস প্রকাশ করতে অনবোর্ডিং প্রক্রিয়াটি সম্পন্ন করুন।"
      />

      <div className="onboarding-steps-indicator" role="progressbar" aria-valuenow={step} aria-valuemin={1} aria-valuemax={3}>
        <div className={`step-node ${step >= 1 ? "active" : ""}`}>
          <span className="node-number">১</span>
          <span className="node-label" lang="bn">জিজ্ঞাসাবাদ</span>
        </div>
        <div className="step-connector" />
        <div className={`step-node ${step >= 2 ? "active" : ""}`}>
          <span className="node-number">২</span>
          <span className="node-label" lang="bn">নমুনা জমা</span>
        </div>
        <div className="step-connector" />
        <div className={`step-node ${step >= 3 ? "active" : ""}`}>
          <span className="node-number">৩</span>
          <span className="node-label" lang="bn">অনুমোদন</span>
        </div>
      </div>

      <div className="onboarding-card-container">
        {step === 1 && (
          <section className="onboarding-card">
            <header className="card-head">
              <span className="eyebrow">ধাপ ১/৩</span>
              <h2 lang="bn">পাঠক জিজ্ঞাসা ও সাহিত্য রুচি</h2>
              <p lang="bn">
                লেখক হিসেবে আপনার যাত্রা শুরুর আগে আপনার পাঠ্যবই ও পছন্দের কথা বলুন।
              </p>
            </header>

            <form onSubmit={handleStep1Submit} className="onboarding-form">
              <div className="form-field">
                <label htmlFor="fav-books" lang="bn">
                  ১. আপনার প্রিয় ৩টি বইয়ের নাম লিখুন
                </label>
                <input
                  id="fav-books"
                  type="text"
                  placeholder="উদা: পথের পাঁচালী, গীতাঞ্জলি, চাঁদের পাহাড়"
                  value={favBooks}
                  onChange={(e) => setFavBooks(e.target.value)}
                  required
                  lang="bn"
                />
              </div>

              <div className="form-field">
                <label htmlFor="fav-writer" lang="bn">
                  ২. আপনার প্রিয় লেখক কে?
                </label>
                <input
                  id="fav-writer"
                  type="text"
                  placeholder="উda: রবীন্দ্রনাথ ঠাকুর, বিভূতিভূষণ বন্দ্যোপাধ্যায়"
                  value={favWriter}
                  onChange={(e) => setFavWriter(e.target.value)}
                  required
                  lang="bn"
                />
              </div>

              <div className="form-field">
                <label htmlFor="last-read" lang="bn">
                  ৩. সর্বশেষ পড়া বইটি কী ছিল?
                </label>
                <input
                  id="last-read"
                  type="text"
                  placeholder="উদা: চিঠি — নুসরাত আহমেদ"
                  value={lastReadBook}
                  onChange={(e) => setLastReadBook(e.target.value)}
                  required
                  lang="bn"
                />
              </div>

              <div className="form-field">
                <label lang="bn">৪. আপনি কত ঘন ঘন বা কতবার লেখেন?</label>
                <div className="radio-group">
                  <label className="radio-tile">
                    <input
                      type="radio"
                      name="frequency"
                      value="daily"
                      checked={writingFrequency === "daily"}
                      onChange={(e) => setWritingFrequency(e.target.value)}
                    />
                    <span lang="bn">প্রতিদিন লিখি</span>
                  </label>
                  <label className="radio-tile">
                    <input
                      type="radio"
                      name="frequency"
                      value="weekly"
                      checked={writingFrequency === "weekly"}
                      onChange={(e) => setWritingFrequency(e.target.value)}
                    />
                    <span lang="bn">সপ্তাহে ৩-৪ দিন</span>
                  </label>
                  <label className="radio-tile">
                    <input
                      type="radio"
                      name="frequency"
                      value="monthly"
                      checked={writingFrequency === "monthly"}
                      onChange={(e) => setWritingFrequency(e.target.value)}
                    />
                    <span lang="bn">মাসে কয়েকবার</span>
                  </label>
                  <label className="radio-tile">
                    <input
                      type="radio"
                      name="frequency"
                      value="first"
                      checked={writingFrequency === "first"}
                      onChange={(e) => setWritingFrequency(e.target.value)}
                    />
                    <span lang="bn">এই প্রথম লিখছি</span>
                  </label>
                </div>
              </div>

              <div className="form-action-row">
                <button type="submit" className="primary-button">
                  <span lang="bn">পরবর্তী ধাপ: নমুনা জমা</span>
                  <Icon name="arrow" size={18} />
                </button>
              </div>
            </form>
          </section>
        )}

        {step === 2 && (
          <section className="onboarding-card">
            <header className="card-head">
              <span className="eyebrow">ধাপ ২/৩</span>
              <h2 lang="bn">২ পৃষ্ঠা / ১,২০০ শব্দের নমুনা লেখা জমা দিন</h2>
              <p lang="bn">
                সম্পাদকীয় পর্যালোচনার জন্য আপনার ১,২০০ শব্দ বা ২ পৃষ্ঠার একটি নমুনা গল্প বা অনুচ্ছেদ রচনা লিখুন।
              </p>
            </header>

            <form onSubmit={handleStep2Submit} className="onboarding-form">
              <div className="word-tracker-bar">
                <div className="tracker-meta">
                  <span lang="bn">শব্দ গণনাকারক: <strong>{wordCount}</strong> / {TARGET_WORDS} শব্দ</span>
                  <span>{wordProgress}% সম্পন্ন</span>
                </div>
                <div className="tracker-progress">
                  <span style={{ width: `${wordProgress}%` }} />
                </div>
              </div>

              <div className="form-field">
                <label htmlFor="sample-title" lang="bn">
                  গল্প বা লেখার শিরোনাম (ঐচ্ছিক)
                </label>
                <input
                  id="sample-title"
                  type="text"
                  placeholder="উদা: মেঘের দিনগুলিতে নদীর গান"
                  value={sampleTitle}
                  onChange={(e) => setSampleTitle(e.target.value)}
                  lang="bn"
                />
              </div>

              <div className="form-field">
                <label htmlFor="sample-text" lang="bn">
                  আপনার ১২০০ শব্দের গল্প বা নমুনা লেখা
                </label>
                <textarea
                  id="sample-text"
                  rows={12}
                  placeholder="এখানে আপনার গল্প বা ২ পৃষ্ঠার নমুনা লেখাটি লিখুন..."
                  value={sampleText}
                  onChange={(e) => setSampleText(e.target.value)}
                  required
                  lang="bn"
                />
              </div>

              <div className="form-action-row split">
                <button
                  type="button"
                  className="secondary-button"
                  onClick={() => setStep(1)}
                >
                  <span lang="bn">পূর্ববর্তী ধাপ</span>
                </button>

                <button
                  type="submit"
                  className="primary-button"
                  disabled={submitting || !sampleText.trim()}
                >
                  {submitting ? (
                    <span lang="bn">জমা নেওয়া হচ্ছে...</span>
                  ) : (
                    <>
                      <span lang="bn">আবেদন ও নমুনা জমা দিন</span>
                      <Icon name="arrow" size={18} />
                    </>
                  )}
                </button>
              </div>
            </form>
          </section>
        )}

        {step === 3 && (
          <section className="onboarding-card approval-card">
            <div className="approval-badge-icon">✓</div>
            <header className="card-head text-center">
              <span className="eyebrow">ধাপ ৩/৩ — অনুমোদন সম্পন্ন</span>
              <h2 lang="bn">অভিনন্দন! আপনি এখন একজন নিবন্ধিত লেখক।</h2>
              <p lang="bn">
                আপনার ১,২০০ শব্দের নমুনা গল্প ও পাঠ্য জিজ্ঞাসা সম্পাদকীয় দল কর্তৃক পর্যালোচিত ও অনুমোদিত হয়েছে।
              </p>
            </header>

            <div className="approval-features-box">
              <h4 lang="bn">আপনার নতুন লেখক সুবিধাসমূহ:</h4>
              <ul>
                <li lang="bn">✓ রাইটার স্টুডিও (`/studio`) ও অধ্যায় সম্পাদকে অবাধ প্রবেশ।</li>
                <li lang="bn">✓ Quick Reads বিভাগে মুক্তচিন্তা ও অনুগল্প প্রকাশের অনুমতি।</li>
                <li lang="bn">✓ নতুন বই প্রকাশ ও পাঠক অ্যানালিটিক্স অ্যাক্সেস।</li>
              </ul>
            </div>

            <div className="approval-actions">
              <Link href={routes.studio} className="primary-button">
                <span lang="bn">রাইটার স্টুডিওতে যান</span>
                <Icon name="arrow" size={18} />
              </Link>
              <Link href={routes.quickReads} className="secondary-button">
                <span lang="bn">Quick Reads অনুগল্প লিখুন</span>
              </Link>
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
