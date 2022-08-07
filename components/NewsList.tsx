import styled from "@emotion/styled";
import Image from "next/image";
import Link from "next/link";
import INews from "../typescript/INews";
import NewsListArticle from "./NewsListArticle";

interface IProps {
  news?: INews;
}

const NewsList = ({ news = [] }: IProps) => {
  return (
    <div>
      <p>{news.length} articles</p>
      {news.map((newsArticle) => (
        <NewsListArticle {...newsArticle} key={newsArticle.slug} />
      ))}
    </div>
  );
};

export default NewsList;
