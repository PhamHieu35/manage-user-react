import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { postCreateUser } from '../service/userService';
import { toast } from 'react-toastify';

const ModalAddNewUser = (props) => {
    const { show, handleClose, handleUpdateUser } = props;
    const [name, setName] = useState('');
    const [job, setJob] = useState('');


    const handleAddNewUser = async () => {
        let res = await postCreateUser(name, job);
        console.log(res);
        if (res && res.id) {
            handleClose();
            setName('');
            setJob('');
            toast.success('Thêm mới người dùng thành công!');
            handleUpdateUser({ first_name: name, id: res.id })
        }
    }

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Add New User</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className='body-add-new'>
                    <div className="mb-3">
                        <label className="form-label">Name</label>
                        <input type="text" className="form-control"
                            value={name}
                            onChange={(event) => setName(event.target.value)}
                        />

                    </div>
                    <div className="mb-3">
                        <label className="form-label">Job</label>
                        <input type="text" className="form-control"
                            value={job}
                            onChange={(event) => setJob(event.target.value)}
                        />
                    </div>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="primary" onClick={() => handleAddNewUser()}>
                    Save Changes
                </Button>
            </Modal.Footer>
        </Modal>
    )

}

export default ModalAddNewUser;