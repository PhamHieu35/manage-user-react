import { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import { fetchAllUser } from '../service/userService';
import ReactPaginate from 'react-paginate';
import ModalAddNewUser from './ModalAddNewUser';
import ModalEditUser from './ModalEditUser';
import ModalConfirm from './ModalConfirm';
import _ from 'lodash';
import { toast } from 'react-toastify';
import './TableUsers.scss'
import { debounce } from 'lodash';
import { CSVLink } from "react-csv";
import Papa from "papaparse";

const TableUsers = (props) => {

    const [listUser, setListUser] = useState([]);
    const [totalUser, setTotalUser] = useState(0);
    const [totalPage, setTotalPage] = useState(0);

    const [isShowModalAddNew, setIsShowModalAddNew] = useState(false)

    const [dataEditUser, setDataEditUser] = useState({});
    const [isShowModalEdit, setIsShowModalEdit] = useState(false)

    const [dataDeleteUser, setDataDeleteUser] = useState({});
    const [isShowModalConfirm, setIsShowModalConfirm] = useState(false);

    const [dataExport, setDataExport] = useState([])

    const handleClose = () => {
        setIsShowModalAddNew(false);
        setIsShowModalEdit(false);
        setIsShowModalConfirm(false);
    }

    useEffect(() => {
        getUsers(1);
    }, [])

    const getUsers = async (page) => {
        let res = await fetchAllUser(page);
        if (res && res.data) {
            console.log(res);
            setListUser(res.data);
            setTotalUser(res.total);
            setTotalPage(res.total_pages)
        }
    }

    const handlePageClick = (event) => {
        getUsers(event.selected + 1);
    }

    const handleUpdateUser = (user) => {
        setListUser([user, ...listUser]);
    }

    const handleEditUser = (user) => {
        setDataEditUser(user)
        setIsShowModalEdit(true)
    }

    const handleEditUserFromModal = (user) => {
        let cloneListUser = _.cloneDeep(listUser);
        let index = listUser.findIndex(item => item.id === user.id);
        cloneListUser[index].first_name = user.first_name

        setListUser(cloneListUser);
        setIsShowModalEdit(false);
        toast.success('Sửa người dùng thành công!')

    }

    const handleDeleteUserFromModal = (user) => {
        let cloneListUser = _.cloneDeep(listUser);
        cloneListUser = listUser.filter(item => item.id !== user.id);

        setListUser(cloneListUser);

    }

    const handleDeleteUser = (user) => {
        setIsShowModalConfirm(true);
        setDataDeleteUser(user);
    }

    const handleSort = (sortBy, sortField) => {
        let cloneListUser = _.cloneDeep(listUser);
        cloneListUser = _.orderBy(cloneListUser, [sortField], [sortBy]);
        setListUser(cloneListUser);

    }

    const handleSearch = debounce((event) => {
        let term = event.target.value;
        if (term) {
            let cloneListUser = _.cloneDeep(listUser);
            cloneListUser = cloneListUser.filter(item => item.email.includes(term));
            setListUser(cloneListUser)
        } else {
            getUsers(1);
        }
    }, 500)

    const getUserExport = (event, done) => {
        let result = [];

        if (listUser && listUser.length > 0) {
            result.push(["Id", "Email", "First Name", "Last Name"]);
            listUser.map((item, idx) => {
                let arr = [];
                arr[0] = item.id;
                arr[1] = item.email;
                arr[2] = item.first_name;
                arr[3] = item.last_name;
                result.push(arr);
            })
            setDataExport(result);
            done();
        }
    }

    const handleImportCSV = (event) => {
        if (event.target && event.target.files && event.target.files[0]) {
            let file = event.target.files[0];
            console.log('check file >>>', file);

            if (file.type !== "text/csv") {
                toast.error('only accept file tpye CSV...')
                return;
            }

            // Parse local CSV file
            Papa.parse(file, {
                // header: true,
                complete: function (results) {
                    let rawCSV = results.data;
                    if (rawCSV.length > 0) {
                        if (rawCSV[0] && rawCSV[0].length === 3) {
                            if (rawCSV[0][0] !== 'email' ||
                                rawCSV[0][1] !== 'first_name' ||
                                rawCSV[0][2] !== 'last_name'
                            ) {
                                toast.error('wrong format header csv file!')
                            } else {
                                let result = []
                                rawCSV.map((item, idx) => {
                                    if (idx > 0 && item.length === 3) {
                                        let obj = {};
                                        obj.email = item[0]
                                        obj.first_name = item[1]
                                        obj.last_name = item[2]

                                        result.push(obj)
                                    }
                                })
                                setListUser(result);
                                toast.success('import user success!')
                            }
                        } else {
                            toast.error('wrong format csv file!')
                        }
                    } else {
                        toast.error('not found data on file csv!')
                    }

                }
            });
        }

    }

    return (<>
        <div className='my4 h3 add-new d-sm-flex'>
            <span>DANH SÁCH NGƯỜI DÙNG:</span>
            <div className='group-btns '>
                <button className='btn btn-primary '
                    onClick={() => setIsShowModalAddNew(true)}>
                    <i className="fa-solid fa-circle-plus"></i>
                    Add New
                </button>

                <CSVLink
                    filename={"users.csv"}
                    className="btn btn-info"
                    data={dataExport}
                    asyncOnClick={true}
                    onClick={getUserExport}
                >
                    <i className="fa-solid fa-file-export m"></i>
                    Export
                </CSVLink>

                <label htmlFor='import' className='btn btn-success '>
                    <i className="fa-solid fa-upload "></i>
                    Import
                </label>
                <input id='import' type='file' hidden
                    onChange={(event) => handleImportCSV(event)}
                />
            </div>

        </div>
        <div className='col-12 col-sm-4 my-4 search-input'>
            <input
                className='form-control border border-primary'

                placeholder='search user by email...'
                onChange={(event) => handleSearch(event)}
            />
            <i className="fa-solid fa-magnifying-glass"></i>

        </div>
        <div className='custom-table'>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>
                            <div className='sort-header'>
                                <span>ID</span>
                                <span className='sort'>
                                    <i className="fa-solid fa-arrow-down-long"
                                        onClick={() => handleSort('desc', 'id')}
                                    ></i>
                                    <i className="fa-solid fa-arrow-up-long"
                                        onClick={() => handleSort('asc', 'id')}
                                    ></i>
                                </span>
                            </div>
                        </th>
                        <th>Email</th>
                        <th>
                            <div className='sort-header'>
                                <span>First Name</span>
                                <span className='sort'>
                                    <i className="fa-solid fa-arrow-down-long"
                                        onClick={() => handleSort('desc', 'first_name')}
                                    ></i>
                                    <i className="fa-solid fa-arrow-up-long"
                                        onClick={() => handleSort('asc', 'first_name')}
                                    ></i>
                                </span>
                            </div>
                        </th>
                        <th>Last Name</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {listUser && listUser.length > 0 && listUser.map((user, idx) => {
                        return (
                            <tr key={idx}>
                                <td>{user.id}</td>
                                <td>{user.email}</td>
                                <td>{user.first_name}</td>
                                <td>{user.last_name}</td>
                                <td>
                                    <button className='btn btn-warning mx-3'
                                        onClick={() => handleEditUser(user)}>
                                        <span className='me-2'><i className="fa-solid fa-pen"></i></span>
                                        Edit
                                    </button>
                                    <button className='btn btn-danger mx-2'
                                        onClick={() => handleDeleteUser(user)}>
                                        <span className='me-2'><i className="fa-solid fa-trash"></i></span>
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </Table>
        </div>
        <ModalAddNewUser
            show={isShowModalAddNew}
            handleClose={handleClose}
            handleUpdateUser={handleUpdateUser}
        />

        <ModalEditUser
            show={isShowModalEdit}
            handleClose={handleClose}
            dataEditUser={dataEditUser}
            handleEditUserFromModal={handleEditUserFromModal}
        />
        <ModalConfirm
            show={isShowModalConfirm}
            handleClose={handleClose}
            dataDeleteUser={dataDeleteUser}
            handleDeleteUserFromModal={handleDeleteUserFromModal}
        />


        <ReactPaginate
            breakLabel="..."
            nextLabel="next >"
            onPageChange={handlePageClick}
            pageRangeDisplayed={5}
            pageCount={totalPage}
            previousLabel="< previous"
            renderOnZeroPageCount={null}

            containerClassName="pagination"
            activeClassName="active"
            pageLinkClassName="page-link"
            breakLinkClassName="page-link"
            nextLinkClassName="page-link"
            previousLinkClassName="page-link"
            pageClassName="page-item"
            breakClassName="page-item"
            nextClassName="page-item"
            previousClassName="page-item"
        />
    </>
    )
}

export default TableUsers;