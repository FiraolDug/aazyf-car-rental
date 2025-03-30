import {Link} from 'react-router-dom'
import {useContext} from 'react'
import {Context} from '../context/context'
import '../carItem.css'
import PropTypes from 'prop-types'
const CarItem = ({id,name,image,price}) => {
    const {currency}=useContext(Context)
  return (
<Link to={`/car/${id}`} className='carLink'>
<div className='carDiv'>
<img className="carImg" src={image[0]} alt="" />
        </div>
        <p className='carText1'>{name}</p>
        <div className='textDiv'>
        <p className='carText2'>{currency} {price}</p>
        </div>
      
</Link>
  )
}
CarItem.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  image: PropTypes.arrayOf(PropTypes.string).isRequired,
  price: PropTypes.number.isRequired,
};

export default CarItem

