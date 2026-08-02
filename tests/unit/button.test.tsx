import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { Button } from "@/src/components/ui/button";

describe("Button", () => {
  it("supports activation and loading state", async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();
    const { rerender } = render(
      <Button onClick={onClick}>Continue writing</Button>,
    );
    await user.click(
      screen.getByRole("button", { name: "Continue writing" }),
    );
    expect(onClick).toHaveBeenCalledOnce();

    rerender(
      <Button loading onClick={onClick}>
        Continue writing
      </Button>,
    );
    expect(
      screen.getByRole("button", { name: "Continue writing" }),
    ).toBeDisabled();
  });
});
