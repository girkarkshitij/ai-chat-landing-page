import { render, screen } from "@testing-library/react";
import { test, expect } from "@jest/globals";
import "@testing-library/jest-dom";
import { axe, toHaveNoViolations } from "jest-axe";
import Hero from "../components/Hero";

expect.extend(toHaveNoViolations);

test("renders the Hero component", () => {
  render(<Hero />);

  expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
    /Explore the Possibilities of AI Chatting with ConvoAI/i
  );

  const imgElement = screen.getByAltText("Curve");
  expect(imgElement).toBeInTheDocument();

  const buttonElement = screen.getByRole("link", { name: /Get started/i });
  expect(buttonElement).toBeInTheDocument();
});

test("should have no accessibility violations", async () => {
  const { container } = render(<Hero />);
  const results = await axe(container);
  expect(results).toHaveNoViolations();
});
