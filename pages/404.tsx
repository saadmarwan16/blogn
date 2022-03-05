import Link from "next/link";
import Metatags from "../components/Metatags";

export default function Custom404() {
  return (
    <>
    <Metatags title="Page not found" />
    <main className="main-404">
      <h1>404 - That page does not seem to exist...</h1>
      <iframe
        src="https://giphy.com/embed/l2JehQ2GitHGdVG9y"
        width="480"
        height="362"
        frameBorder="0"
        allowFullScreen
      ></iframe>
      <Link href="/">
        <a>
          <button className="btn-blue">Go home</button>
        </a>
      </Link>
    </main></>
  );
}
