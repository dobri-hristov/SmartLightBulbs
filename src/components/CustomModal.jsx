import { Modal, Button } from "react-bootstrap";

const CustomModal = ({ title, show, hide, confirm, children }) => {
  const handleConfirm = () => {
    confirm();
    hide();
  };
  return (
    <Modal show={show} onHide={hide} size="md" centered>
      <Modal.Header closeButton className="py-2">
        <Modal.Title >{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{children}</Modal.Body>
      {confirm && (
        <Modal.Footer className="py-2">
          <Button onClick={hide}>Close</Button>
          <Button variant="danger" onClick={handleConfirm}>
            Confirm
          </Button>
        </Modal.Footer>
      )}
    </Modal>
  );
};

export default CustomModal;
