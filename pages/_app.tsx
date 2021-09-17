import { Provider } from "next-auth/client";
import type { AppProps } from "next/app";
import Head from "next/head";
import { Layout } from "../components";
import { DefaultSeo } from "next-seo";
import SEO from "../next-seo.config";
import "../styles/main.css";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider session={pageProps.session}>
      <DefaultSeo {...SEO} />
      <Head>
        <link rel="shortcut icon" href="/favicon.ico" />
        <script
          defer
          data-domain="coursehub.app"
          src="https://plausible.io/js/plausible.js"
        ></script>
      </Head>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Provider>
  );
}

export default MyApp;
