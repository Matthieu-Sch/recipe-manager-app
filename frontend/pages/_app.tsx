import "../styles/globals.css";
import { AppProps } from "next/app";
import Head from "next/head";
import Layout from "../components/Layout/Layout";

function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Todo App</title>
      </Head>
      <Layout>
        <Component touch {...pageProps} />
      </Layout>
    </>
  );
}

export default App;
