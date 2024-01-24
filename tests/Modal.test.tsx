import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import { act } from "react-dom/test-utils"; // Import act for testing state updates
import Modal from "../src/components/Modal";
import DataTable from "../src/components/DataTable";
import { tableRows } from "./DataTable.test";

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
};

const modalData: ModalData[] = [
  {
    lyricid: 1,
    lyrichtml: "haunted",
    subtext: "",
    lyric: "Some kind of <b>haunted</b>, some kind of haunted",
    categories: "parallels|ghosts",
    album: "Midnights",
    albumshort: "Midnights",
    alb: "midnight",
    song: "Midnight Rain",
  },
  {
    lyricid: 2,
    lyrichtml: "haunted",
    subtext: "",
    lyric: "<b>Haunted</b> by the look in my eyes",
    categories: "parallels|ghosts",
    album: "evermore",
    albumshort: "evermore",
    alb: "evermore",
    song: "happiness",
  },
  {
    lyricid: 3,
    lyrichtml: "haunted",
    subtext: "",
    lyric: "Still sitting in a corner I <b>haunt</b>",
    categories: "parallels|ghosts",
    album: "evermore",
    albumshort: "evermore",
    alb: "evermore",
    song: "right where you left me",
  },
];

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
