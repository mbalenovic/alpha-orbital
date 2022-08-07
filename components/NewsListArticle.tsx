import Image from "next/image";
import styled from "@emotion/styled";
import INewsArticle from "../typescript/INewsArticle";

const Container = styled.div`
  display: flex;
  padding: 20px;
  border: 1px solid white;
`;

const Flex = styled.div`
  display: flex;
`;

const Button = styled.button`
  padding: 10px 20px;
  visibility: hidden;
`;

const ButtonContainer = styled.div`
  margin-left: auto;
  &:hover ${Button} {
    visibility: visible;
  }
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
    <Container>
      <a href={newsArticleURL}>
        <Image
          width="200px"
          height="200px"
          src={`https://www.alpha-orbital.com/assets/images/post_img/${post_image}`}
          alt={post_image}
        />
      </a>
      <div>
        <Flex>
          <a href={newsArticleURL}>
            <Title>{title}</Title>
          </a>
          <ButtonContainer>
            <Button onClick={() => console.log("delete")}>Delete</Button>
          </ButtonContainer>{" "}
        </Flex>
        <p>{date}</p>
        <p>{excerpt}</p>
        <a href={newsArticleURL}>Full article</a>
      </div>
    </Container>
  );
};

export default NewsListArticle;
