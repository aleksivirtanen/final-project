import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { AuthContext } from "../../context/auth-context";
import NavLinks from "./NavLinks";

describe("The Navigation Links", () => {
  test("Should only show ALL LISTINGS and AUTHENTICATE when not logged in", () => {
    render(
      <AuthContext.Provider
        value={{
          isLoggedIn: false,
          token: null,
          userId: null,
          login: () => {},
          logout: () => {},
        }}
      >
        <BrowserRouter>
          <NavLinks />;
        </BrowserRouter>
      </AuthContext.Provider>
    );
    expect(screen.getByRole("list")).toHaveClass("nav-links");
    expect(screen.getByText("ALL LISTINGS")).toBeInTheDocument();
    expect(screen.getByText("ALL LISTINGS")).toHaveAttribute("href", "/");
    expect(screen.getByText("AUTHENTICATE")).toBeInTheDocument();
    expect(screen.getByText("AUTHENTICATE")).toHaveAttribute("href", "/auth");
    expect(screen.queryByText("ALL USERS")).toBeNull();
  });

  test("Should only show ALL LISTINGS, ALL USERS and LOGOUT when authenticated", () => {
    render(
      <AuthContext.Provider
        value={{
          isLoggedIn: true,
          token: "1234567890-0987654321",
          userId: "userId1",
          login: () => {},
          logout: () => {},
        }}
      >
        <BrowserRouter>
          <NavLinks />;
        </BrowserRouter>
      </AuthContext.Provider>
    );
    expect(screen.getByRole("list")).toHaveClass("nav-links");
    expect(screen.getByText("ALL LISTINGS")).toBeInTheDocument();
    expect(screen.getByText("ALL LISTINGS")).toHaveAttribute("href", "/");
    expect(screen.queryByText("AUTHENTICATE")).toBeNull();
    expect(screen.getByText("ALL USERS")).toBeInTheDocument();
    expect(screen.getByText("ALL USERS")).toHaveAttribute("href", "/users");
    expect(screen.getByText("ADD ITEM")).toBeInTheDocument();
    expect(screen.getByText("ADD ITEM")).toHaveAttribute("href", "/items/new");
    expect(screen.getByRole("button", { name: "LOGOUT" })).toBeInTheDocument();
  });
});
