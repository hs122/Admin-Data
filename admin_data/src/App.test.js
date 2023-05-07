import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import Dashboard from "./component/Dashboard/Dashboard";

describe("Dashboard", () => {
  test("renders loading message when no data is present", () => {
    const { container } = render(<Dashboard />);
    expect(container).toHaveTextContent("Loading....");
  });

  test("renders error message when error is present", () => {
    const { container } = render(<Dashboard error={true} />);
    expect(container).toHaveTextContent("Error...");
  });

})