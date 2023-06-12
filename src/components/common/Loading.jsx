import { Spinner } from "react-bootstrap";

const Loading = (props) => {
  return (
    <div className="mx-auto" {...props}>
      <Spinner animation="border" variant="primary" role="status" />
      <div className="visually-hidden">Loading...</div>
    </div>
  );
};

export default Loading;
