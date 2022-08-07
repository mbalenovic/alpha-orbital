interface INew {
  title: string;
  slug: string;
  date: string;
  excerpt: string;
  post_image: string;
  post_thumbnail: string;
  post_category_id: string;
}

type INews = Array<INew>;

const getNews = async () => {
  const data = await (
    await fetch("https://www.alpha-orbital.com/last-100-news.json")
  ).json();

  return data as INews;
};

export default getNews;
