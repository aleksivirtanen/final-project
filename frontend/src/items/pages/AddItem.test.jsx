import { act, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { QueryClient, QueryClientProvider } from "react-query";
import AddItem from "./AddItem";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

const wrapper = ({ children }) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);

describe("AddItem page -component", () => {
  test("Should show a group of input fields and Add Item button", () => {
    render(<AddItem />, { wrapper });
    expect(screen.getByLabelText("Title")).toBeInTheDocument();
    expect(screen.getByLabelText("Description")).toBeInTheDocument();
    expect(screen.getByLabelText("Price")).toBeInTheDocument();
    expect(screen.getByLabelText("Category")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Add Item" })
    ).toBeInTheDocument();
  });
  test("Should display error messages for invalid inputs", async () => {
    render(<AddItem />, { wrapper });
    const button = screen.getByRole("button", { name: "Add Item" });
    await act(async () => {
      await userEvent.click(button);
    });
    expect(
      screen.getByText("Invalid input. Title must contain 3 to 60 characters")
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        "Invalid input. Please enter the price in the form xx.xx"
      )
    ).toBeInTheDocument();
    expect(screen.getByText("Please select a category.")).toBeInTheDocument();
  });
});
