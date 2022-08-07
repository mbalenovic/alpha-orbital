import INews from "../typescript/INews";

const getNews = async () => {
  const data = await (
    await fetch("https://www.alpha-orbital.com/last-100-news.json")
  ).json();

  return data as INews;
};

export default getNews;
