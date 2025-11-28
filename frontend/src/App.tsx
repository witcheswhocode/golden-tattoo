import React, { useState, useEffect } from "react";
import { Outlet, useRouterState } from "@tanstack/react-router";
import ReactGA from "react-ga4";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import Dropdown from "./components/Dropdown";
import { ThemeProvider, useTheme } from "./components/ThemeContext";
import { ThemeLoader } from "./components/ThemeContext/components/ThemeLoader";
import ShimmeringStars from "./components/ShimmeringStars";
import Typewriter from "./components/Typewriter";
import initializeAnalytics from "./analytics";

const usePageTracking = () => {
  const location = useRouterState({
    select: (state) => state.location,
  });

  useEffect(() => {
    ReactGA.send({
      hitType: "pageview",
      page: location.pathname + location.searchStr,
    });
  }, [location]);
};

function App() {
  useEffect(() => {
    initializeAnalytics();
    // Track the initial page load
    ReactGA.send({
      hitType: "pageview",
      page: window.location.pathname + window.location.search,
    });
  }, []);

  return (
    <ThemeProvider>
      <ThemeLoader />
      <ThemeWrapper />
    </ThemeProvider>
  );
}

function ThemeWrapper() {
  const { theme } = useTheme();
  const [dropDownClicked, setDropDownClicked] = useState<boolean>(false);

  usePageTracking();

  const ThemeToggle = () => {
    const { theme, toggleTheme } = useTheme();

    const items = ["midnights", "ttpd", "reputation", "lover"];

    const dropdownItems = items.map((item) => ({
      value: item,
    }));

    function handleThemeChange(theme: any) {
      toggleTheme(theme);
      setDropDownClicked(true);
    }

    return (
      <div className="mx-4 ml-8 my-2 w-full md:w-2/3 lg:w-1/2 flex justify-start items-start">
        <Dropdown
          items={dropdownItems}
          theme={theme}
          handleThemeChange={handleThemeChange}
        />{" "}
        {!dropDownClicked ? (
          <Typewriter
            size={"sm"}
            duration={1000}
            text={"< Pick a theme here..."}
          />
        ) : (
          <></>
        )}
      </div>
    );
  };

  return (
    <div
      className={`${
        ["lover"].includes(theme)
          ? `bg-gradient-to-r from-lover-pink to-lover-blue`
          : `bg-${theme}-background`
      }  flex flex-col justify-center items-center min-h-screen`}
    >
      <Header />
      <Navbar />
      <ThemeToggle />
      <Outlet />
      <Footer />
      <ShimmeringStars />
    </div>
  );
}

export default App;
