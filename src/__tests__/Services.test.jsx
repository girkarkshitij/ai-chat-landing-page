import { render, screen } from "@testing-library/react";
import { test, expect, describe } from "@jest/globals";
import "@testing-library/jest-dom";
import Services from "../components/Services";
import { axe, toHaveNoViolations } from "jest-axe";

expect.extend(toHaveNoViolations);

describe("Services Component", () => {
  test("renders the heading and subheading correctly", () => {
    render(<Services />);
    const heading = screen.getByText("Generative AI made for creators.");
    const subheading = screen.getByText(
      "ConvoAI unlocks the potential of AI-powered applications"
    );
    expect(heading).toBeInTheDocument();
    expect(subheading).toBeInTheDocument();
  });

  test("renders the images correctly", () => {
    render(<Services />);
    const image = screen.getByAltText("Smartest AI");
    expect(image).toBeInTheDocument();
  });

  test("should have no accessibility violations", async () => {
    const { container } = render(<Services />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
