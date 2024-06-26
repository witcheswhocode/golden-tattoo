import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import { act } from "react-dom/test-utils"; // Import act for testing state updates
import Modal from "../src/pages/Lyrics/components/Modal";
import DataTable from "../src/pages/Lyrics/components/DataTable";
import { tableRows } from "./data/DataTable";
import { modalData } from "./data/Modal";

describe("Modal component", () => {
  test("renders Modal component with song and album title", () => {
    render(<Modal data={modalData} onClose={() => {}} />);

    // Ensure that the modal is rendered with the correct data
    expect(screen.getByText("Midnights - Midnight Rain")).toBeTruthy();
    expect(screen.getByText("evermore - happiness")).toBeTruthy();
    expect(screen.getByText("evermore - right where you left me")).toBeTruthy();
  });

  test("renders Modal component with html lyrics", () => {
    render(
      <div className="container mx-auto p-4">
        <DataTable data={tableRows} openModal={() => {}} />
        <Modal data={modalData} onClose={() => {}} />
      </div>
    );

    const regex = /(Some kind of |haunted|, some kind of haunted)/i;
    const boldedElements = screen.getAllByText(regex);

    // Assert that the lyric is in the document
    boldedElements.forEach((element) => {
      expect(element).toBeInTheDocument();
    });
  });

  test("closes modal when clicking on close button", () => {
    const onCloseMock = jest.fn();
    render(<Modal data={modalData} onClose={onCloseMock} />);
    // Click on the close button to close the modal
    act(() => {
      fireEvent.click(screen.getByTestId("modal-close"));
    });
    // Ensure that the onClose function is called
    expect(onCloseMock).toHaveBeenCalled();
  });
});
