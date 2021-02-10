import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import Login from "../components/login";
import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";
import { shallow, mount, configure } from "enzyme";
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

configure({ adapter: new Adapter() });

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

//  TODO: finish this test, but Enzyme does not work with react 17 right now.
//   it("Cannot use empty string as username", () => {
//     act(function () {
//       const createStandardDeck = jest.fn();
//       const wrapper = mount(
//         <Provider store={store}>
//           <Login createStandardDeck={createStandardDeck} />
//         </Provider>
//       )
//       //   wrapper.setUsername((name) => (name = "test"));
//      const jumbotron = wrapper.find(".jumbotron")
        
//     //   .dive().find("login-btn").simulate("click");
//       expect(jumbotron.length).toEqual(1);

//     //   let button = wrapper.find("#login-btn");
//     //   button.simulate("click");
//     //   expect(createStandardDeck).toHaveBeenCalled();
//     });
//   });
});
