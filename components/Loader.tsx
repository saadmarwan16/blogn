import { FunctionComponent } from "react";

interface LoaderProps {
  show: boolean;
}

const Loader: FunctionComponent<LoaderProps> = ({ show }) => {
  if (!show) return null;

  return <div className="loader"></div>;
};

export default Loader;
