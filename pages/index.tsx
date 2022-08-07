import Head from "next/head";
import { useState } from "react";
import getNews from "../fetchers/getNews";
import useNews from "../queries/useNews";
import INews from "../typescript/INews";

import styles from "../styles/Home.module.css";
import NewsFilter from "../components/NewsFilter";
import getCategorizedNews from "../helpers/getCategorizedNews";
import ICategoryType from "../typescript/ICategoryType";
import Container from "../components/Container";
import NewsList from "../components/NewsList";

export const getServerSideProps = async () => {
  const initialData = await getNews();

  return {
    props: { initialData },
  };
};

interface IProps {
  initialData: INews;
}

const Home = ({ initialData }: IProps) => {
  const { data } = useNews({ initialData });
  const [activeFilter, setActiveFilter] = useState<ICategoryType>("0");

  const categorizedNews = getCategorizedNews(data);
  const categories = Object.keys(categorizedNews) as ICategoryType[];
  const categoryNews =
    activeFilter === "0" ? data : categorizedNews[activeFilter];

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
          <NewsList news={categoryNews} />
        </Container>
      </main>

      <footer className={styles.footer}></footer>
    </div>
  );
};

export default Home;
