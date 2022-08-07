import Head from "next/head";
import { useEffect, useState } from "react";

import getNews from "../fetchers/getNews";
import useNews from "../queries/useNews";
import INews from "../typescript/INews";

import styles from "../styles/Home.module.css";
import NewsFilter from "../components/NewsFilter";
import getCategorizedNews from "../helpers/getCategorizedNews";
import ICategoryType from "../typescript/ICategoryType";
import Container from "../components/Container";
import NewsList from "../components/NewsList";
import Search from "../components/Search";
import searchCategoryNews from "../helpers/searchWithFuse";
import { useRouter } from "next/router";

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
  const { data = [] } = useNews({ initialData });
  const [activeFilter, setActiveFilter] =
    useState<ICategoryType>(initialCategory);

  const [search, setSearch] = useState(initialSearch);
  const categorizedNews = getCategorizedNews(data);
  const categories = Object.keys(categorizedNews) as ICategoryType[];
  const categoryNews =
    activeFilter === "0" ? data : categorizedNews[activeFilter];

  const searchedCategoryNews = searchCategoryNews(search, categoryNews);

  useEffect(() => {
    router.replace({
      query: { category: activeFilter, search },
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeFilter, search]);

  return (
    <div className={styles.container}>
      <Head>
        <title>Alpha Orbital</title>
        <meta name="description" content="read the latest news" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <Container>
          <NewsFilter
            filters={categories}
            activeFilter={activeFilter}
            setActiveFilter={setActiveFilter}
          />
          <Search search={search} setSearch={setSearch} />
          <NewsList news={searchedCategoryNews} />
        </Container>
      </main>

      <footer className={styles.footer}></footer>
    </div>
  );
};

export default Home;
