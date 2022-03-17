import { NextPage } from "next";
import Metatags from "../../components/Metatags";

interface SavedPostsProps {}

const SavedPosts: NextPage<SavedPostsProps> = () => {
  return (
    <>
      <Metatags title="Saved Posts" />
      Saved posts page
    </>
  );
};

export default SavedPosts;
