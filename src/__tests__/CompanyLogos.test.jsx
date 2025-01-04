import { render, screen } from "@testing-library/react";
import { test, expect, describe } from "@jest/globals";
import { axe, toHaveNoViolations } from "jest-axe";
import "@testing-library/jest-dom";
import { jest } from "@jest/globals";
import CompanyLogos from "../components/CompanyLogos";
import { companyLogos } from "../constants";

expect.extend(toHaveNoViolations);

const numberOfLogos = companyLogos.length;

jest.mock("../constants", () => ({
  companyLogos: ["logo1.png", "logo2.png", "logo3.png"],
}));

describe("CompanyLogos Component", () => {
  test("renders the tagline correctly", () => {
    render(<CompanyLogos />);
    const tagline = screen.getByText(
      "Helping people create beautiful content at"
    );
    expect(tagline).toBeInTheDocument();
  });

  test("renders all company logos correctly", () => {
    const mockLogos = ["logo1.png", "logo2.png", "logo3.png"];

    render(<CompanyLogos />);
    const logosRendered = screen.getAllByRole("img");
    logosRendered.forEach((logo, index) => {
      expect(logo).toHaveAttribute("alt", mockLogos[index]);
      expect(logo).toHaveAttribute("src", mockLogos[index]);
    });

    expect(logosRendered.length).toBe(numberOfLogos);
  });

  test("should have no accessibility violations", async () => {
    const { container } = render(<CompanyLogos />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
