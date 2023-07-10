import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import Home from "../src/routes/Home";
import React from "react";
import { MemoryRouter } from "react-router-dom";

describe("Home", () => {
  it("should render the text-box, search button & random button", () => {
    // render the App
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );
    // grab the input box & the button

    const input = screen.getByLabelText(/Enter id/i);
    expect(input).toBeVisible();

    const btn1 = screen.getByRole("button", { name: /Search/i });
    expect(btn1).toBeVisible();
    fireEvent.click(btn1);

    const btn2 = screen.getByRole("button", { name: /RANDOM ASTRONAUT/i });
    expect(btn2).toBeVisible();
    fireEvent.click(btn2);

    // check loading txt
    const loadingText = screen.getByText(/Loading.../i);
    expect(loadingText).toBeVisible();
  });

  it("user can enter text in the text-box and able to click the button (redirect to next page)", () => {
    // render the App
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );
    const input = screen.getByLabelText(/Enter id/i);
    fireEvent.change(input, { target: { value: "2001864" } });
    expect(input).toHaveValue("2001864");

    const btn1 = screen.getByRole("button", { name: /Search/i });
    fireEvent.click(btn1);

    const btn2 = screen.getByRole("button", { name: /RANDOM ASTRONAUT/i });
    fireEvent.click(btn2);
  });

  it("check user redirect to next page or not, after click on the search button", () => {
    // render the App
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );

    const input = screen.getByLabelText(/Enter id/i);
    fireEvent.change(input, { target: { value: "2001620" } });

    const btn1 = screen.getByRole("button", { name: /Search/i });
    fireEvent.click(btn1);

    const loadingText = screen.getByText(/Loading.../i);
    expect(loadingText).toBeVisible();
  });

  it("if user enter wrong astro ID, should render the error (no redirect to next page)", async () => {
    // render the App
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );
    const input = screen.getByLabelText(/Enter id/i);
    fireEvent.change(input, { target: { value: "21132123" } });

    const btn = screen.getByRole("button", { name: /Search/i });
    fireEvent.click(btn);

    await waitFor(
      async () => {
        const noFoundText = await screen.findByText(/No Astro Found/i);
        expect(noFoundText).toBeVisible();
      },
      { timeout: 10000 }
    );
  });

  it("the search button should not be clickable if there's no input", () => {
    // render the App
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );
    const input = screen.getByLabelText(/Enter id/i);
    fireEvent.change(input, { target: { value: "" } });

    const btn = screen.getByRole("button", { name: /Search/i });
    expect(btn).toBeDisabled();
  });

  it("user should only enter numbers, not string ", () => {
    // render the App
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );
    const input = screen.getByLabelText(/Enter id/i);
    fireEvent.change(input, { target: { value: "hello world" } });

    const btn = screen.getByRole("button", { name: /Search/i });
    expect(btn).toBeDisabled();
  });
});

// should render the text-box, search button & random button
// user can enter text in the text-box and able to click the button (redirect to next page)
// if user enter wrong astro ID, should render the error (no redirect to next page)
// user should only enter numbers, not string
// the button should not be clickable if there's no input
// random button should also work (redirect to next page)
