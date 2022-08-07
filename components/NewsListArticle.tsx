import Image from "next/image";
import styled from "@emotion/styled";
import INewsArticle from "../typescript/INewsArticle";

const Flex = styled.div`
  display: flex;
  border: 1px solid white;
`;

const Title = styled.h3`
  display: inline-block;
`;

const NewsListArticle = ({
  slug,
  post_image,
  title,
  date,
  excerpt,
}: INewsArticle) => {
  const newsArticleURL = `https://www.alpha-orbital.com/news/${slug}`;

  return (
    <Flex>
      <a href={newsArticleURL}>
        <Image
          width="200px"
          height="200px"
          src={`https://www.alpha-orbital.com/assets/images/post_img/${post_image}`}
          alt={post_image}
        />
      </a>
      <div>
        <a href={newsArticleURL}>
          <Title>{title}</Title>
        </a>
        <p>{date}</p>
        <p>{excerpt}</p>
        <a href={newsArticleURL}>Full article</a>
      </div>
    </Flex>
  );
};

export default NewsListArticle;
