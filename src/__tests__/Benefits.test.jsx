import { render, screen } from "@testing-library/react";
import { test, expect, describe } from "@jest/globals";
import { axe, toHaveNoViolations } from "jest-axe";
import "@testing-library/jest-dom";
import Benefits from "../components/Benefits";
import { benefits } from "../constants";

expect.extend(toHaveNoViolations);

const numberOfBenefits = benefits.length;

describe("Benefits Component", () => {
  test("renders the heading correctly", () => {
    render(<Benefits />);
    const heading = screen.getByText("Chat Smarter, Not Harder with ConvoAI");
    expect(heading).toBeInTheDocument();
  });

  test("renders all benefits correctly", () => {
    render(<Benefits />);
    const benefitsRendered = screen.getAllByRole("img");
    expect(benefitsRendered.length).toBe(numberOfBenefits);
  });

  test("should have no accessibility violations", async () => {
    const { container } = render(<Benefits />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
