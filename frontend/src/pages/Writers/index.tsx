import { useQuery } from "@tanstack/react-query";
import Jukebox from "./components/Jukebox";
import { apiUrl } from "src/helpers";
import { WritersProps } from "./components/Jukebox";
import { useTheme } from "src/components/ThemeContext";

const fetchWriters = async (): Promise<WritersProps[]> => {
  const response = await fetch(`${apiUrl}getWriters`);

  if (!response.ok) {
    throw new Error("Failed to load writers");
  }
  const data = await response.json();
  return data.data;
};

function Writers() {
  const { theme } = useTheme();
  const {
    data: writerData,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["writers"],
    queryFn: fetchWriters,
    staleTime: 1000 * 60 * 15,
  });

  if (isLoading) {
    return <div>Loading writers...</div>;
  }

  return (
    <div className="w-full md:w-2/3 lg:w-1/2 z-10">
      {/*<MetaTags
        title="writers - golden tattoo"
        description="See the writer credits on each Taylor Swift learn more about her history writing her own music."
        image="/assets/lover-meta-img.png"
      />*/}
      <div className="px-2 m-auto">
        <p
          className={`text-sm text-start p-2 my-2 ${
            theme === "ttpd"
              ? `bg-ttpd-background z-10 border-t-2 border-b-2 border-${theme}-tableBorder`
              : ""
          } text-${theme}-text`}
        >
          Explore the complete list of Taylor's discography and the songwriters
          who contributed to her music. Click on the writers name to see their
          picture.
        </p>
      </div>
      {writerData && <Jukebox data={writerData} />}
    </div>
  );
}

export default Writers;
