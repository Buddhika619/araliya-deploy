import { useDispatch, useSelector } from 'react-redux'
import { LinkContainer } from 'react-router-bootstrap'
import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import { Badge, NavDropdown } from 'react-bootstrap'
import { getUserDetails, logout } from '../../actions/userActions'
import SearchBox from '../SearchBox'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import styled from 'styled-components'

const TopNav = styled(Navbar)`
  background-color: #222935;

  .brand {
    @media (max-width: 1400px) and (min-width: 1200px) {
      margin-right: -120px;
    }

    @media (max-width: 1200px) and (min-width: 992px) {
      margin-right: -160px;
    }
    z-index: 1;
  }

  .search {
    margin: auto;
  }

  .cart {
    background-color: #f3f5f9;
    border-radius: 50%;
    width: 35px;
    height: 35px;
    position: relative;
    @media (max-width: 480px) {
      margin-top: 10px;
    }
    &:hover {
      transform: scale(1.2);
    }
  }

  .cartIcon {
    color: #222935;
    position: absolute;
    top: 10px;
    left: 8px;
  }

  .cartBadge {
    color: #fff;
    position: absolute;
    border-radius: 50%;
    top: -10px;
    left: 22px;
  }

  .user {
    background-color: #f3f5f9;
    border-radius: 50%;
    width: 35px;
    height: 35px;
    position: relative;
    &:hover {
      transform: scale(1.2);
    }
  }

  .userIcon {
    color: #222935;
    position: absolute;
    top: 10px;
    left: 10px;
  }
`

const Header = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const userDetails = useSelector((state) => state.userDetails)
  const { user } = userDetails

  const cart = useSelector((state) => state.cart)
  const { cartItems } = cart

  const logoutHandler = () => {
    dispatch(logout())
    navigate('/')
  }

  const profileHandler = () => {
    navigate('/profile')
    window.location.reload()
  }

  //handling userinfo fetching for admin dashboard
  const dashboardHandler = async () => {
    await dispatch(getUserDetails(userInfo._id))
    navigate('/admin/dashboard')
  }

  useEffect(() => {}, [cartItems])

  return (
    <header>
      <TopNav variant='dark' expand='lg' className='pb-3 pt-3' collapseOnSelect>
        <Container>
          <LinkContainer to='/'>
            <Navbar.Brand className='brand'>ARALIYA</Navbar.Brand>
          </LinkContainer>

          <Navbar.Toggle aria-controls='basic-navbar-nav' />
          <Navbar.Collapse id='basic-navbar-nav'>
            <SearchBox className='search' />
            <Nav className='ms-auto navEnd'>
              <LinkContainer to='/cart'>
                <Nav.Link>
                  <div className='cart'>
                    <i className='fas fa-cart-shopping fa-l cartIcon' />
                    {cartItems.length > 0 && (
                      <Badge bg='danger' className='cartBadge'>
                        {cartItems.length}
                      </Badge>
                    )}
                  </div>
                </Nav.Link>
              </LinkContainer>
              {userInfo ? (
                <NavDropdown title={userInfo.name} id='username'>
                  {/* <LinkContainer to='/profile'> */}
                  <NavDropdown.Item onClick={profileHandler}>
                    Profile
                  </NavDropdown.Item>
                  {/* </LinkContainer> */}
                  <NavDropdown.Item onClick={logoutHandler}>
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                <LinkContainer to='/login'>
                  <Nav.Link>
                    <div className='user'>
                      <i className='fas fa-user userIcon' />
                    </div>
                  </Nav.Link>
                </LinkContainer>
              )}
              {userInfo && userInfo.isAdmin && (
                <NavDropdown title='Admin' id='adminmenu'>
                  {/* <LinkContainer to='/admin/dashboard'> */}
                  <NavDropdown.Item onClick={dashboardHandler}>
                    Admin Dashboard
                  </NavDropdown.Item>
                  {/* </LinkContainer> */}
                </NavDropdown>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </TopNav>
    </header>
  )
}

export default Header
