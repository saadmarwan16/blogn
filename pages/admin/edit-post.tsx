import { NextPage } from "next";
import Metatags from "../../components/Metatags";

interface EditPostProps {}

const EditPost: NextPage<EditPostProps> = () => {
  return (
    <>
      <Metatags title="Edit Post" />
      <div>Hello, edit page</div>
    </>
  );
};

export default EditPost;
