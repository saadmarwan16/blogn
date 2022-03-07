import { NextPage } from "next";
import AuthCheck from "../../components/AuthCheck";

const AdminPage: NextPage = () => {
  return (
    <main>
      <AuthCheck></AuthCheck>
    </main>
  );
};

export default AdminPage;
