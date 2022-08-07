import ICategorizedNews from "../typescript/ICategorizedNews";
import INews from "../typescript/INews";
import INewsArticle from "../typescript/INewsArticle";

const getCategorizedNews = (news: INews) =>
  (news.reduce((acc: any, newsPost: INewsArticle) => {
    if (!newsPost.post_category_id) {
      return acc.unknown.push(newsPost);
    }

    if (acc[newsPost.post_category_id]) {
      acc[newsPost.post_category_id].push(newsPost);
    } else {
      acc[newsPost.post_category_id] = [];
      acc[newsPost.post_category_id].push(newsPost);
    }

    return acc;
  }, {}) as ICategorizedNews) || {};

export default getCategorizedNews;
