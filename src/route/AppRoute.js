import { Routes, Route } from "react-router-dom";
import Home from '../components/Home';
import TableUsers from '../components/TableUsers';
import Login from '../components/Login';
import PrivateRoute from "./PrivateRoute";

const AppRoute = (props) => {
    return (
        <>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route
                    path="/manage-user"
                    element={
                        <PrivateRoute >
                            <TableUsers />
                        </PrivateRoute>
                    }
                />
            </Routes>
        </>
    )

}

export default AppRoute;