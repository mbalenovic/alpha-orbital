import { useRef } from "react";
import { useVirtualizer } from "@tanstack/react-virtual";
import INews from "../typescript/INews";
import INewsArticle from "../typescript/INewsArticle";
import NewsListArticle from "./NewsListArticle";
interface IProps {
  news: INews;
  deleteNewsArticle: (newsArticle: INewsArticle) => void;
}

const NewsList = ({ news, deleteNewsArticle }: IProps) => {
  const parentRef = useRef(null);

  const rowVirtualizer = useVirtualizer({
    count: news.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 300,
    overscan: 5,
  });

  return (
    <div
      ref={parentRef}
      style={{
        overflow: "auto",
      }}
    >
      <div
        style={{
          height: `${rowVirtualizer.getTotalSize()}px`,
          width: "100%",
          position: "relative",
        }}
      >
        {rowVirtualizer.getVirtualItems().map((virtualRow) => (
          <div
            key={virtualRow.index}
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: `${virtualRow.size}px`,
              transform: `translateY(${virtualRow.start}px)`,
            }}
          >
            <NewsListArticle
              newsArticle={news[virtualRow.index]}
              key={virtualRow.index}
              deleteNewsArticle={deleteNewsArticle}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default NewsList;
