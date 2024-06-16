import React from "react";
import { useTheme } from "src/components/ThemeContext";

const peopleData = [
  {
    name: "grouponmom",
    href: "https://www.tiktok.com/@grouponmom",
    description: " (and ",
    extraLink: {
      name: "The Archer podcast",
      href: "https://twitter.com/TheArchersPod",
      description: " with ",
      extraName: "Katie Golden",
      closeDesc: ")",
      extraHref: "https://twitter.com/katieggolden",
    },
  },
  {
    name: "diickvandyke",
    href: "https://www.tiktok.com/@unhingedlor",
    description: " (unhingedlor)",
  },
  { name: "lyricsandlore", href: "https://www.tiktok.com/@lyricsandlore" },
  { name: "invisibletheme", href: "https://www.tiktok.com/@invisibletheme" },
  { name: "river_witch7", href: "https://www.tiktok.com/@river_witch7" },
  { name: "frayasmom", href: "https://www.tiktok.com/@frayasmom" },
  { name: "sapphicka", href: "https://www.tiktok.com/@sapphicka" },
  { name: "humaninmotion", href: "https://www.tiktok.com/@humaninmotion" },
  { name: "seniorswifties", href: "https://www.tiktok.com/@seniorswifties" },
  {
    name: "jessbyathousandcuts",
    href: "https://www.tiktok.com/@jessbyathousandcuts",
  },
  { name: "degraceful", href: "https://www.tiktok.com/@degraceful" },
  { name: "speleho", href: "https://www.tiktok.com/@speleho" },
  { name: "notwellbish", href: "https://www.tiktok.com/@notwellbish" },
  { name: "chacofemme", href: "https://www.tiktok.com/@chacofemme" },
  {
    name: "emotionalhaircut",
    href: "https://www.tiktok.com/@emotionalhaircut",
  },
  {
    name: "kelseylikesthings",
    href: "https://www.tiktok.com/@kelseylikesthings",
  },
  { name: "janelyshutup", href: "https://www.tiktok.com/@janelyshutup" },
  { name: "almondmilkzo", href: "https://www.tiktok.com/@almondmilkzo" },
  { name: "rujimite", href: "https://www.tiktok.com/@rujimite" },
  { name: "mayte.lisbeth", href: "https://www.tiktok.com/@mayte.lisbeth" },
  {
    name: "mrperfectlyfine13",
    href: "https://www.tiktok.com/@mrperfectlyfine13",
  },
];

const People: React.FC = () => {
  const { theme } = useTheme();
  return (
    <div className="space-y-4">
      <p className="space-x-1 text-sm flex-inline flex-wrap justify-center items-center">
        {peopleData.map((person, index) => (
          <span key={index} className="mr-2">
            <a
              target="_blank"
              rel="noopener noreferrer"
              href={person.href}
              className={`underline text-${theme === 'midnights' ? 'ttpd' : theme }-link hover:text-${theme}-linkHover visited:text-${theme}-linkVisited focus:ring`}
            >
              {person.name}
            </a>
            {person.description}
            {person.extraLink && (
              <>
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href={person.extraLink.href}
                  className={`underline text-${theme === 'midnights' ? 'ttpd' : theme }-link hover:text-${theme}-linkHover visited:text-${theme}-linkVisited focus:ring`}
                >
                  {person.extraLink.name}
                </a>
                {person.extraLink.description}
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href={person.extraLink.extraHref}
                  className={`underline text-${theme === 'midnights' ? 'ttpd' : theme }-link hover:text-${theme}-linkHover visited:text-${theme}-linkVisited focus:ring`}
                >
                  {person.extraLink.extraName}
                </a>
                {person.extraLink.closeDesc}
              </>
            )}
            {index < peopleData.length - 1 && ", "}
          </span>
        ))}
      </p>
    </div>
  );
};

export default People;
