import Head from "next/head";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import styled from "@emotion/styled";
import NewsFilter from "../components/NewsFilter";
import Container from "../components/Container";
import NewsList from "../components/NewsList";
import Search from "../components/Search";
import useNews from "../queries/useNews";
import getNews from "../fetchers/getNews";
import searchCategoryNews from "../helpers/searchWithFuse";
import getCategorizedNews from "../helpers/getCategorizedNews";
import INews from "../typescript/INews";
import ICategoryType from "../typescript/ICategoryType";
import INewsArticle from "../typescript/INewsArticle";
import DeleteCategory from "../components/DeleteCategory";

const Flex = styled.div`
  display: flex;
`;

export const getServerSideProps = async (context) => {
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
  const router = useRouter();
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

  const deleteNewsArticle = (newsArticle: INewsArticle) => {
    const removedArticleNews = news.filter(
      ({ title }) => newsArticle.title !== title
    );
    setNews(removedArticleNews);
  };

  const deleteCategoryNews = (category: ICategoryType) => {
    if (activeFilter === category) {
      setActiveFilter("0");
    }

    const removedCategoryNews = news.filter(
      ({ post_category_id }) => post_category_id !== category
    );
    setNews(removedCategoryNews);
  };

  const searchedCategoryNews = searchCategoryNews(search, categoryNews);

  useEffect(() => {
    router.replace({
      query: { category: activeFilter, search },
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeFilter, search]);

  return (
    <div>
      <Head>
        <title>Alpha Orbital</title>
        <meta name="description" content="read the latest news" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Container>
          <Flex>
            <NewsFilter
              filters={categories}
              activeFilter={activeFilter}
              setActiveFilter={setActiveFilter}
            />
          </Flex>
          <DeleteCategory
            categories={categories}
            deleteCategoryNews={deleteCategoryNews}
          />
          <Search search={search} setSearch={setSearch} />
          <NewsList
            news={searchedCategoryNews}
            deleteNewsArticle={deleteNewsArticle}
            showRefetch={activeFilter === "0" && news.length < 100}
            setEnabled={setEnabled}
          />
        </Container>
      </main>
    </div>
  );
};

export default Home;
