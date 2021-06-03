import { Provider } from "next-auth/client";
import type { AppProps } from "next/app";
import "tailwindcss/tailwind.css";
import "../styles/main.css";
import { NavBar } from "../components";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider session={pageProps.session}>
      <NavBar />
      <Component {...pageProps} />
    </Provider>
  );
}

export default MyApp;
