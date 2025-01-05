import { render, screen, fireEvent } from "@testing-library/react";
import { test, expect, describe } from "@jest/globals";
import "@testing-library/jest-dom";
import Header from "../components/Header";
import { MemoryRouter } from "react-router-dom";
import { navigation } from "../constants";

describe("Header Component", () => {
  test("renders logo with correct alt text and dimensions", () => {
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    );
    const logo = screen.getByAltText("logo");

    expect(logo).toBeInTheDocument();
    expect(logo).toHaveAttribute("src");
  });

  test("checks all menu items are rendered", () => {
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    );

    navigation.forEach((item) => {
      const link = screen.getByText(item.title, {
        selector: ".block",
      });
      expect(link).toHaveAttribute("href", item.url);
    });
  });

  test("toggles navigation menu visibility on hamburger menu click", () => {
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    );

    window.innerWidth = 500;
    window.dispatchEvent(new Event("resize"));

    const menuButton = screen.getByRole("button");
    expect(menuButton).toBeInTheDocument();

    const navElement = screen.getByRole("navigation");
    expect(navElement).toBeInTheDocument();

    expect(navElement).toHaveClass("hidden");
    expect(navElement).not.toHaveClass("flex");

    fireEvent.click(menuButton);

    expect(navElement).not.toHaveClass("hidden");
    expect(navElement).toHaveClass("flex");

    fireEvent.click(menuButton);

    expect(navElement).toHaveClass("hidden");
    expect(navElement).not.toHaveClass("flex");
  });

  test("closes navigation menu when a navigation link is clicked", () => {
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    );
    const menuButton = screen.getByRole("button");
    console.log("Menu Button" + menuButton);

    const navElement = screen.getByRole("navigation");

    fireEvent.click(menuButton);
    expect(navElement).not.toHaveClass("hidden");

    const firstLink = screen.getByText(/Features/i);
    console.log("First link" + firstLink);
    fireEvent.click(firstLink);

    expect(navElement).toHaveClass("hidden");
  });
});
