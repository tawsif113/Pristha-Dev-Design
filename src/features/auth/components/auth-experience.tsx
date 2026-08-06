"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Icon } from "@/src/components/ui/icon";
import { routes } from "@/src/config/routes";
import { usePristha } from "@/src/features/app-state/pristha-provider";

type AuthMode = "signin" | "signup";

export function AuthExperience({
  initialMode = "signin",
}: {
  initialMode?: AuthMode;
}) {
  const router = useRouter();
  const { login, showToast } = usePristha();
  const [mode, setMode] = useState<AuthMode>(initialMode);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // Form State
  const [emailOrUsername, setEmailOrUsername] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(true);

  // Signup extra state
  const [fullName, setFullName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [termsAccepted, setTermsAccepted] = useState(true);

  function switchMode(newMode: AuthMode) {
    setMode(newMode);
    router.replace(newMode === "signin" ? routes.login : routes.signup);
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      login();
      router.push(routes.home);
    }, 800);
  }

  function handleSocialAuth(provider: string) {
    showToast(`${provider} দিয়ে সংযুক্ত হওয়া হচ্ছে...`);
    setTimeout(() => {
      router.push(routes.home);
    }, 600);
  }

  return (
    <div className="product-page auth-page page-enter">
      <div className="auth-card-container">
        {/* Left Column: Literary Showcase */}
        <div className="auth-showcase-panel">
          <div className="showcase-brand">
            <span className="brand-logo-mark">পৃ</span>
            <span className="brand-name">PRISTHA</span>
          </div>

          <div className="showcase-content">
            <span className="showcase-eyebrow" lang="bn">
              গল্পের স্বাধীন জগত
            </span>
            <h2 className="showcase-quote" lang="bn">
              “শব্দ যেখানে আশ্রয় পায়, আর পাঠক খুঁজে পান নিশ্চিন্তির ঘর।”
            </h2>

            <div className="showcase-stats">
              <div className="stat-item">
                <strong lang="bn">১২,০০০+</strong>
                <span lang="bn">প্রকাশিত গল্প</span>
              </div>
              <div className="stat-divider" aria-hidden="true" />
              <div className="stat-item">
                <strong lang="bn">৪৫,০০০+</strong>
                <span lang="bn">পাঠক সমাজ</span>
              </div>
              <div className="stat-divider" aria-hidden="true" />
              <div className="stat-item">
                <strong lang="bn">১.২M+</strong>
                <span lang="bn">শব্দলেখা</span>
              </div>
            </div>

            <div className="showcase-testimonial">
              <p lang="bn">
                “পৃষ্ঠা আমার প্রতিটি অধ্যায়কে পাঠকদের কাছে নিখুঁতভাবে পৌঁছে
                দিয়েছে। বাংলা সাহিত্যের এমন ডিজিটাল অভিজ্ঞতা আগে পাইনি।”
              </p>
              <cite lang="bn">— নুসরাত আহমেদ (লেখক, ‘চিঠি’)</cite>
            </div>
          </div>
        </div>

        {/* Right Column: Interactive Auth Form */}
        <div className="auth-form-panel">
          <div className="auth-header">
            <div className="auth-tabs" role="tablist" aria-label="Account modes">
              <button
                type="button"
                role="tab"
                aria-selected={mode === "signin"}
                className={`auth-tab-btn ${mode === "signin" ? "active" : ""}`}
                onClick={() => switchMode("signin")}
                lang="bn"
              >
                লগইন করুন
              </button>
              <button
                type="button"
                role="tab"
                aria-selected={mode === "signup"}
                className={`auth-tab-btn ${mode === "signup" ? "active" : ""}`}
                onClick={() => switchMode("signup")}
                lang="bn"
              >
                নতুন অ্যাকাউন্ট
              </button>
            </div>
            <p className="auth-subtext" lang="bn">
              {mode === "signin"
                ? "আপনার ব্যক্তিগত লাইব্রেরি ও স্টুডিওতে ফিরে আসুন।"
                : "আপনার প্রথম গল্প লিখতে বা পছন্দের সংকলন সাজাতে যোগ দিন।"}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="auth-form">
            {mode === "signup" && (
              <>
                <div className="form-field">
                  <label htmlFor="auth-fullname" lang="bn">
                    সম্পূর্ণ নাম
                  </label>
                  <input
                    id="auth-fullname"
                    type="text"
                    placeholder="উদা: রুমানা কবীর"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    required
                    lang="bn"
                  />
                </div>

                <div className="form-field">
                  <label htmlFor="auth-username" lang="bn">
                    ইউজারনেম
                  </label>
                  <div className="input-with-prefix">
                    <span>@</span>
                    <input
                      id="auth-username"
                      type="text"
                      placeholder="rumana_kabir"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      required
                    />
                  </div>
                </div>
              </>
            )}

            <div className="form-field">
              <label htmlFor="auth-email" lang="bn">
                {mode === "signin" ? "ইমেইল বা ইউজারনেম" : "ইমেইল অ্যাড্রেস"}
              </label>
              <input
                id="auth-email"
                type={mode === "signin" ? "text" : "email"}
                placeholder={
                  mode === "signin"
                    ? "rumana@example.com বা @rumana"
                    : "rumana@example.com"
                }
                value={mode === "signin" ? emailOrUsername : email}
                onChange={(e) =>
                  mode === "signin"
                    ? setEmailOrUsername(e.target.value)
                    : setEmail(e.target.value)
                }
                required
              />
            </div>

            <div className="form-field">
              <div className="label-row">
                <label htmlFor="auth-password" lang="bn">
                  পাসওয়ার্ড
                </label>
                {mode === "signin" && (
                  <a
                    href="#forgot"
                    onClick={(e) => {
                      e.preventDefault();
                      showToast("পাসওয়ার্ড রিসেট লিংক আপনার ইমেইলে পাঠানো হবে।");
                    }}
                    className="forgot-link"
                    lang="bn"
                  >
                    পাসওয়ার্ড ভুলে গেছেন?
                  </a>
                )}
              </div>
              <div className="input-with-icon">
                <input
                  id="auth-password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  className="password-toggle-btn"
                  onClick={() => setShowPassword((prev) => !prev)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  <Icon name={showPassword ? "close" : "search"} size={16} />
                </button>
              </div>
            </div>

            {mode === "signin" ? (
              <div className="form-options">
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                  />
                  <span lang="bn">আমাকে মনে রাখুন</span>
                </label>
              </div>
            ) : (
              <div className="form-options">
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    checked={termsAccepted}
                    onChange={(e) => setTermsAccepted(e.target.checked)}
                    required
                  />
                  <span lang="bn">
                    পৃষ্ঠার সেবা শর্তাবলী ও গোপনীয়তা নীতি মেনে চলছি।
                  </span>
                </label>
              </div>
            )}

            <button
              type="submit"
              className="primary-button auth-submit-btn"
              disabled={loading}
            >
              {loading ? (
                <span>অপেক্ষা করুন...</span>
              ) : mode === "signin" ? (
                <>
                  <span lang="bn">প্রবেশ করুন</span>
                  <Icon name="arrow" size={18} />
                </>
              ) : (
                <>
                  <span lang="bn">অ্যাকাউন্ট খুলুন</span>
                  <Icon name="arrow" size={18} />
                </>
              )}
            </button>
          </form>

          <div className="auth-divider">
            <span lang="bn">অথবা</span>
          </div>

          <div className="social-auth-buttons">
            <button
              type="button"
              className="social-btn google-btn"
              onClick={() => handleSocialAuth("Google")}
            >
              <span className="social-icon">G</span>
              <span lang="bn">Google দিয়ে চালিয়ে যান</span>
            </button>

            <button
              type="button"
              className="social-btn magic-btn"
              onClick={() => handleSocialAuth("Magic Link")}
            >
              <Icon name="arrow" size={16} />
              <span lang="bn">ম্যাজিক লিংক পান</span>
            </button>
          </div>

          <footer className="auth-footer-text">
            {mode === "signin" ? (
              <p lang="bn">
                নতুন পাঠক বা লেখক?{" "}
                <Link href={routes.signup} onClick={() => switchMode("signup")}>
                  এখানে অ্যাকাউন্ট খুলুন
                </Link>
              </p>
            ) : (
              <p lang="bn">
                ইতিমধ্যে অ্যাকাউন্ট আছে?{" "}
                <Link href={routes.login} onClick={() => switchMode("signin")}>
                  লগইন করুন
                </Link>
              </p>
            )}
          </footer>
        </div>
      </div>
    </div>
  );
}
