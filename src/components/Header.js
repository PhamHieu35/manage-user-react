import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import logo from '../assets/image/logo.png'
import { useLocation, NavLink, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import './Header.scss';
import { useDispatch, useSelector } from 'react-redux';
import { handleLogOut } from '../redux/actions/userActions';
import { useEffect } from 'react';

const Header = (props) => {

    const navigate = useNavigate();
    const user = useSelector(state => state.user.user)
    const dispatch = useDispatch();

    const handleLogout = () => {
        dispatch(handleLogOut())

    }

    useEffect(() => {
        if (user && user.auth === false && window.location.pathname !== '/login') {
            navigate('/');
            toast.success('Log out user success!')
        }
    }, [user])
    return (
        <>
            <Navbar bg="light" expand="lg">
                <Container>
                    <Navbar.Brand >
                        <NavLink to='/'>
                            <img
                                src={logo}
                                width="40"
                                height="40"
                                className="d-inline-block align-top"
                                alt="React Bootstrap logo"
                            />
                        </NavLink>

                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        {(user && user.auth || window.location.pathname === '/') &&
                            <>
                                <Nav className="me-auto">
                                    <NavLink to='/' className='nav-link menu'> Trang Chủ</NavLink>
                                    <NavLink to='/manage-user' className='nav-link menu'> Quản Lý Người Dùng</NavLink>
                                </Nav>
                                <Nav >
                                    <span className='nav-link'>Xin chào: {user.email}</span>
                                    <NavDropdown title="Cài đặt" id="basic-nav-dropdown">
                                        {user && user.auth === true
                                            ? <NavDropdown.Item onClick={() => handleLogout()}>Đăng Xuất</NavDropdown.Item>
                                            : <NavLink to='/login' className='dropdown-item'> Đăng Nhập</NavLink>
                                        }
                                    </NavDropdown>
                                </Nav>
                            </>
                        }
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    )
}

export default Header;