import Head from "next/head";
import { FunctionComponent } from "react";

interface MetatagsProps {
  title: string;
  description?: string;
  image?: string;
}

const Metatags: FunctionComponent<MetatagsProps> = ({
  title,
  description = "Create your blogs and connect with those around you",
  image = "/person.png",
}) => {
  return (
    <Head>
      <title>{title} | Blogn</title>
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:site" content="@blogn" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
    </Head>
  );
};

export default Metatags;
