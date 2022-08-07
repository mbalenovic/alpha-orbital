import ICategoryType from "./ICategoryType";
import INews from "./INews";

type ICategorizedNews = {
  [key in ICategoryType]: INews;
};

export default ICategorizedNews;
