import { render, screen } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "react-query";
import { AuthContext } from "../../shared/context/auth-context";
import Item from "./Item";

const TEST_ITEM_DATA = {
  id: 1,
  userId: "userId1",
  userName: "Test User",
  itemName: "This is a Tent",
  category: "Shelters",
  description: "Description...",
  price: 100.99,
  image: "https://www.varusteleka.fi/pictures/thumbsfb/37660590838e2234b0.jpg",
};

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

describe("Item -component", () => {
  test("Should show an item when given", () => {
    render(
      <Item
        key={TEST_ITEM_DATA.id}
        id={TEST_ITEM_DATA.id}
        itemName={TEST_ITEM_DATA.itemName}
        userName={TEST_ITEM_DATA.userName}
        category={TEST_ITEM_DATA.category}
        description={TEST_ITEM_DATA.description}
        price={TEST_ITEM_DATA.price}
        image={TEST_ITEM_DATA.image}
        authRequired={true}
      />,
      { wrapper }
    );
    expect(screen.getByText("This is a Tent")).toBeInTheDocument();
    expect(screen.getByText("Shelters")).toBeInTheDocument();
    expect(screen.queryByText("Owner: Test User")).toBeNull();
  });
  test("Should display owners name when authRequired is false", () => {
    render(
      <Item
        key={TEST_ITEM_DATA.id}
        id={TEST_ITEM_DATA.id}
        itemName={TEST_ITEM_DATA.itemName}
        userName={TEST_ITEM_DATA.userName}
        category={TEST_ITEM_DATA.category}
        description={TEST_ITEM_DATA.description}
        price={TEST_ITEM_DATA.price}
        image={TEST_ITEM_DATA.image}
        authRequired={false}
      />,
      { wrapper }
    );
    expect(screen.getByText("Owner: Test User")).toBeInTheDocument();
  });
  test("Should show edit/delete buttons when authRequired is true and listing belongs to user", () => {
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
        <Item
          key={TEST_ITEM_DATA.id}
          id={TEST_ITEM_DATA.id}
          userId={TEST_ITEM_DATA.userId}
          itemName={TEST_ITEM_DATA.itemName}
          userName={TEST_ITEM_DATA.userName}
          category={TEST_ITEM_DATA.category}
          description={TEST_ITEM_DATA.description}
          price={TEST_ITEM_DATA.price}
          image={TEST_ITEM_DATA.image}
          authRequired={true}
        />
      </AuthContext.Provider>,
      { wrapper }
    );
    expect(screen.getByRole("button", { name: "Edit" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Delete" })).toBeInTheDocument();
  });
});
