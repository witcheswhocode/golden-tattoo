import React from "react";
import '@testing-library/jest-dom';
import { render, screen, fireEvent } from "@testing-library/react";
import { act } from "react-dom/test-utils"; // Import act for testing state updates
import Modal from "../src/components/Modal";
type ModalData = {
    lyricid: number;
    lyric: string;
    subtext: string;
    lyrichtml: string;
    categories: string;
    album: string;
    albumshort: string;
    alb: string;
    song: string;
  }
test("renders Modal component with sample data", () => {
  const sampleData: ModalData[] = [{
    lyricid: 1,
    lyric: "John Doe",
    subtext: "25",
    lyrichtml: "john@example.com",
    categories: "john@example.com",
    album: "john@example.com",
    albumshort: "john@example.com",
    alb: "john@example.com",
    song: "john@example.com",
  }];
  render(<Modal data={sampleData} onClose={() => {}} />);
  // Ensure that the modal is rendered with the correct data
  expect(screen.getByText("John Doe")).toBeTruthy();
  expect(screen.getByText("john@example.com - john@example.com")).toBeTruthy();
});

test("closes modal when clicking on close button", () => {
  const onCloseMock = jest.fn();
  const sampleData: ModalData[] = [{
    lyricid: 1,
    lyric: "John Doe",
    subtext: "25",
    lyrichtml: "john@example.com",
    categories: "john@example.com",
    album: "john@example.com",
    albumshort: "john@example.com",
    alb: "john@example.com",
    song: "john@example.com",
  }];
  render(<Modal data={sampleData} onClose={onCloseMock} />);
  // Click on the close button to close the modal
  act(() => {
    fireEvent.click(screen.getByTestId("modal-close"));
  });
  // Ensure that the onClose function is called
  expect(onCloseMock).toHaveBeenCalled();
});

// Add more tests as needed
