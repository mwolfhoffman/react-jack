import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import App from "../App";
import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";

let mockStore = configureMockStore();
let container = null;
let store;

describe("App.js", () => {

  beforeEach(() => {
    // setup a DOM element as a render target
    container = document.createElement("div");
    document.body.appendChild(container);
    store = mockStore({ players:[], gameOver:false});
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
          <App  />
        </Provider>,
        container
      );
    });
    expect(container).toBeTruthy();
  });
});
