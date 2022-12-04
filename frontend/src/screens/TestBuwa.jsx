import { Link } from 'react-router-dom'
import { ReactComponent as DeleteIcon } from '../assets/svg/deleteIcon.svg'
import { ReactComponent as EditIcon } from '../assets/svg/editIcon.svg'
import bedIcon from '../assets/svg/bedIcon.svg'
import bathtubIcon from '../assets/svg/bathtubIcon.svg'

const TestBuwa = ({ image, id, onEdit, onDelete }) => {
  return (
    <li className='categoryListing'>
      <img
        src={image}
        // alt={listing.name}
        className='categoryListingImg'
      />
      <div className='categoryListingDetails'></div>

      <DeleteIcon
      style={{marginTop: '10%'}}
        className='removeIcon'
        fill='rgb(231, 76, 60 )'
        onClick={() => onDelete(id)}
      />

   
    </li>
  )
}

export default TestBuwa
