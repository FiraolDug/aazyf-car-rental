
import List from '../components/List'
import Orders from '../components/Orders'
import '../css/report.css'
import Reservation from '../components/Reservation'

const Report = () => {
  return (
    <div className='reportDiv'>
      <List />
      <Orders />
      <Reservation />
    </div>
  )
}

export default Report
