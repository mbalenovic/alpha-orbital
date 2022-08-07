import Fuse from "fuse.js";
import INews from "../typescript/INews";

const searchCategoryNews = (search: string, categoryNews: INews) => {
  if (search.length < 3) {
    return categoryNews;
  }

  const fuse =
    categoryNews &&
    new Fuse(categoryNews, {
      includeScore: true,
      keys: ["title", "excerpt"],
    });

  return fuse?.search(search).map((searchResult) => searchResult.item);
};

export default searchCategoryNews;
