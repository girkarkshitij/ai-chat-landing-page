import { render, screen } from "@testing-library/react";
import { test, expect, describe, jest } from "@jest/globals";
import { axe, toHaveNoViolations } from "jest-axe";
import "@testing-library/jest-dom";
import Roadmap from "../components/Roadmap";

expect.extend(toHaveNoViolations);

jest.mock("../constants", () => ({
  roadmap: [
    { id: 1, date: "Q1 2023", status: "done", colorful: true },
    { id: 2, date: "Q2 2023", status: "in progress", colorful: false },
  ],
}));

describe("Roadmap Component", () => {
  test("renders the heading and subheading correctly", () => {
    render(<Roadmap />);
    const heading = screen.getByText("Ready to get started");
    const subheading = screen.getByText("What we’re working on");
    expect(heading).toBeInTheDocument();
    expect(subheading).toBeInTheDocument();
  });

  test("renders the roadmap items correctly", () => {
    render(<Roadmap />);
    const firstItem = screen.getByText("Q1 2023");
    const secondItem = screen.getByText("Q2 2023");
    expect(firstItem).toBeInTheDocument();
    expect(secondItem).toBeInTheDocument();

    const firstStatus = screen.getByText("Done");
    const secondStatus = screen.getByText("In progress");
    expect(firstStatus).toBeInTheDocument();
    expect(secondStatus).toBeInTheDocument();
  });

  test("should have no accessibility violations", async () => {
    const { container } = render(<Roadmap />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
