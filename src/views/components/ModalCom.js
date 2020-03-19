import React from "react";
import PropTypes from "prop-types";
import { Modal, ModalBody, ModalFooter, ModalHeader, Button } from "reactstrap";
class ModalCom extends React.Component {
  constructor(props) {
    super(props);
  }
  toggle() {
    this.props.open = false;
  }
  render() {
    // This must be exactly one element or it will warn.
    const { title, open, body, handleOk, handleCancel } = this.props;
    return (
      <div>
        <Modal
          isOpen={open}
          toggle={this.toggle.bind(this)}
          className={"modal-primary " + this.props.className}
        >
          <ModalHeader toggle={this.toggle.bind(this)}>{title}</ModalHeader>
          <ModalBody>{body}</ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={handleOk}>
              Oke
            </Button>
            <Button color="secondary" onClick={this.toggle.bind(this)}>
              Cancel
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

ModalCom.propTypes = {
  open: PropTypes.bool,
  title: PropTypes.string,
  body: PropTypes.func,
  handleOk: PropTypes.func
  //   handleCancel: PropTypes.func
};

export default ModalCom;
