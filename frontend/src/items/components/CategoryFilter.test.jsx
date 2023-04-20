import { act, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { QueryClient, QueryClientProvider } from "react-query";
import CategoryFilter from "./CategoryFilter";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

const checkboxHandler = (state) => {
  console.log(state);
};

const wrapper = ({ children }) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);

describe("CategoryFilter -component", () => {
  test("should render a group of checkboxes that are checked by default", () => {
    render(<CategoryFilter />, { wrapper });
    const checkboxShelters = screen
      .getByTestId("shelters")
      .querySelector('input[type="checkbox"]');
    expect(checkboxShelters).toHaveProperty("checked", true);
    const checkboxSleeping = screen
      .getByTestId("sleeping")
      .querySelector('input[type="checkbox"]');
    expect(checkboxSleeping).toHaveProperty("checked", true);
  });
  test("should switch checkbox checked status to false when clicked", async () => {
    render(<CategoryFilter checkboxHandler={checkboxHandler} />, { wrapper });
    const checkboxShelters = screen
      .getByTestId("shelters")
      .querySelector('input[type="checkbox"]');
    expect(checkboxShelters).toHaveProperty("checked", true);
    await act(async () => {
      await userEvent.click(checkboxShelters);
    });
    expect(checkboxShelters).toHaveProperty("checked", false);
  });
});
