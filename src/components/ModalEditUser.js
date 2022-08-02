import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { putUpdateUser } from '../service/userService';
import { toast } from 'react-toastify';

const ModalEditUser = (props) => {
    const { show, handleClose, dataEditUser, handleEditUserFromModal } = props;
    const [name, setName] = useState('');
    const [job, setJob] = useState('');

    const handleEditUser = async () => {
        let res = await putUpdateUser(name, job);
        console.log(res);
        handleEditUserFromModal({
            first_name: name,
            id: dataEditUser.id
        })

    }
    useEffect(() => {
        if (show) {
            setName(dataEditUser.first_name)
        }
    }, [dataEditUser])


    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Edit A User</Modal.Title>
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
                <Button variant="primary" onClick={() => handleEditUser()}>
                    Edit A User
                </Button>
            </Modal.Footer>
        </Modal>
    )

}

export default ModalEditUser;