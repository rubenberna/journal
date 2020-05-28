import Head from "next/head";
import List from "./List";

const Layout = (props) => (
  <div>
    <Head>
      <title>Ruben</title>
      <link
        rel="stylesheet"
        href="https://stackpath.bootstrapcdn.com/bootswatch/4.4.1/cerulean/bootstrap.min.css"
      />
    </Head>
    <div className="container mx-auto px-4 flex">
      <List />
      {props.children}
    </div>
  </div>
);

export default Layout;
