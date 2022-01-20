import Head from "next/head";
import Baner from "../components/Baner";
import Header from "../components/Header";

export default function Home() {
  return (
    <div className="bg-gray-50 h-screen">
      <Head>
        <title>Blog</title>
        <link rel="icon" href="/logo.png" />
      </Head>
      <Header />
      <body className="max-w-7xl mx-auto">
        <Baner />
      </body>
    </div>
  );
}
