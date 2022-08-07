import styled from "@emotion/styled";
import { Dispatch, SetStateAction } from "react";
import INews from "../typescript/INews";
import INewsArticle from "../typescript/INewsArticle";
import NewsListArticle from "./NewsListArticle";

const Button = styled.button<{ showRefetch: boolean }>`
  padding: 10px 20px;
  display: ${(props) => (props.showRefetch ? "block" : "none")};
`;
interface IProps {
  news: INews;
  deleteNewsArticle: (newsArticle: INewsArticle) => void;
  showRefetch: boolean;
  setEnabled: Dispatch<SetStateAction<boolean>>;
}

const NewsList = ({
  news,
  deleteNewsArticle,
  showRefetch,
  setEnabled,
}: IProps) => {
  return (
    <div>
      <Button onClick={() => setEnabled(true)} showRefetch={showRefetch}>
        Refetch
      </Button>
      <p>{news.length} articles</p>
      {news.map((newsArticle) => (
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
