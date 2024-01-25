import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import DataTable from "../src/components/DataTable";
import { tableRows } from "./data/DataTable";

test("renders DataTable component with sample data", () => {
  const openModalMock = jest.fn();

  render(<DataTable data={tableRows} openModal={openModalMock} />);

  expect(screen.getByText("John Doe")).toBeTruthy();
});

test("clicking on a row calls openModal with the correct data", () => {
  // Create a dummy function for openModal
  const openModalMock = jest.fn();

  render(<DataTable data={tableRows} openModal={openModalMock} />);

  // Click on the first row
  fireEvent.click(screen.getByText("John Doe"));

  // Check that openModal was called with the correct data
  expect(openModalMock).toHaveBeenCalledWith(tableRows[0]);
});
