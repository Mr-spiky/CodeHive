
"use client";

import { useState } from "react";
import { AlertTriangle, Trash2, X } from "lucide-react";
import { deleteBlogPost } from "../actions";

type BlogDeleteButtonProps = {
  postId: string;
  postTitle: string;
  buttonClassName: string;
};

export default function BlogDeleteButton({
  postId,
  postTitle,
  buttonClassName,
}: BlogDeleteButtonProps) {
  const [isOpen, setIsOpen] = useState(false);

  function closeModal() {
    setIsOpen(false);
  }

  return (
    <>
      <button
        type="button"
        aria-label={`Delete ${postTitle}`}
        title="Delete article"
        className={buttonClassName}
        onClick={() => setIsOpen(true)}
      >
        Delete
      </button>

      {isOpen && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/75 p-4 backdrop-blur-sm"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              closeModal();
            }
          }}
        >
          <section
            role="alertdialog"
            aria-modal="true"
            aria-labelledby={`delete-title-${postId}`}
            aria-describedby={`delete-description-${postId}`}
            className="w-full max-w-md overflow-hidden rounded-2xl border border-white/[0.12] bg-[#101018] shadow-2xl shadow-black/50"
          >
            <div className="flex items-start gap-4 border-b border-white/[0.08] p-5 sm:p-6">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-red-400/20 bg-red-500/[0.12] text-red-300">
                <AlertTriangle size={20} />
              </div>

              <div className="min-w-0 flex-1">
                <h2
                  id={`delete-title-${postId}`}
                  className="text-base font-semibold tracking-tight text-white"
                >
                  Delete this article?
                </h2>

                <p
                  id={`delete-description-${postId}`}
                  className="mt-1.5 text-sm leading-6 text-white/50"
                >
                  This will permanently delete the article and cannot be undone.
                </p>

                <p className="mt-3 break-words rounded-lg border border-white/[0.07] bg-white/[0.025] px-3 py-2 text-sm text-white/80">
                  {postTitle}
                </p>
              </div>

              <button
                type="button"
                aria-label="Close confirmation"
                onClick={closeModal}
                className="rounded-lg p-1.5 text-white/40 transition hover:bg-white/[0.06] hover:text-white"
              >
                <X size={17} />
              </button>
            </div>

            <div className="flex flex-col-reverse gap-2 p-5 sm:flex-row sm:justify-end sm:p-6">
              <button
                type="button"
                onClick={closeModal}
                className="inline-flex h-10 items-center justify-center rounded-xl border border-white/[0.12] px-4 text-sm font-medium text-white/75 transition hover:bg-white/[0.05] hover:text-white"
              >
                Cancel
              </button>

              <form action={deleteBlogPost}>
                <input
                  type="hidden"
                  name="id"
                  value={postId}
                />

                <button
                  type="submit"
                  className="inline-flex h-10 w-full items-center justify-center gap-2 rounded-xl border border-red-400/30 bg-red-500/15 px-4 text-sm font-semibold text-red-200 transition hover:border-red-400/50 hover:bg-red-500/25 hover:text-white sm:w-auto"
                >
                  <Trash2 size={15} />
                  Delete article
                </button>
              </form>
            </div>
          </section>
        </div>
      )}
    </>
  );
}
