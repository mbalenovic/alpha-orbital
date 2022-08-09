import INews from "../typescript/INews";
import INewsArticle from "../typescript/INewsArticle";
import NewsListArticle from "./NewsListArticle";

interface IProps {
  news: INews;
  deleteNewsArticle: (newsArticle: INewsArticle) => void;
}

const NewsList = ({ news, deleteNewsArticle }: IProps) => {
  return (
    <div>
      <p>{news?.length} articles</p>
      {news?.map((newsArticle) => (
        <NewsListArticle
          newsArticle={newsArticle}
          key={newsArticle.slug}
          deleteNewsArticle={deleteNewsArticle}
        />
      ))}
    </div>
  );
};

export default NewsList;
