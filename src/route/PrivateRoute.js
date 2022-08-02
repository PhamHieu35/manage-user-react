
import Alert from 'react-bootstrap/Alert'
import { useSelector } from 'react-redux';
const PrivateRoute = (props) => {
    const user = useSelector(state => state.user.user)

    if (user && !user.auth) {
        return (
            <Alert variant="danger" >
                <Alert.Heading>LỖI!</Alert.Heading>
                <p>
                    Bạn không có quyền vào trang này khi chưa đăng nhập, Xin vui lòng đăng nhập để sử dụng chức năng quản lý người dùng!
                </p>
            </Alert>
        )
    }
    return (
        <>
            {props.children}
        </>
    )
}

export default PrivateRoute;