import { fireEvent, render, screen } from "@testing-library/react";
import React from "react";
import { MemoryRouter } from "react-router-dom";

import CustomeCard from "../src/components/CustomeCard";

const ṃockAstronautData = {
  name: "John Doe",
  id: "123",
  designation: "Astronaut",
  name_limited: "John",
  absolute_magnitude_h: 5.6,
};

describe("CustomeCard", () => {
  test("should render the Card", () => {
    const component = render(<CustomeCard astronaut={ṃockAstronautData} />);
    expect(component).toMatchSnapshot();
  });
});
