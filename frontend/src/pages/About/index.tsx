import React from "react";
import People from "./People";
import { useTheme } from "src/components/ThemeContext";

const About: React.FC = () => {
  const { theme } = useTheme();
  const headerStyle = `text-xl font-bold text-left ml-2`;
  const pageText = `text-sm p-2 mb-2 space-y-2 leading-5 flex flex-col justify-start items-start`;
  return (
    <div
      className={`bg-${theme}-panel text-${theme}-panelText rounded-md p-4 m-4 space-y-2`}
    >
      <h2 className={headerStyle}>The lyrical data</h2>
      <div className={pageText}>
        <p>
          Should your heart yearn for even more revelations, you shall seek out
          these illustrious minds, for they hold the keys to a deeper
          understanding of the lore:
        </p>
        <People />
        <p>
          This data will always be a work in progress. There is still a back log
          of analysis, references, and categories to include. If you have
          anything to suggest,{" "}
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://forms.gle/ycZYm5YwaNam5yrp7"
            className={`underline text-${
              theme === "midnights" ? "ttpd" : theme
            }-link hover:text-${theme}-linkHover visited:text-${theme}-linkVisited focus:ring`}
          >
            please give your feedback
          </a>
          .
        </p>
      </div>
      <h2 className={headerStyle}>About the lyrics</h2>
      <div className={pageText}>
        <p>
          From the heart and soul of Taylor Swift, enchanting melodies graced
          our ears, offering a poetic escape from the trials of reality. But it
          was in the whispers of the SwiftTok community that a collective desire
          arose—a longing to delve deeper into the profound tapestry of Taylor's
          words, to uncover hidden meanings, symbolism, and connections, and to
          bask in the radiance of shared interpretations.
        </p>
        <p>
          And so, a vision was born—a haven where lyrical analysis and parallels
          could convene, where the essence of Taylor's artistry could be
          celebrated and savored. This vision would weave its own magical spell,
          inviting fans to embark on a journey through the labyrinth of emotions
          and revelations entwined within Taylor's melodies.
        </p>
        <p>
          But it is not solely the vision of one, for this project embodies the
          spirit of collaboration and unity. Various creators with illuminating
          souls who traversed cyberspace to share their insights and
          discoveries. It is from these gifted minds that the categories,
          themes, and song parallels were assembled, forming the heart of TSwift
          Rock's grand narrative.
        </p>
      </div>
      <h2 className={headerStyle}>About the bracelet ideas</h2>
      <div className={pageText}>
        <p>
          Majority of the bracelet ideas were found on forms online from{" "}
          <a
            href="https://www.reddit.com/r/TaylorSwift/comments/12yyerj/need_friendship_bracelet_ideas_for_the_eras_tour/"
            target="_blank"
            rel="noopener noreferrer"
            className={`underline text-${
              theme === "midnights" ? "ttpd" : theme
            }-link hover:text-${theme}-linkHover visited:text-${theme}-linkVisited focus:ring`}
          >
            wrecking_ball_z
          </a>{" "}
          and{" "}
          <a
            href="https://www.reddit.com/r/TaylorSwift/comments/13zhhzh/eras_tour_friendship_bracelet_ideas/"
            target="_blank"
            rel="noopener noreferrer"
            className={`underline text-${
              theme === "midnights" ? "ttpd" : theme
            }-link hover:text-${theme}-linkHover visited:text-${theme}-linkVisited focus:ring`}
          >
            vigilanteish
          </a>
          .
        </p>
      </div>
      <h2 className={headerStyle}>Appreciation</h2>
      <div className={pageText}>
        <p>
          A huge thank you goes to{" "}
          <a
            href="https://twitter.com/write_this_way"
            target="_blank"
            rel="noopener noreferrer"
            className={`underline text-${
              theme === "midnights" ? "ttpd" : theme
            }-link hover:text-${theme}-linkHover visited:text-${theme}-linkVisited focus:ring`}
          >
            Dana Amihere
          </a>{" "}
          for helping me move my idea along when it was just a few python
          scripts. Dana gave me invaluable editing tips and believed in me the
          whole way. Get in touch with Dana for her media and data expertise at{" "}
          <a
            href="https://codeblackmedia.io/"
            target="_blank"
            rel="noopener noreferrer"
            className={`underline text-${
              theme === "midnights" ? "ttpd" : theme
            }-link hover:text-${theme}-linkHover visited:text-${theme}-linkVisited focus:ring`}
          >
            codeblackmedia.io
          </a>
          .
        </p>
        <p>
          Thank you to{" "}
          <a
            href="https://twitter.com/JJ_TSversion"
            target="_blank"
            rel="noopener noreferrer"
            className={`underline text-${
              theme === "midnights" ? "ttpd" : theme
            }-link hover:text-${theme}-linkHover visited:text-${theme}-linkVisited focus:ring`}
          >
            JingJing
          </a>
          , for helping me set up the SQLite database to improve the performance
          of this website. I'm so glad I met a fellow Swiftie who codes and on
          the dance floor of a Taylor Swift night none-the-less!
        </p>
      </div>
    </div>
  );
};

export default About;
