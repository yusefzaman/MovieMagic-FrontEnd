import { Link } from "react-router-dom"

const Home = () => {

  return (
    <div className="home-container col">         

      <section className="welcome-signin">
      <iframe className="video" src="https://www.youtube.com/embed/TcMBFSGVi1c?loop=1&autoplay=1&fs=0&controls=0&modestbranding=1"></iframe>
       </section> 

       <section className="Button">
        <Link to={`/movies`}>
        <button className="button">Click Here To Get Started</button>
        </Link>

         </section>

           
      </div>
  )
}

export default Home