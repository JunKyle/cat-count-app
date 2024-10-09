import { render, screen } from "@testing-library/react";
import App from "./App";
import Home from "./Home";

jest.mock("react-router-dom", () => ({
  useHistory: () => ({
    push: jest.fn(),
  }),
  Link: jest.fn().mockImplementation(({ children }) => {
    return children;
  }),
}));

test("renders learn react link", () => {
  render(() => <App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});

test("home renders learn react link", () => {
  render(() => <Home />);
  console.log("screen", screen);
  const linkElement = screen
    .getByTestId("home-validate-link")
    .toHaveText("Valider");

  expect(linkElement).toBeInTheDocument();
});
