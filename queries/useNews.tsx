import { useQuery } from "@tanstack/react-query";
import fetcher from "../fetchers/getNews";
import INews from "../typescript/INews";

interface IOptions {
  initialData?: INews;
}

const useNews = (options: IOptions) =>
  useQuery(["last-100-news"], fetcher, options);

export default useNews;
