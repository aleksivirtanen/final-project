import { render, screen } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "react-query";
import Items from "./Items";

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

describe("Items page -component", () => {
  test("Should show a loading spinner while fetching content", () => {
    render(<Items />, { wrapper });
    expect(screen.getByTestId("loading-spinner")).toBeInTheDocument();
  });
});
