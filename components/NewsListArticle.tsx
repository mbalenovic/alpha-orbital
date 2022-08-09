import Image from "next/image";
import styled from "@emotion/styled";
import INewsArticle from "../typescript/INewsArticle";

const Container = styled.div`
  display: flex;
  padding: 20px;
  margin-top: 10px;
`;

const ImageContainer = styled.a`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Info = styled.div`
  margin-left: 30px;
  flex-basis: 70%;
`;

const Flex = styled.div`
  display: flex;
`;

const Button = styled.button`
  padding: 10px 20px;
  visibility: hidden;
  cursor: pointer;
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

interface IProps {
  newsArticle: INewsArticle;
  deleteNewsArticle: (newsArticle: INewsArticle) => void;
}

const NewsListArticle = ({ deleteNewsArticle, newsArticle }: IProps) => {
  const { slug, post_image, title, date, excerpt } = newsArticle;
  const newsArticleURL = `https://www.alpha-orbital.com/news/${slug}`;

  return (
    <Container>
      <ImageContainer href={newsArticleURL}>
        <Image
          width={200}
          height={200}
          src={`https://www.alpha-orbital.com/assets/images/post_img/${post_image}`}
          alt={title}
        />
      </ImageContainer>

      <Info>
        <Flex>
          <a href={newsArticleURL}>
            <Title>{title}</Title>
          </a>
          <ButtonContainer>
            <Button onClick={() => deleteNewsArticle(newsArticle)}>
              Delete
            </Button>
          </ButtonContainer>{" "}
        </Flex>
        <p>{date}</p>
        <div dangerouslySetInnerHTML={{ __html: excerpt }} />
        <a href={newsArticleURL}>Full article</a>
      </Info>
    </Container>
  );
};

export default NewsListArticle;
