import 'antd/dist/reset.css';
import '../App.css';
import FavCard from './FavCard'

function FavPage() {
  return (
    <> 
    <h2 style={{ color: 'green' }}>Here is the pet yor marked</h2>     
     
      <FavCard />
    </>
  )
}
export default FavPage;