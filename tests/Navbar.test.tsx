import React from "react";
import {
  render,
  screen
} from "@testing-library/react";
import Navbar from "../src/components/Navbar";


describe("Navbar Component", () => {
  it("renders Navbar component with links", () => {
    render(<Navbar />);

    // Check if the Navbar component is rendered
    const navbarElement = screen.getByRole("navigation") as HTMLElement;
    expect(navbarElement).toBeDefined();

    // Check if the links are rendered
    const braceletsLink = screen.getByRole("link", {
      name: /bracelets/i,
    }) as HTMLElement;
    const lyricsLink = screen.getByRole("link", {
      name: /lyrics/i,
    }) as HTMLElement;
    const writersLink = screen.getByRole("link", {
      name: /writers/i,
    }) as HTMLElement;

    expect(braceletsLink).toBeDefined();
    expect(lyricsLink).toBeDefined();
    expect(writersLink).toBeDefined();
  });
});
