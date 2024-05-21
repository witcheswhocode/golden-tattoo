import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import Jukebox from "../frontend/src/pages/Writers/components/Jukebox";
import { writersData } from "./data/Jukebox";

describe("Jukebox component", () => {
  test("renders Jukebox component with song and album title", () => {
    render(<Jukebox data={writersData} />);

    // Ensure that the modal is rendered with the correct data
    const elementTS = screen.getAllByText("Taylor Swift");
    expect(elementTS.length).toBe(4);

    const elementLR = screen.getAllByText("Liz Rose");
    expect(elementLR.length).toBe(1);

    const elementHL = screen.getAllByText("Hillary Lindsey");
    expect(elementHL.length).toBe(1);

    const elementJA = screen.getAllByText("Jack Antonoff");
    expect(elementJA.length).toBe(3);

    const elementSD = screen.getAllByText("Sam Dew");
    expect(elementSD.length).toBe(1);

    const elementJS = screen.getAllByText("Jahaan Sweet");
    expect(elementJS.length).toBe(1);

    const elementS = screen.getAllByText("Sounwave");
    expect(elementS.length).toBe(1);

    const elementZ = screen.getAllByText("Zoë Kravitz");
    expect(elementZ.length).toBe(1);

    const elementLH = screen.getAllByText("Lavender Haze");
    expect(elementLH.length).toBe(1);

    const elementAH = screen.getAllByText("Anti-Hero");
    expect(elementAH.length).toBe(1);

    const elementM = screen.getAllByText("Maroon");
    expect(elementM.length).toBe(1);

    const elementF = screen.getAllByText("Fearless (Taylor's Version)");
    expect(elementF.length).toBe(1);
  });
});
