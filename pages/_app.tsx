import { Provider } from "next-auth/client";
import PlausibleProvider from "next-plausible";
import { DefaultSeo } from "next-seo";
import type { AppProps } from "next/app";
import Head from "next/head";
import { useRouter } from "next/router";
import { Layout } from "../components";
import SEO from "../next-seo.config";
import "../styles/main.css";

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();

  return (
    <PlausibleProvider domain="coursehub.app" trackOutboundLinks={true}>
      <Provider session={pageProps.session}>
        <DefaultSeo
          {...SEO}
          canonical={
            router.pathname === "/"
              ? "https://coursehub.app"
              : "https://coursehub.app" + router.pathname
          }
        />
        <Head>
          <link rel="shortcut icon" href="/favicon.ico" />
        </Head>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </Provider>
    </PlausibleProvider>
  );
}

export default MyApp;
