
import { ReactComponent as DeleteIcon } from '../assets/svg/deleteIcon.svg'
import { ReactComponent as EditIcon } from '../assets/svg/editIcon.svg'


const ImageCard = ({ image, id, onEdit, onDelete }) => {
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

export default ImageCard
