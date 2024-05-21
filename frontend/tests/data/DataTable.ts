export type TableRow = {
  wordid: number;
  word: string;
  otherwords: string;
  categories: string;
  categorieshtml: string;
  songcount: number;
  wordcount: number;
  totalcount: number;
  active: number;
};
export const tableRows: TableRow[] = [
  {
    wordid: 1,
    word: "John Doe",
    otherwords: "john@example.com",
    categories: "",
    categorieshtml: "",
    songcount: 1,
    wordcount: 1,
    totalcount: 1,
    active: 1,
  },
  {
    wordid: 2,
    word: "John Dawe",
    otherwords: "john@example.com",
    categories: "",
    categorieshtml: "",
    songcount: 2,
    wordcount: 1,
    totalcount: 1,
    active: 1,
  },
];
