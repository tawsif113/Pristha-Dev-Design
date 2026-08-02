import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { Modal } from "@/src/components/ui/modal";

describe("Modal", () => {
  it("closes with Escape and exposes its accessible title", async () => {
    const user = userEvent.setup();
    const onClose = vi.fn();
    render(
      <Modal open title="Choose a chapter" onClose={onClose}>
        <button>Continue</button>
      </Modal>,
    );
    expect(
      screen.getByRole("dialog", { name: "Choose a chapter" }),
    ).toBeInTheDocument();
    await user.keyboard("{Escape}");
    expect(onClose).toHaveBeenCalledOnce();
  });
});
