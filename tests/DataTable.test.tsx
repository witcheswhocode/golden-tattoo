import React from "react";
import '@testing-library/jest-dom';
import { render, screen, fireEvent } from "@testing-library/react";
import DataTable from "../src/components/DataTable";

/* 
  openModal: (value: TableRow) => void; */
type TableRow = {
  wordid: number;
  word: string;
  otherwords: string;
  categories: string;
  categorieshtml: string;
  songcount: number;
  wordcount: number;
  totalcount: number;
  active: number;
}
const sampleData: TableRow[] = [
  {
    wordid: 1,
    word: "John Doe",
    otherwords: "john@example.com",
    categories: "",
    categorieshtml: "",
    songcount: 1,
    wordcount: 1,
    totalcount: 1,
    active: 1,
  },
  {
    wordid: 2,
    word: "John Doe",
    otherwords: "john@example.com",
    categories: "",
    categorieshtml: "",
    songcount: 1,
    wordcount: 1,
    totalcount: 1,
    active: 1,
  },
];
test("renders DataTable component with sample data", () => {
  const openModalMock = jest.fn();

  render(<DataTable data={sampleData} openModal={openModalMock} />);

  expect(screen.getByText("John Doe")).toBeTruthy();
  expect(screen.getByText("30")).toBeTruthy();
});

test("renders DataTable component with sample data", () => {
  // Create a dummy function for openModal
  const openModalMock = jest.fn();

  render(<DataTable data={sampleData} openModal={openModalMock} />);

  // Your test assertions here
});

test("clicking on a row calls openModal with the correct data", () => {
  // Create a dummy function for openModal
  const openModalMock = jest.fn();

  render(<DataTable data={sampleData} openModal={openModalMock} />);

  // Click on the first row
  fireEvent.click(screen.getByText("John Doe"));

  // Check that openModal was called with the correct data
  expect(openModalMock).toHaveBeenCalledWith(sampleData[0]);
});
