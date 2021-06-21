import { Provider } from "next-auth/client";
import type { AppProps } from "next/app";
import "tailwindcss/tailwind.css";
import { Layout } from "../components";
import "../styles/main.css";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider session={pageProps.session}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Provider>
  );
}

export default MyApp;
