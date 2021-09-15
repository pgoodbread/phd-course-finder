import { Provider } from "next-auth/client";
import type { AppProps } from "next/app";
import Head from "next/head";
import { Layout } from "../components";
import { useRouter } from "next/router";
import "../styles/main.css";

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();

  if (router.route === "/") {
    return <Component {...pageProps} />;
  }
  return (
    <Provider session={pageProps.session}>
      <Head>
        <title>CourseHub</title>
        <link rel="shortcut icon" href="/favicon.ico" />
        <meta
          name="description"
          content="Centralized platform for PhD-level courses. Spend less time searching, more time researching."
        />
      </Head>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Provider>
  );
}

export default MyApp;
