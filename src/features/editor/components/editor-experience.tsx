"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { Button } from "@/src/components/ui/button";
import { Icon } from "@/src/components/ui/icon";
import { Modal } from "@/src/components/ui/modal";
import { routes } from "@/src/config/routes";
import { usePristha } from "@/src/features/app-state/pristha-provider";
import type { StudioBook, StudioChapter } from "@/src/types/domain";
import { countWords } from "@/src/utils/word-count";

type ToolTab = "Craft" | "Notes" | "Review";
type SaveStatus = "saved" | "saving" | "unsaved" | "error";

export function EditorExperience({
  book,
  chapter,
  initialDraft,
}: {
  book: StudioBook;
  chapter: StudioChapter;
  initialDraft: string;
}) {
  const router = useRouter();
  const { addStudioChapter, selectDraft, showToast } = usePristha();
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [draft, setDraft] = useState(initialDraft);
  const [saveStatus, setSaveStatus] = useState<SaveStatus>("saved");
  const [previewOpen, setPreviewOpen] = useState(false);
  const [focusMode, setFocusMode] = useState(false);
  const [lineSpacing, setLineSpacing] = useState("1.8");
  const [toolTab, setToolTab] = useState<ToolTab>("Craft");
  const wordCount = countWords(draft);
  const goal = 1500;
  const progress = Math.min(100, Math.round((wordCount / goal) * 100));

  const saveDraft = useCallback(() => {
    setSaveStatus("saving");
    window.setTimeout(() => {
      setSaveStatus("saved");
    }, 420);
  }, []);

  useEffect(() => {
    if (draft === initialDraft || saveStatus !== "unsaved") return;
    const timer = window.setTimeout(saveDraft, 1200);
    return () => window.clearTimeout(timer);
  }, [draft, initialDraft, saveDraft, saveStatus]);

  useEffect(() => {
    function handleBeforeUnload(event: BeforeUnloadEvent) {
      if (saveStatus !== "unsaved") return;
      event.preventDefault();
    }
    function handleShortcut(event: KeyboardEvent) {
      if (
        (event.metaKey || event.ctrlKey) &&
        event.key.toLowerCase() === "s"
      ) {
        event.preventDefault();
        saveDraft();
      }
    }
    window.addEventListener("beforeunload", handleBeforeUnload);
    window.addEventListener("keydown", handleShortcut);
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
      window.removeEventListener("keydown", handleShortcut);
    };
  }, [saveDraft, saveStatus]);

  function replaceSelection(
    before: string,
    after = before,
    emptyText = "text",
  ) {
    const textarea = textareaRef.current;
    if (!textarea) return;
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selected = draft.slice(start, end) || emptyText;
    const next =
      draft.slice(0, start) +
      before +
      selected +
      after +
      draft.slice(end);
    setDraft(next);
    setSaveStatus("unsaved");
    requestAnimationFrame(() => {
      textarea.focus();
      textarea.setSelectionRange(
        start + before.length,
        start + before.length + selected.length,
      );
    });
  }

  function insertAtCursor(text: string) {
    const textarea = textareaRef.current;
    if (!textarea) return;
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    setDraft(draft.slice(0, start) + text + draft.slice(end));
    setSaveStatus("unsaved");
    requestAnimationFrame(() => {
      textarea.focus();
      textarea.setSelectionRange(
        start + text.length,
        start + text.length,
      );
    });
  }

  function openChapter(chapterId: string) {
    selectDraft({ bookId: book.id, chapterId });
    router.push(routes.editor(book.id, chapterId));
  }

  function addChapter() {
    const selection = addStudioChapter(book.id);
    if (!selection) return;
    router.push(routes.editor(selection.bookId, selection.chapterId));
  }

  return (
    <div
      className={
        "editor-page page-enter " +
        (focusMode ? "is-focus-mode" : "")
      }
    >
      <Link className="editor-back" href={routes.studio}>
        <span aria-hidden="true">←</span> Back to Studio
      </Link>
      <div className="editor-head">
        <div>
          <span className="eyebrow">
            {book.title} <span className="crumb-divider">/</span> Chapter{" "}
            {chapter.number}
          </span>
          <h1 lang="bn">{chapter.title}</h1>
        </div>
        <div className="editor-status">
          <span aria-live="polite">
            <i className={"save-dot save-" + saveStatus} />
            {saveStatus === "saved" && "All changes saved"}
            {saveStatus === "saving" && "Saving…"}
            {saveStatus === "unsaved" && "Unsaved changes"}
            {saveStatus === "error" && "Save failed"}
          </span>
          <Button
            variant="secondary"
            onClick={saveDraft}
            loading={saveStatus === "saving"}
          >
            Save
          </Button>
          <Button
            variant="secondary"
            onClick={() => setPreviewOpen(true)}
          >
            Preview
          </Button>
          <Button
            onClick={() => showToast("Chapter sent for review")}
          >
            Send for review
          </Button>
        </div>
      </div>

      <div
        className="editor-toolbar"
        role="toolbar"
        aria-label="Writing tools"
      >
        <div className="toolbar-group toolbar-style">
          <label className="sr-only" htmlFor="paragraph-style">
            Paragraph style
          </label>
          <select id="paragraph-style" defaultValue="Body">
            <option>Body</option>
            <option>Chapter title</option>
            <option>Section heading</option>
            <option>Block quote</option>
            <option>Epigraph</option>
          </select>
        </div>
        <div className="toolbar-group">
          <button onClick={() => replaceSelection("**")} aria-label="Bold">
            <b>B</b>
          </button>
          <button onClick={() => replaceSelection("_")} aria-label="Italic">
            <i>I</i>
          </button>
          <button
            onClick={() =>
              replaceSelection("[", "](link)", "link text")
            }
            aria-label="Add link"
          >
            <span className="link-glyph">↗</span>
          </button>
        </div>
        <div className="toolbar-group">
          <button
            onClick={() => insertAtCursor("\n\n— — —\n\n")}
            aria-label="Insert scene break"
          >
            ✦
          </button>
          <button
            onClick={() => insertAtCursor("—")}
            aria-label="Insert em dash"
          >
            —
          </button>
          <button
            onClick={() =>
              replaceSelection("“", "”", "dialogue")
            }
            aria-label="Add dialogue quotation"
          >
            “ ”
          </button>
        </div>
        <div className="toolbar-spacer" />
        <button
          className={
            "focus-toggle " + (focusMode ? "active" : "")
          }
          onClick={() => setFocusMode((current) => !current)}
        >
          {focusMode ? "Exit focus" : "Focus mode"}
        </button>
        <span className="toolbar-count">{wordCount} words</span>
      </div>

      <div className="editor-workspace">
        <aside className="chapter-outline">
          <div className="outline-head">
            <span className="eyebrow">Manuscript</span>
          </div>
          <span className="outline-book">
            {book.title} <small>{book.chapters.length} chapters</small>
          </span>
          {book.chapters.map((item) => (
            <button
              className={item.id === chapter.id ? "active" : undefined}
              key={item.id}
              onClick={() => openChapter(item.id)}
            >
              <span>
                {item.number} · {item.title}
              </span>
              {item.id === chapter.id && <small>Editing</small>}
            </button>
          ))}
          <button className="add-scene" onClick={addChapter}>
            <Icon name="plus" size={15} /> Add chapter
          </button>
          <div className="outline-note">
            <span>Chapter note</span>
            <p>She receives the reply just before the rain.</p>
          </div>
        </aside>

        <article className="paper-editor">
          <div className="paper-kicker">
            <span>Part 1 · Chapter {chapter.number}</span>
            <span>{chapter.status}</span>
          </div>
          <h2 lang="bn">{chapter.title}</h2>
          <textarea
            ref={textareaRef}
            aria-label="Chapter text"
            lang="bn"
            value={draft}
            onChange={(event) => {
              setDraft(event.target.value);
              setSaveStatus("unsaved");
            }}
            style={{ lineHeight: lineSpacing }}
          />
          <footer>
            <span>
              {wordCount} words ·{" "}
              {draft.split(/\n+/u).filter(Boolean).length} paragraphs
            </span>
            <span>
              {saveStatus === "saved"
                ? "Last saved just now"
                : "Editing"}
            </span>
          </footer>
        </article>

        <aside className="editor-tools">
          <div
            className="tool-tabs"
            role="tablist"
            aria-label="Writing assistant panels"
          >
            {(["Craft", "Notes", "Review"] as const).map((tab) => (
              <button
                role="tab"
                aria-selected={toolTab === tab}
                className={toolTab === tab ? "active" : undefined}
                onClick={() => setToolTab(tab)}
                key={tab}
              >
                {tab}
              </button>
            ))}
          </div>
          <section className="writing-goal">
            <div>
              <span className="eyebrow">Today&apos;s goal</span>
              <strong>
                {wordCount.toLocaleString()}{" "}
                <small>/ {goal.toLocaleString()}</small>
              </strong>
            </div>
            <span>{progress}%</span>
            <div className="goal-meter">
              <i style={{ width: String(progress) + "%" }} />
            </div>
            <small>
              {Math.max(0, goal - wordCount).toLocaleString()} words to go
            </small>
          </section>

          {toolTab === "Craft" && (
            <>
              <section className="chapter-settings">
                <span className="eyebrow">Manuscript format</span>
                <label>
                  Line spacing
                  <select
                    value={lineSpacing}
                    onChange={(event) =>
                      setLineSpacing(event.target.value)
                    }
                  >
                    <option value="1.6">Compact · 1.6</option>
                    <option value="1.8">Comfortable · 1.8</option>
                    <option value="2">Submission · Double</option>
                  </select>
                </label>
              </section>
              <div className="quick-tools">
                <span className="eyebrow">Story tools</span>
                <button
                  onClick={() => showToast("Character bible opened")}
                >
                  <span>Characters</span>
                  <small>6 profiles</small>
                </button>
                <button
                  onClick={() => showToast("Find and replace opened")}
                >
                  <span>Find & replace</span>
                  <small>⌘ F</small>
                </button>
              </div>
            </>
          )}
          {toolTab === "Notes" && (
            <div className="editor-note">
              <small>Chapter intention</small>
              <p>
                Let the reader feel the long wait before the answer
                arrives.
              </p>
              <button onClick={() => showToast("Note editor opened")}>
                Edit note
              </button>
            </div>
          )}
          {toolTab === "Review" && (
            <div className="editor-note">
              <small>Editor note</small>
              <p>
                Let the silence breathe one line longer before the
                letter appears.
              </p>
              <button
                onClick={() => showToast("Editor note resolved")}
              >
                Mark resolved
              </button>
            </div>
          )}
          <div className="writer-encouragement">
            <span>12 day rhythm</span>
            <p>
              You do not need a perfect chapter today. Keep the scene
              moving.
            </p>
          </div>
        </aside>
      </div>

      <Modal
        open={previewOpen}
        title={chapter.title}
        eyebrow={book.title}
        description="Reader preview"
        onClose={() => setPreviewOpen(false)}
        wide
      >
        <article className="editor-preview-copy" lang="bn">
          {draft.split(/\n\n+/u).map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </article>
      </Modal>
    </div>
  );
}
