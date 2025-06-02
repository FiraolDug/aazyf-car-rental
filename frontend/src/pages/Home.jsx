
import Hero from '../section/Hero';
import '../css/App.css'
import Feature from '../section/Feature';
import HomeFooter from '../component/HomeFooter';

const Home = () => {
  return (
    <>
    <div className='homeDiv'>
      <Hero />
      <Feature />
      
    </div>
  <HomeFooter />
    </>
  )
}

export default Home
