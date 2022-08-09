import Head from "next/head";
import { useState } from "react";
import styled from "@emotion/styled";
import NewsFilter from "../components/NewsFilter";
import Container from "../components/Container";
import NewsList from "../components/NewsList";
import Search from "../components/Search";
import useNews from "../queries/useNews";
import getNews from "../fetchers/getNews";
import searchCategoryNews from "../helpers/searchCategoryNews";
import getCategorizedNews from "../helpers/getCategorizedNews";
import INews from "../typescript/INews";
import ICategoryType from "../typescript/ICategoryType";
import INewsArticle from "../typescript/INewsArticle";
import DeleteCategory from "../components/DeleteCategory";

const Flex = styled.div`
  display: flex;
  align-items: center;
  margin-top: 20px;
`;

const Button = styled.button<{ showRefetch?: boolean }>`
  margin-left: 20px;
  padding: 10px 20px;
  cursor: pointer;
`;

const Layout = styled.div`
  height: 100vh;
  padding-bottom: 30px;
  display: flex;
  flex-direction: column;
`;

export const getServerSideProps = async (context: any) => {
  const initialData = await getNews();

  const categorizedNews = getCategorizedNews(initialData);
  const categories = Object.keys(categorizedNews) as ICategoryType[];

  const initialCategory = categories.includes(context.query.category)
    ? context.query.category
    : "0";

  const initialSearch = context.query.search || "";

  return {
    props: {
      initialData,
      initialSearch,
      initialCategory,
    },
  };
};

interface IProps {
  initialData: INews;
  initialSearch: string;
  initialCategory: ICategoryType;
}

const Home = ({ initialData, initialCategory, initialSearch }: IProps) => {
  const [news, setNews] = useState<INews>(initialData);
  const [enabled, setEnabled] = useState(false);

  const onSuccess = (data: INews) => {
    setNews(data);
    setEnabled(false);
  };

  useNews({ initialData, enabled, onSuccess });

  const [activeFilter, setActiveFilter] =
    useState<ICategoryType>(initialCategory);

  const [search, setSearch] = useState(initialSearch);
  const categorizedNews = getCategorizedNews(news);
  const categories = Object.keys(categorizedNews) as ICategoryType[];
  const categoryNews =
    activeFilter === "0" ? news : categorizedNews[activeFilter];
  const showRefetch = activeFilter === "0" && news.length < 100;

  const deleteNewsArticle = (newsArticle: INewsArticle) => {
    if (window.confirm("Are you sure?")) {
      // check if last element of array
      if (
        categorizedNews[newsArticle.post_category_id as ICategoryType]
          .length === 1
      ) {
        setActiveFilter("0");
      }

      const removedArticleNews = news.filter(
        ({ title }) => newsArticle.title !== title
      );
      setNews(removedArticleNews);
    }
  };

  const deleteCategoryNews = (category: ICategoryType) => {
    if (window.confirm("Are you sure?")) {
      if (activeFilter === category) {
        setActiveFilter("0");
      }

      // check if last element of array
      const removedCategoryNews = news.filter(
        ({ post_category_id }) => post_category_id !== category
      );
      setNews(removedCategoryNews);
    }
  };

  const searchedCategoryNews = searchCategoryNews(search, categoryNews);

  return (
    <div>
      <Head>
        <title>Alpha Orbital</title>
        <meta name="description" content="read the latest news" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Container>
          <Layout>
            <div>
              <NewsFilter
                filters={categories}
                activeFilter={activeFilter}
                setActiveFilter={setActiveFilter}
              />
              <DeleteCategory
                categories={categories}
                deleteCategoryNews={deleteCategoryNews}
              />
              <Flex>
                <Search search={search} setSearch={setSearch} />
                {showRefetch && (
                  <Button onClick={() => setEnabled(true)}>Refetch</Button>
                )}
              </Flex>
            </div>
            <p>{searchedCategoryNews.length} articles</p>
            <NewsList
              news={searchedCategoryNews}
              deleteNewsArticle={deleteNewsArticle}
            />
          </Layout>
        </Container>
      </main>
    </div>
  );
};

export default Home;
