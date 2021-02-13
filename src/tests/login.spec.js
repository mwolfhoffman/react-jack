import React from "react";
import { unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import Login from "../components/login";
import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";
import { render, fireEvent, screen } from "@testing-library/react";

let mockStore = configureMockStore();
let container = null;
let store;

describe("login.js", () => {
  beforeEach(() => {
    // setup a DOM element as a render target
    container = document.createElement("div");
    document.body.appendChild(container);
    store = mockStore({ players: [], gameOver: false });
  });

  afterEach(() => {
    // cleanup on exiting
    unmountComponentAtNode(container);
    container.remove();
    container = null;
  });

  it("Component can be created.", () => {
    act(function () {
      render(
        <Provider store={store}>
          <Login />
        </Provider>,
        container
      );
    });
    expect(container).toBeTruthy();
  });

  it("Login button disabled if no username", () => {
    act(function () {
      const createStandardDeck = jest.fn();
      render(
        <Provider store={store}>
          <Login createStandardDeck={createStandardDeck} />
        </Provider>
      );

      let button = document.getElementById("login-btn");
      expect(button).toBeTruthy();
      button.dispatchEvent(new MouseEvent("click", { bubbles: true }));
      expect(createStandardDeck).toHaveBeenCalledTimes(0);
    });
  });

  // it("Deck is created if username is present and button clicked", () => {
  //   act(function () {
  //     const createStandardDeck = jest.fn((e) => e.preventDefault());
  //     render(
  //       <Provider store={store}>
  //         <Login createStandardDeck={createStandardDeck} />
  //       </Provider>
  //     );
  //     container.username = "Test";
  //     let button = document.getElementById("login-btn");
  //     expect(button).toBeTruthy();
  //     button.dispatchEvent(new MouseEvent("click", { bubbles: true }));
  //     expect(createStandardDeck).toHaveBeenCalledTimes(1);
  //   });
  // });
});
