/**
 * @jest-environment jsdom
 */
import "@testing-library/jest-dom";

import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import cartServices from "../services/cart";
import App from "./App";

jest.mock("../services/cart.js");

const mockData = [
  {
    id: 1,
    title: "Amazon Kindle E-reader",
    quantity: 5,
    price: 79.99,
  },
];

afterEach(() => {
  jest.resetAllMocks();
});

test("No product is shown", async () => {
  cartServices.getAllProducts.mockResolvedValue([]);
  cartServices.getCart.mockResolvedValue([]);

  render(<App />);
  const user = userEvent.setup();
  const productItem = screen.queryByRole("listitem");
  expect(productItem).not.toBeInTheDocument();
});

test("Cart is empty", async () => {
  cartServices.getAllProducts.mockResolvedValue([]);
  cartServices.getCart.mockResolvedValue([]);

  render(<App />);
  const user = userEvent.setup();
  const cart = screen.getByText("Your cart is empty");
  expect(cart).toBeInTheDocument();
});

test("Clicking add a product pulls up the form", async () => {
  cartServices.getAllProducts.mockResolvedValue(mockData);
  cartServices.getCart.mockResolvedValue([]);
  render(<App />);
  const user = userEvent.setup();

  const addFormButton = screen.getByRole("button", {
    name: "Add A Product",
  });

  await user.click(addFormButton);
  const addProductForm = screen.getByRole("heading", {
    level: 3,
    name: /Add Product/,
  });

  expect(addProductForm).toBeInTheDocument();
});

test("Ensure there is a product displayed", async () => {
  cartServices.getAllProducts.mockResolvedValue(mockData);
  cartServices.getCart.mockResolvedValue([]);
  render(<App />);
  const user = userEvent.setup();
  const productItem = await screen.findByRole("listitem");
  expect(productItem).toBeInTheDocument();
});

test("Deleting a product removes product", async () => {
  cartServices.getAllProducts.mockResolvedValue(mockData);
  cartServices.getCart.mockResolvedValue([]);
  render(<App />);
  const user = userEvent.setup();

  // NEED TO MOCK THE handleDeleteProduct function.
  const deleteButton = await screen.findByRole("button", { name: /X/ });
  await user.click(deleteButton);

  const productItem = screen.queryByRole("listitem");
  expect(productItem).not.toBeInTheDocument();
});

// test("add product to cart works", () => {

// });
