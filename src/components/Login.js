import { useEffect, useState } from 'react'
import './Login.scss'
import { NavLink } from "react-router-dom";
import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";
import { handleLoginRedux } from '../redux/actions/userActions';
import { useDispatch, useSelector } from 'react-redux';

const Login = (props) => {
    const dispatch = useDispatch()
    const isLoading = useSelector(state => state.user.isLoadingApi)
    const user = useSelector(state => state.user.user)

    const navigate = useNavigate();
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [isShowPassword, setIsShowPassword] = useState(false)

    const handleLogin = async () => {
        if (!email || !password) {
            toast.error('email/password is required!');
            return;
        }
        dispatch(handleLoginRedux(email, password))
    }

    const handlePressEnter = (event) => {
        if (event.key === 'Enter') {
            handleLogin();
        }
    }

    useEffect(() => {
        if (user && user.auth === true) {
            navigate('/')
        }

    }, [user])

    return (
        <div className="login-container col-12 col-sm-4">
            <div className="title">Đăng Nhập</div>
            <div className='text'>Email <span>( eve.holt@reqres.in )</span></div>
            <input type='email' placeholder="email..."
                value={email}
                onChange={(event) => setEmail(event.target.value)}
            />
            <div className='input-pw'>
                <input type={isShowPassword === true ? 'text' : 'password'} placeholder="password..."
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    onKeyDown={(event) => handlePressEnter(event)}
                />
                <i className={isShowPassword === true ? 'fa-solid fa-eye' : "fa-solid fa-eye-slash"}
                    onClick={() => setIsShowPassword(!isShowPassword)}
                ></i>
            </div>


            <button className={email && password ? "btn-login active" : 'btn-login disabled'}
                onClick={() => handleLogin()}>
                {isLoading && <i className="fa-solid fa-spinner fa-spin-pulse me-2"></i>}
                Đăng nhập
            </button>

            <div className="go-back">
                <NavLink to='/' className='nav-link'>
                    <i class="fa-solid fa-angles-left"></i>

                    Quay lại
                </NavLink>

            </div>

        </div>
    )
}

export default Login