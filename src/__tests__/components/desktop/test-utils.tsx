import { render } from "@testing-library/react";
import { WindowManager } from "@/components/desktop/WindowManager";

/** Renders inside a real WindowManager, so tests exercise the actual state flow. */
export function renderInDesktop(ui: React.ReactNode) {
  return render(<WindowManager>{ui}</WindowManager>);
}
