import React from "react";
import { ModalData } from "../DataTable"; // Update the import path accordingly
import HtmlReactParser from "html-react-parser";

interface ModalProps {
  data: ModalData[];
  word: string | null;
  onClose: () => void;
}
const Modal: React.FC<ModalProps> = ({ data, word, onClose }) => {
  const addCategoryNote =
    data[0].categories &&
    (data[0].categories.includes("parallels") ||
      data[0].categories.includes("queer"));
      console.log(data)
  const createDiv = (albumshort: string, alb: string, song: string) => (
    <div key={`${albumshort}-${song}`}>
      <div
        className={`flex flex-col justify-center items-center opacity-90 bg-album-${alb} rounded-full shadow-2xl p-2 m-4`}
      >
        <div className="text-center text-lg text-white lyric-header-text">{`${song
          .replace("Taylor's Version", "TV")
          .replace("From the Vault", "FtV")}`}</div>
        <div className="text-center text-md text-white lyric-header-text">{`${albumshort}`}</div>
      </div>
      {data
        .filter((item) => item.albumshort === albumshort && item.song === song)
        .map((filteredItem) => (
          <div
            className="text-center mb-8"
            key={`${filteredItem.lyric}-${filteredItem.lyricid}`}
          > 
            <p className="text-xs py-1 font-light">{filteredItem.lyricbefore && HtmlReactParser(filteredItem.lyricbefore)}</p>
            <p className="text-sm py-2">{HtmlReactParser(filteredItem.lyric)}</p>
            <p className="text-xs py-1 font-light">{filteredItem.lyricafter && HtmlReactParser(filteredItem.lyricafter)}</p>
          </div>
        ))}
    </div>
  );

  // Get unique album and song combinations
  const uniqueAlbumsAndSongs = [
    ...new Set(
      data.map((item) => `${item.albumshort}-${item.alb}-${item.song}`)
    ),
  ];

  // Render div elements for each unique album and song combination
  const result = uniqueAlbumsAndSongs.map((combination) => {
    const [albumshort, alb, song] = combination.split("-");
    return createDiv(albumshort, alb, song);
  });

  return (
    <div className="flex items-center justify-center fixed inset-0">
      <div
        className="bg-black opacity-50 fixed inset-0"
        onClick={onClose}
      ></div>
      <div className="bg-white md:w-2/3 lg:w-1/2 h-full overflow-scroll md:h-5/6 p-4 rounded shadow-lg z-10">
        <div className="flex justify-between w-full border-b">
          <div className="ml-8 pb-2 text-3xl">{word}</div>
          <>
            <span
              data-testid="modal-close"
              className="cursor-pointer"
              onClick={onClose}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-gray-600 hover:text-gray-800"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </span>
          </>
        </div>
        <div className="mb-10 p-4">{result}</div>
        {addCategoryNote && (
          <div>
            <p>Check out these awesome people for more indepth analysis.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Modal;
