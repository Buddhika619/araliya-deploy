import { useNavigate, useLocation } from 'react-router-dom'
import { ReactComponent as CartIcon } from '../../assets/svg/cart-svgrepo-com.svg'
import { ReactComponent as ExploreIcon } from '../../assets/svg/exploreIcon.svg'
import { ReactComponent as PersonOutlineIcon } from '../../assets/svg/personOutlineIcon.svg'
import styled from 'styled-components'

const Footer = styled.footer`
 display: none;
 @media(max-width:800px){
  margin-top: 10%;
    display: flex;
    position: fixed;
   
 }
`

const Navbar = () => {
  const navigate = useNavigate()
  const location = useLocation()

  const pathMatchRoute = (route) => {
    if (route == location.pathname) {
      return true
    }
  }

  return (
    <Footer className='navbarm'>
      <nav className='navbarNav'>
        <ul className='navbarListItems'>
          <li className='navbarListItem' onClick={() => navigate('/')}>
            <ExploreIcon
              fill={pathMatchRoute('/') ? '#2c2c2c' : '#8f8f8f'}
              width='36px'
            />
            <p
              className={
                pathMatchRoute('/')
                  ? 'navbarListItemNameActive'
                  : 'navbarListItemName'
              }
            >
              Explore
            </p>
          </li>
          <li className='navbarListItem' onClick={() => navigate('/cart')}>
            <CartIcon
              fill={pathMatchRoute('/cart') ? '#2c2c2c' : '#8f8f8f'}
              width='28px'
            />
            <p
              className={
                pathMatchRoute('/cart')
                  ? 'navbarListItemNameActive'
                  : 'navbarListItemName'
              }
            >
              Cart
            </p>
          </li>
          <li className='navbarListItem' onClick={() => navigate('/profile')}>
            <PersonOutlineIcon
              fill={pathMatchRoute('/profile') ? '#2c2c2c' : '#8f8f8f'}
              width='36px'
            />
            <p
              className={
                pathMatchRoute('/profile')
                  ? 'navbarListItemNameActive'
                  : 'navbarListItemName'
              }
            >
              Profile
            </p>
          </li>
        </ul>
      </nav>
    </Footer>
  )
}

export default Navbar
