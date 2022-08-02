import {
    FETCH_USER_LOGIN, FETCH_USER_SUCCESS,
    FETCH_USER_ERROR, USER_LOGOUT, USER_REFRESH
} from '../actions/userActions';


const INITIAL_STATE = {
    user: {
        email: '',
        auth: null,
        token: ''
    },
    isLoadingApi: false,
    isLoadingError: false
};

const userReducer = (state = INITIAL_STATE, action) => {

    switch (action.type) {

        case FETCH_USER_LOGIN:

            return {
                ...state,
                isLoadingApi: true,
                isLoadingError: false
            };
        case FETCH_USER_SUCCESS:
            console.log('check data user redux >>', action);
            return {
                ...state,
                user: {
                    email: action.data.email,
                    token: action.data.token,
                    auth: true
                },
                isLoadingApi: false,
                isLoadingError: false
            };
        case FETCH_USER_ERROR:
            return {
                ...state,
                user: {
                    auth: false
                },
                isLoadingApi: false,
                isLoadingError: true
            };
        case USER_LOGOUT:
            localStorage.removeItem("email");
            localStorage.removeItem("token");
            return {
                ...state,
                user: {
                    email: '',
                    auth: false,
                    token: ''
                }

            };
        case USER_REFRESH:
            return {
                ...state,
                user: {
                    email: localStorage.getItem('email'),
                    token: localStorage.getItem('token'),
                    auth: true,

                }

            };

        default: return state;

    }

};

export default userReducer;