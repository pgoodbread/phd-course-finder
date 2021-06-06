import { Provider } from "next-auth/client";
import type { AppProps } from "next/app";
import "tailwindcss/tailwind.css";
import { Footer, NavBar } from "../components";
import "../styles/main.css";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider session={pageProps.session}>
      <NavBar />
      <Component {...pageProps} />
      <Footer />
    </Provider>
  );
}

export default MyApp;
