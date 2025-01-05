import { render, screen } from "@testing-library/react";
import { test, expect, describe, jest } from "@jest/globals";
import { axe, toHaveNoViolations } from "jest-axe";
import "@testing-library/jest-dom";
import PricingList from "../components/PricingList";

expect.extend(toHaveNoViolations);

jest.mock("../constants", () => ({
  pricing: [
    {
      id: 1,
      title: "Basic",
      description: "Basic plan description",
      price: 10,
      features: [],
    },
    {
      id: 2,
      title: "Pro",
      description: "Pro plan description",
      price: 20,
      features: [],
    },
    {
      id: 3,
      title: "Enterprise",
      description: "Enterprise plan description",
      price: 30,
      features: [],
    },
  ],
}));

describe("PricingList Component", () => {
  test("renders the pricing items correctly", () => {
    render(<PricingList />);
    const basicPlan = screen.getByText("Basic");
    const proPlan = screen.getByText("Pro");
    const enterprisePlan = screen.getByText("Enterprise");
    expect(basicPlan).toBeInTheDocument();
    expect(proPlan).toBeInTheDocument();
    expect(enterprisePlan).toBeInTheDocument();

    const basicDescription = screen.getByText("Basic plan description");
    const proDescription = screen.getByText("Pro plan description");
    const enterpriseDescription = screen.getByText(
      "Enterprise plan description"
    );
    expect(basicDescription).toBeInTheDocument();
    expect(proDescription).toBeInTheDocument();
    expect(enterpriseDescription).toBeInTheDocument();

    const basicPrice = screen.getByText("10");
    const proPrice = screen.getByText("20");
    expect(basicPrice).toBeInTheDocument();
    expect(proPrice).toBeInTheDocument();
  });

  test("renders the buttons correctly", () => {
    render(<PricingList />);
    const getStartedButtons = screen.getAllByText("Get started");
    expect(getStartedButtons).toHaveLength(3);

    getStartedButtons.forEach((button) => {
      expect(button.closest("a")).toHaveAttribute("href", "/pricing");
    });
  });

  test("should have no accessibility violations", async () => {
    const { container } = render(<PricingList />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
