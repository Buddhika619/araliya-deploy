import { useDispatch, useSelector } from 'react-redux'
import { LinkContainer } from 'react-router-bootstrap'
import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import { Badge, NavDropdown } from 'react-bootstrap'
import { logout } from '../../actions/userActions'

import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import styled from 'styled-components'
import axios from 'axios'
import { toast } from 'react-toastify'
import { Dashboard, LocalShipping } from '@material-ui/icons'

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
    top: 8px;
    left: 7px;
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

const AdminHeader = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const [newOrders, setNewOrders] = useState(0)

  const logoutHandler = () => {
    dispatch(logout())
    navigate('/')
  }

  const profileHandler = () => {
    navigate('/profile')
    window.location.reload()
  }

  useEffect(() => {
    const fetchCount = async () => {
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
          },
        }

        const { data } = await axios.get(
          `http://localhost:5000/api/orders/count`,
          config
        )

        setNewOrders(data)
        console.log(data)
      } catch (error) {
        toast.error(error)
      }
    }

    fetchCount()
    setInterval(() => {
      fetchCount()
    }, 55000)
  }, [])

  return (
    <header>
      <TopNav variant='dark' expand='lg' className='pb-3 pt-3' collapseOnSelect>
        <Container>
          <LinkContainer to='/'>
            <Navbar.Brand className='brand ms-5'>ARALIYA</Navbar.Brand>
          </LinkContainer>
          <LinkContainer to='/admin/dashboard'>
            <Dashboard color='primary'/>
          </LinkContainer>

          <Navbar.Toggle aria-controls='basic-navbar-nav' />
          <Navbar.Collapse id='basic-navbar-nav'>
            <Nav className='ms-auto navEnd'>
              <LinkContainer to='/admin/orders/neworders'>
                <Nav.Link>
                  <div className='cart'>
                  <LocalShipping className='cartIcon'/>
                    {newOrders > 0 && (
                      <Badge bg='danger' className='cartBadge'>
                        {newOrders}
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
            </Nav>
          </Navbar.Collapse>
        </Container>
      </TopNav>
    </header>
  )
}

export default AdminHeader
