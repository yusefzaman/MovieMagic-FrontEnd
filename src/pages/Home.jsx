import { Link } from 'react-router-dom'
import Profile from '../components/Profile'

const Home = () => {
  return (
    <div className="home-container">
      <div className="content-container">
        <section className="welcome-signin">
          <iframe
            className="video"
            src="https://www.youtube.com/embed/TcMBFSGVi1c?loop=1&autoplay=1&fs=0&controls=0&modestbranding=1"
          ></iframe>
        </section>
        <section className="button-container">
          <Link to="/movies">
            <button className="button">Click Here To Get Started</button>
          </Link>
        </section>
      </div>
      <section className="user-details">
        <Profile />
      </section>
    </div>
  )
}

export default Home
