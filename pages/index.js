import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import PageLayout from "../components/PageLayout";
import styles from "../styles/Home.module.css";

export default function Home({ articles }) {
  return (
    <PageLayout title="NewsApp - Home">
      <div className={styles.container}>
        {articles.length === 0 && <p>No tenemos artículos</p>}
        {articles.length > 0 &&
          articles.map((article, index) => (
            <div key={index}>
              <Image
                src={article.urlToImage}
                alt={`Imagen for the article '${article.title}'`}
              />
              <h2>{article.title}</h2>
              <p>{article.description}</p>
            </div>
          ))}
      </div>
    </PageLayout>
  );
}

// N requests -> se ejecuta 1 vez en build time (o para refrescar la pagina)
export async function getStaticProps() {
  const response = await fetch(
    "https://newsapi.org/v2/top-headlines?sources=techcrunch&apiKey=0469ef15e7324dc5956748508f43adfe"
  );
  const { articles } = await response.json();

  return {
    props: {
      articles,
    },
  };
}

// N requests -> se ejecuta N veces
//  para datos que necesitas que sean MUY live
//  tiene demasiados datos dinamicos
// export async function getServerSideProps() {
//   const response = await fetch(
//     "https://newsapi.org/v2/top-headlines?sources=techcrunch&apiKey=0469ef15e7324dc5956748508f43adfe"
//   );

//   const { articles } = await response.json();

//   return {
//     props: {
//       articles,
//     },
//   };
// }
