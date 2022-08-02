import banner from '../assets/image/banner.png'
import './Home.scss'

const Home = (props) => {
    return (
        <div className='container'>
            <h1 className='text-center'>WEBSITE QUẢN LÝ NGƯỜI DÙNG</h1>
            <img src={banner} class="img-fluid" />
        </div>
    )
}

export default Home