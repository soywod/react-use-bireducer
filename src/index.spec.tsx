import "@testing-library/jest-dom";
import {fireEvent, render, screen} from "@testing-library/react";
import React from "react";

import {EffectReducer, StateReducer, useBireducer} from "../src";

type State = {
  count: number;
};

type Action = {type: "increment"; value: number} | {type: "decrement"; value: number} | {type: "reset"};

type Effect = {type: "log"; value: string} | {type: "backup"; count: number};

const stateReducer: StateReducer<State, Action, Effect> = (state, action) => {
  switch (action.type) {
    case "increment": {
      return [{count: state.count + action.value}, [{type: "log", value: `increment counter +${action.value}`}]];
    }
    case "decrement": {
      return [{count: state.count - action.value}, [{type: "log", value: `decrement counter -${action.value}`}]];
    }
    case "reset": {
      return [
        {count: 0},
        [
          {type: "log", value: "reset counter"},
          {type: "backup", count: state.count},
        ],
      ];
    }
  }
};

const effectReducer: EffectReducer<Effect> = effect => {
  switch (effect.type) {
    case "log": {
      console.log(effect.value);
      return;
    }
    case "backup": {
      localStorage.setItem("backup", String(effect.count));
      return () => {
        localStorage.clear();
      };
    }
  }
};

describe("useBireducer", () => {
  beforeAll(() => {
    global.Storage.prototype.setItem = jest.fn();
    global.Storage.prototype.clear = jest.fn();
    global.console.log = jest.fn();
  });

  beforeEach(() => {
    jest.restoreAllMocks();
  });

  afterAll(() => {
    jest.resetAllMocks();
  });

  it("should work", () => {
    function TestComponent() {
      const [state, dispatch] = useBireducer(stateReducer, effectReducer, {
        count: 0,
      });

      return (
        <>
          <span data-testid="counter">{state.count}</span>
          <button data-testid="decrement" onClick={() => dispatch({type: "decrement", value: 1})} />
          <button data-testid="increment" onClick={() => dispatch({type: "increment", value: 1})} />
          <button data-testid="reset" onClick={() => dispatch({type: "reset"})} />
        </>
      );
    }

    const {unmount} = render(<TestComponent />);
    expect(screen.getByTestId("counter")).toHaveTextContent("0");

    fireEvent.click(screen.getByTestId("increment"));
    fireEvent.click(screen.getByTestId("increment"));
    expect(screen.getByTestId("counter")).toHaveTextContent("2");
    expect(console.log).toHaveBeenNthCalledWith(2, "increment counter +1");

    fireEvent.click(screen.getByTestId("decrement"));
    expect(screen.getByTestId("counter")).toHaveTextContent("1");
    expect(console.log).toHaveBeenLastCalledWith("decrement counter -1");

    fireEvent.click(screen.getByTestId("reset"));
    expect(screen.getByTestId("counter")).toHaveTextContent("0");
    expect(console.log).toHaveBeenLastCalledWith("reset counter");
    expect(localStorage.setItem).toHaveBeenNthCalledWith(1, "backup", "1");
    expect(localStorage.clear).not.toHaveBeenCalled();

    unmount();
    expect(localStorage.clear).toHaveBeenCalledTimes(1);
  });
});
