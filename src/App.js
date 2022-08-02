import './App.scss';
import Header from './components/Header';
import Container from 'react-bootstrap/Container';
import { ToastContainer, toast } from 'react-toastify';

import { useEffect } from 'react';
import AppRoute from './route/AppRoute';
import { useDispatch } from 'react-redux';
import { handleRefresh } from './redux/actions/userActions';
function App() {

  const dispatch = useDispatch()

  useEffect(() => {
    if (localStorage.getItem('token')) {
      dispatch(handleRefresh())
    }
  }, [])

  return (
    <>
      <div className='App-container'>

        <Header />,
        <Container>
          <AppRoute />
        </Container>

      </div>
      <ToastContainer
        position="top-right"
        autoClose={1500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  );
}

export default App;
