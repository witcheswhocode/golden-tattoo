import "@testing-library/jest-dom";
import { render, screen, fireEvent, act } from "@testing-library/react";
import DataTable from "../src/pages/Lyrics/components/DataTable";
import { tableRows } from "./data/DataTable";

const isAlphabeticalOrder = (array: any) =>
  array.every(
    (value: any, index: any, array: any) =>
      index === 0 || value.localeCompare(array[index - 1]) >= 0
  );
describe("DataTable component", () => {
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

  test("clicking on a column header song count will sorts data", () => {
    const openModalMock = jest.fn();

    render(<DataTable data={tableRows} openModal={openModalMock} />);

    // Click on the song count column
    act(() => {
      fireEvent.click(screen.getByText("song count"));
    });

    const songCountDesc = screen.getAllByRole("row");
    /// Filter out rows without data-songcount attribute
    let filteredSongCountElements = songCountDesc.filter(
      (song) => song.dataset.songcount !== undefined
    );

    // Extract data-songcount values
    let songCountValues = filteredSongCountElements.map(
      (song) => song.dataset.songcount
    );

    // Check if the values are in descending order
    const isDescending = songCountValues.every(
      (value: any, index: any, array: any) => {
        return (
          index === 0 || parseInt(value, 10) <= parseInt(array[index - 1], 10)
        );
      }
    );

    // Fail the test if it's neither ascending nor descending
    expect(isDescending).toBe(true);

    // Click on the song count column
    act(() => {
      fireEvent.click(screen.getByText("song count"));
    });

    const songCountAsc = screen.getAllByRole("row");
    /// Filter out rows without data-songcount attribute
    filteredSongCountElements = songCountAsc.filter(
      (song) => song.dataset.songcount !== undefined
    );

    // Extract data-songcount values
    songCountValues = filteredSongCountElements.map(
      (song) => song.dataset.songcount
    );

    // Check if the values are in ascending order
    const isAscending = songCountValues.every(
      (value: any, index: any, array: any) => {
        return (
          index === 0 || parseInt(value, 10) >= parseInt(array[index - 1], 10)
        );
      }
    );

    // Fail the test if it's neither ascending nor descending
    expect(isAscending).toBe(true);
  });

  test("clicking on a column header word will sort data", () => {
    const openModalMock = jest.fn();
    render(<DataTable data={tableRows} openModal={openModalMock} />);

    // Click on the word column
    act(() => {
      fireEvent.click(screen.getByText("word"));
    });

    const songCountElements = screen.getAllByRole("row");

    // Extract data-word values
    const songCountValues = songCountElements
      .filter((song) => song.dataset.word !== undefined)
      .map((song) => song.dataset.word);

    // Check if the values are in ascending order
    expect(isAlphabeticalOrder(songCountValues.reverse())).toBe(true);

    // Click on the word column again to reverse the order
    act(() => {
      fireEvent.click(screen.getByText("word"));
    });

    // Extract data-word values after reversing the order
    const reversedSongCountValues = screen
      .getAllByRole("row")
      .filter((song) => song.dataset.word !== undefined)
      .map((song) => song.dataset.word);

    // Check if the values are in descending order
    expect(isAlphabeticalOrder(reversedSongCountValues)).toBe(true);
  });
});
