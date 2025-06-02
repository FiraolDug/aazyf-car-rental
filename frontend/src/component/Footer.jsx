import { Link } from 'react-router-dom'
import '../css/footer.css'
const Footer = () => {
  return (
    <div className='footerDiv'>
      <div className='footer'>
        <div>
          <p className='headTxt'>Car rental system</p>
          <p className='companyTxt'>
            Online booking & availability checks
            Customer & admin dashboards
            Payment processing 
          </p>

        </div>
        <div>
          <p className='headTxt'>Quick Search</p>
          <Link className='linkTxt' to='/' >
          <p>Home</p>
          </Link>
          <Link className='linkTxt' to='/login' >
          <p>Register</p>
          </Link>
          <Link className='linkTxt' to='/about' >
          <p>About</p>
          </Link>
        </div>

        <div>
          <p className='headTxt'>  Get In Touch</p>
          <ul >
            <li className ='contact'>+25960558207</li>
            <li className='contact'>abellegend4321@gmail.com</li>
          </ul>
            
        </div>
        <div className='copyDiv'>
            <hr />
            <p className='copyTxt'>Copyright 2025 car rental- All rights reserved</p>
        </div>
      </div>
    </div>
  )
}

export default Footer
