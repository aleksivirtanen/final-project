import { render, screen } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "react-query";
import ItemsList from "./ItemsList";

const TEST_ITEMS_DATA = [
  {
    id: 1,
    itemName: "This is a Tent",
    category: "Shelters",
    description: "Description...",
    price: 100.99,
    image:
      "https://www.varusteleka.fi/pictures/thumbsfb/37660590838e2234b0.jpg",
  },
  {
    id: 2,
    itemName: "Water Bottle",
    category: "Canteents and Hydration Bladders",
    description: "Description...",
    price: 10.99,
    image:
      "https://www.varusteleka.com/pictures/thumbs2000/130057976dffee563.jpg",
  },
  {
    id: 3,
    itemName: "Heat Pack",
    category: "Fire and Warmth",
    description: "Description...",
    price: 3.99,
    image:
      "https://www.varusteleka.com/pictures/thumbs500a/581486392f1648603e.jpg",
  },
];

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

describe("ItemsList -component", () => {
  test("should show no items when no items are available", () => {
    render(<ItemsList items={[]} />);
    expect(screen.getByText("No items found.")).toBeInTheDocument();
  });
  test("should show a list of items", () => {
    render(<ItemsList items={TEST_ITEMS_DATA} />, { wrapper });
    expect(screen.queryByText("No cities found.")).toBeNull();
    expect(screen.getByText("Heat Pack")).toBeInTheDocument();
    expect(screen.getByText("10.99 €")).toBeInTheDocument();
  });
});
