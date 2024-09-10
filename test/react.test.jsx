import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { Calculator, equalSign, numbers, operations } from "../src/Calculator";

describe("Calculator", () => {
  afterEach(cleanup);

  it("should render", () => {
    render(<Calculator />);
  });

  it("should render title correctly", () => {
    render(<Calculator />);
    screen.getByText("Calculator");
  });

  it("should render numbers", () => {
    render(<Calculator />);
    numbers.forEach((number) => {
      screen.getByText(number);
    });
  });

  it("should render 4 rows", () => {
    render(<Calculator />);
    const rows = screen.getAllByRole("row");
    expect(rows).toHaveLength(4);
  });

  it("should render operations", () => {
    render(<Calculator />);
    operations.forEach((operation) => {
      screen.getByText(operation);
    });
  });

  it("should render equal sign", () => {
    render(<Calculator />);
    screen.getByText("=");
  });

  it("should render an input", () => {
    render(<Calculator />);
    screen.getByRole("textbox");
  });

  it("should user input after clicking a number", () => {
    render(<Calculator />);
    const one = screen.getByText("1");
    fireEvent.click(one);

    const input = screen.getByRole("textbox");
    expect(input.value).toBe("1");
  });

  it("should user input after clicking several numbers", () => {
    render(<Calculator />);
    const one = screen.getByText("1");
    fireEvent.click(one);

    const two = screen.getByText("2");
    fireEvent.click(two);

    const three = screen.getByText("3");
    fireEvent.click(three);

    const input = screen.getByRole("textbox");
    expect(input.value).toBe("123");
  });

  it("should show user input after clicking numbers and oprations", () => {
    render(<Calculator />);

    const one = screen.getByText("1");
    fireEvent.click(one);

    const plus = screen.getByText("+");
    fireEvent.click(plus);
    fireEvent.click(one);

    const input = screen.getByRole("textbox");
    expect(input.value).toBe("1+1");
  });

  it("should calculate based on user input and show the calculation", () => {
    render(<Calculator />);

    const one = screen.getByText("1");
    fireEvent.click(one);

    const plus = screen.getByText("+");
    fireEvent.click(plus);

    fireEvent.click(one);

    const equal = screen.getByText(equalSign);
    fireEvent.click(equal);

    const input = screen.getByRole("textbox");
    expect(input.value).toBe("2");
  });

  it("should start a new calculation based on the current input value", () => {
    render(<Calculator />);
    const one = screen.getByText("1");
    fireEvent.click(one);

    const plus = screen.getByText("+");
    fireEvent.click(plus);

    fireEvent.click(one);

    const equal = screen.getByText(equalSign);
    fireEvent.click(equal);

    const input = screen.getByRole("textbox");
    expect(input.value).toBe("2");

    fireEvent.click(plus);
    fireEvent.click(one);
    fireEvent.click(equal);
    expect(input.value).toBe("3");
  });

  it("should render clean button", () => {
    render(<Calculator />);
    screen.getByText("c");
  });

  it("should clean the current input value", () => {
    render(<Calculator />);
    const one = screen.getByText("1");
    fireEvent.click(one);

    const plus = screen.getByText("+");
    fireEvent.click(plus);

    fireEvent.click(one);

    const equal = screen.getByText(equalSign);
    fireEvent.click(equal);

    const input = screen.getByRole("textbox");
    expect(input.value).toBe("2");

    const clean = screen.getByText("c");
    fireEvent.click(clean);

    expect(input.value).toBe("");
  });

  it("should make a new calculation when clicking a number after the equal sign", () => {
    render(<Calculator />);
    const one = screen.getByText("1");
    fireEvent.click(one);

    const plus = screen.getByText("+");
    fireEvent.click(plus);

    fireEvent.click(one);

    const equal = screen.getByText(equalSign);
    fireEvent.click(equal);

    const input = screen.getByRole("textbox");
    expect(input.value).toBe("2");

    fireEvent.click(one);
    fireEvent.click(plus);
    fireEvent.click(one);
    fireEvent.click(equal);
    expect(input.value).toBe("2");
  });

  it("should make a new calculation after clicking clean button", () => {
    render(<Calculator />);
    const one = screen.getByText("1");
    fireEvent.click(one);

    const plus = screen.getByText("+");
    fireEvent.click(plus);

    fireEvent.click(one);

    const equal = screen.getByText(equalSign);
    fireEvent.click(equal);

    const input = screen.getByRole("textbox");
    expect(input.value).toBe("2");

    const clean = screen.getByText("c");
    fireEvent.click(clean);

    fireEvent.click(one);

    fireEvent.click(plus);

    fireEvent.click(one);

    fireEvent.click(equal);
    expect(input.value).toBe("2");
  });
});
