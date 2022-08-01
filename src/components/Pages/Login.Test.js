import Login from "./Login";
import { render, screen  } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Provider } from "react-redux";
import store from "../../store/index";

describe("AuthForm Testing", () => {
  test("Sign Up Exists", () => {
    render(
      <Provider store={store}>
        <Login />
      </Provider>
    );

    const signUpElement = screen.getByText("Sign Up");
    expect(signUpElement).toBeInTheDocument;
  });
  test("Email Exists", () => {
    render(
      <Provider store={store}>
        <Login />
      </Provider>
    );
    const emailElement = screen.getByText("Your Email");
    expect(emailElement).toBeInTheDocument;
  });
  test("Password Exists", () => {
    render(
      <Provider store={store}>
        <Login />
      </Provider>
    );
    const passElement = screen.getByText("Your Password");
    expect(passElement).toBeInTheDocument;
  });
  test("Create Account Exits", () => {
    render(
      <Provider store={store}>
        <Login />
      </Provider>
    );
    const loginElement = screen.getByText("Create Account");
    expect(loginElement).toBeInTheDocument;
  });
  test("Login Exists", () => {
    render(
      <Provider store={store}>
        <Login />
      </Provider>
    );
    const linkElement = screen.getByText("Login with existing account");
    expect(linkElement).toBeInTheDocument;
  });

  test("Redirect to Login Page", () => {
    render(
      <Provider store={store}>
        <Login />
      </Provider>
    );
    const yourEmail = screen.getByText("Login with existing account");
    userEvent.click(yourEmail);
    const loginText = screen.getByText("Your Email");
    expect(loginText).toBeInTheDocument;
  });
});