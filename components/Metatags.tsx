import Head from "next/head";
import { FunctionComponent } from "react";

interface MetatagsProps {
  title: string;
}

const Metatags: FunctionComponent<MetatagsProps> = ({ title }) => {
  return (
    <Head>
      <title>{title} | Blogn</title>
      <meta
        property="description"
        content="Bringing content creators and consumers together through blogs"
      />
    </Head>
  );
};

export default Metatags;
