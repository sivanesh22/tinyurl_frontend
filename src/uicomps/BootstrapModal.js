import React from 'react';
import { Modal } from 'react-bootstrap';

function BootstrapModal(props) {
    // const [show, setShow] = useState(false);
    // const handleClose = () => setShow(false);
    // const handleShow = () => setShow(true);
    const { heading = '', showModal, hideModal } = props;
    return (
        <>
            <Modal show={showModal} onHide={hideModal}>
                <Modal.Header closeButton>
                    <Modal.Title>{heading}</Modal.Title>
                </Modal.Header> 
                {props.children}
            </Modal>
        </>
    );
}


export default BootstrapModal;
