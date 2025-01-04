import { render, screen } from "@testing-library/react";
import { test, expect, describe } from "@jest/globals";
import { axe, toHaveNoViolations } from "jest-axe";
import "@testing-library/jest-dom";
import Collaboration from "../components/Collaboration";

expect.extend(toHaveNoViolations);

describe("Collaboration Component", () => {
  test("renders images with correct alt text", () => {
    render(<Collaboration />);
    const images = screen.getAllByRole("img");
    images.forEach((img) => {
      expect(img).toHaveAttribute("alt");
      expect(img).toHaveAttribute("src");
    });
  });

  test("should have no accessibility violations", async () => {
    const { container } = render(<Collaboration />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
