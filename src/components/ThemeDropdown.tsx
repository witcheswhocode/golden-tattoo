import React, { useState } from "react";
import { Dropdown } from "./Dropdown";

interface ThemeDropdownProps {
  theme: string,
  handleThemeChange: void,
}

// Define the dropdown item type
type DropdownItem = {
    value: string;
    label: string;
  };

function ThemeDropdown(props: ThemeDropdownProps) {
  const dropdownItems: DropdownItem[] = [
    { value: "folklore", label: "folklore" },
    { value: "reputation", label: "reputation" },
    { value: "midnights", label: "midnights" },
  ];

  const handleThemeChange = (selectedValue: string) => {
    // Handle the selection in the parent component
    console.log(`Selected: ${selectedValue}`);
    // Add your logic or state updates here
  };
  return (
    <div className="p-8">
      <Dropdown items={dropdownItems} theme={props.theme} handleThemeChange={handleThemeChange} />
    </div>
  );
}

export default ThemeDropdown;
