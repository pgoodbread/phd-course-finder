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
        <title>PHD-Course-Finder</title>
        <link rel="shortcut icon" href="/favicon.ico" />
        <meta name="description" content="Sick description" />
      </Head>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Provider>
  );
}

export default MyApp;
