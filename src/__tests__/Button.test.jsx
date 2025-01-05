import { render, screen, fireEvent } from "@testing-library/react";
import { jest } from "@jest/globals";
import { test, expect } from "@jest/globals";
import { axe, toHaveNoViolations } from "jest-axe";
import "@testing-library/jest-dom";
import Button from "../components/Button";

expect.extend(toHaveNoViolations);

test("renders the Button component with href as a link", () => {
  render(<Button href="https://example.com">Click me</Button>);

  const linkElement = screen.getByRole("link", { name: /Click me/i });
  expect(linkElement).toBeInTheDocument();
  expect(linkElement).toHaveAttribute("href", "https://example.com");
});

test("renders the Button component without href as a normal button", () => {
  const handleClick = jest.fn();
  render(<Button onClick={handleClick}>Click me</Button>);

  const buttonElement = screen.getByRole("button", { name: /Click me/i });
  expect(buttonElement).toBeInTheDocument();

  fireEvent.click(buttonElement);
  expect(handleClick).toHaveBeenCalledTimes(1);
});

test("renders the Button component with white prop", () => {
  render(<Button white>Click me</Button>);

  const buttonElement = screen.getByRole("button", { name: /Click me/i });
  expect(buttonElement).toHaveClass("text-n-8");
});

test("should have no accessibility violations", async () => {
  const { container } = render(<Button>Click me</Button>);
  const results = await axe(container);
  expect(results).toHaveNoViolations();
});
