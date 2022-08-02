import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { deleteUser } from '../service/userService';
import { toast } from 'react-toastify';

const ModalConfirm = (props) => {

    const { show, handleClose, dataDeleteUser, handleDeleteUserFromModal } = props;

    const handleDeleteUser = async () => {
        let res = await deleteUser(dataDeleteUser.id);
        if (res && res.statusCode === 204) {
            toast.success('Xóa người dùng thành công!');
            handleClose();
            handleDeleteUserFromModal(dataDeleteUser)
        } else {
            toast.error('Xóa người dùng thất bại!');
        }
    }

    return (
        <Modal
            show={show}
            onHide={handleClose}
            backdrop="static"
            keyboard={false}
        >
            <Modal.Header closeButton>
                <Modal.Title>Delete A User</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className='body-add-new'>
                    <span >Are you sure you want to delete the user with, </span>
                    <p><b>Email= {dataDeleteUser.email} ?</b></p>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="primary" onClick={() => handleDeleteUser()}>
                    Delete
                </Button>
            </Modal.Footer>
        </Modal>
    )

}

export default ModalConfirm;