import {
  LineStyle,
  Timeline,
  TrendingUp,
  PermIdentity,
  Storefront,
  AttachMoney,
  BarChart,
  MailOutline,
  DynamicFeed,
  ChatBubbleOutline,
  WorkOutline,
  Report,
  LocalShippingOutlined,
} from '@material-ui/icons'
import { Link, useLocation } from 'react-router-dom'
import styled from 'styled-components'
import Dropdown from 'react-bootstrap/Dropdown'
import DropdownButton from 'react-bootstrap/DropdownButton'
import { useEffect, useState } from 'react'

const SidebarContainer = styled.div`
  z-index: 999;
  background-color: white;
  /* position: absolute; */
  display: block;
  top: 50px;
  width: 300px;
  box-shadow: 0 10px 10px -5px;
  @media (max-width: 1190px) {
    top: 83px;
    position: absolute;
    box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  }
`

const SidebarWrappper = styled.div`
  padding: 20px;
  color: #555;
`

const SidebarMenu = styled.div`
  margin-bottom: 10px;
`
const SidebarTitle = styled.h3`
  margin-bottom: 10px;
`

const SidebarList = styled.ul`
  list-style: none;
  padding: 5px;
`
const SubSidebarList = styled.ul``

const SidebarListItem = styled.li`
  margin-bottom: 10px;
  padding: 5px;
  cursor: pointer;
  display: flex;
  align-items: center;
  border-radius: 10px;
  color: #555;
  &:active,
  &:hover {
    background-color: rgb(240, 240, 255);
  }
  > * {
    margin-right: 5px;
    font-size: 20px !important;
    color: #555;
    &:hover {
      transform: rotate(300deg);
      transition-duration: 5s;
      animation-iteration-count: 2;
    }
  }
`

const Sidebar = ({ view, success }) => {
  const location = useLocation()

  const path = location.pathname.split('/')[2]

  const [productSub, setProductSub] = useState(false)
  const [orderSub, setOrderSub] = useState(false)
  const [configSub, setConfigSub] = useState(false)

  const pathMatchRoute = (route) => {
    if (route == location.pathname) {
      return true
    }
  }

  // useEffect(() => {
  //   const buttonList = document.querySelectorAll('.button')

  //   const arr = Array.from(buttonList)

  //   let filter = arr?.filter(
  //     (x) => x.classList[x.classList.length - 2] === path
  //   )

  //   if (filter[0]) {
  //     filter[0].classList.add('sidebarActive')
  //   }
  // }, [])

  return (
    <>
      {view && (
        <SidebarContainer>
          <SidebarWrappper>
            <SidebarMenu>
              <SidebarList>
                <Link to='/admin/dashboard'>
                  <SidebarListItem className='dashboard button'>
                    <i className='fa-solid fa-gauge'></i>
                    Dashboard
                  </SidebarListItem>
                </Link>

                {/* products links */}
                <SidebarListItem onClick={() => setProductSub(!productSub)}>
                  <Storefront />
                  Products
                </SidebarListItem>
                {productSub ? (
                  <SubSidebarList>
                    <Link to='/admin/products/active'>
                      <SidebarListItem>
                        <i className='fa-sharp fa-solid fa-spinner'></i>
                        Active
                      </SidebarListItem>
                    </Link>
                    <Link to='/admin/products/outofstock'>
                      <SidebarListItem>
                        <i className='fa-regular fa-circle-check'></i>
                        Out Of Stock
                      </SidebarListItem>
                    </Link>
                    <Link to='/admin/products/deactivated'>
                      <SidebarListItem>
                        <i class='fa-solid fa-user-secret'></i>
                        Deactivated
                      </SidebarListItem>
                    </Link>
                  </SubSidebarList>
                ) : path === 'products' ? (
                  <SubSidebarList>
                    <Link to='/admin/products/active'>
                      <SidebarListItem
                        className={
                          pathMatchRoute('/admin/products/active')
                            ? 'navbarListINameActive'
                            : 'navbarListIName'
                        }
                      >
                        <i className='fa-sharp fa-solid fa-spinner'></i>
                        Active
                      </SidebarListItem>
                    </Link>
                    <Link to='/admin/products/outofstock'>
                      <SidebarListItem
                        className={
                          pathMatchRoute('/admin/products/outofstock')
                            ? 'navbarListINameActive'
                            : 'navbarListIName'
                        }
                      >
                        <i className='fa-regular fa-circle-check'></i>
                        Out Of Stock
                      </SidebarListItem>
                    </Link>
                    <Link to='/admin/products/deactivated'>
                      <SidebarListItem
                        className={
                          pathMatchRoute('/admin/products/deactivated')
                            ? 'navbarListINameActive'
                            : 'navbarListIName'
                        }
                      >
                        <i class='fa-solid fa-user-secret'></i>
                        Deactivated
                      </SidebarListItem>
                    </Link>
                  </SubSidebarList>
                ) : (
                  console.log(123)
                )}

                <SidebarListItem onClick={() => setOrderSub(!orderSub)}>
                  <LocalShippingOutlined />
                  Orders
                </SidebarListItem>

                {/* order links */}
                {orderSub ? (
                  <SubSidebarList>
                    <Link to='/admin/orders/neworders'>
                      <SidebarListItem className='orders button'>
                        <i className='fa-sharp fa-solid fa-spinner'></i>
                        New Orders
                      </SidebarListItem>
                    </Link>
                    <Link to='/admin/orders/processing'>
                      <SidebarListItem>
                        <i className='fa-regular fa-circle-check'></i>
                        Processing Orders
                      </SidebarListItem>
                    </Link>
                    <Link to='/admin/orders/dispatched'>
                      <SidebarListItem>
                        <i className='fa-regular fa-circle-check'></i>
                        Dipatched Orders
                      </SidebarListItem>
                    </Link>
                    <Link to='/admin/orders/completed'>
                      <SidebarListItem>
                        <i className='fa-regular fa-circle-check'></i>
                        Completed Orders
                      </SidebarListItem>
                    </Link>
                  </SubSidebarList>
                ) : path === 'orders' ? (
                  <SubSidebarList>
                    <Link to='/admin/orders/neworders'>
                      <SidebarListItem className='orders button'>
                        <i className='fa-sharp fa-solid fa-spinner'></i>
                        New Orders
                      </SidebarListItem>
                    </Link>
                    <Link to='/admin/orders/processing'>
                      <SidebarListItem>
                        <i className='fa-regular fa-circle-check'></i>
                        Processing Orders
                      </SidebarListItem>
                    </Link>
                    <Link to='/admin/orders/dispatched'>
                      <SidebarListItem>
                        <i className='fa-regular fa-circle-check'></i>
                        Dipatched Orders
                      </SidebarListItem>
                    </Link>
                    <Link to='/admin/orders/completed'>
                      <SidebarListItem>
                        <i className='fa-regular fa-circle-check'></i>
                        Completed Orders
                      </SidebarListItem>
                    </Link>
                  </SubSidebarList>
                ) : (
                  console.log(123)
                )}

                <SidebarListItem onClick={() => setConfigSub(!configSub)}>
                  <LocalShippingOutlined />
                  Configuration
                </SidebarListItem>

                {/* Config links */}
                {configSub ? (
                  <SubSidebarList>
                    <Link to='/admin/config/offers'>
                      <SidebarListItem className='orders button'>
                        <i className='fa-sharp fa-solid fa-spinner'></i>
                        Offers
                      </SidebarListItem>
                    </Link>
                    <Link to='/admin/config/carousel'>
                      <SidebarListItem className='orders button'>
                        <i className='fa-sharp fa-solid fa-spinner'></i>
                        carousel
                      </SidebarListItem>
                    </Link>
                  </SubSidebarList>
                ) : path === 'config' ? (
                  <SubSidebarList>
                    <Link to='/admin/config/offers'>
                      <SidebarListItem className='orders button'>
                        <i className='fa-sharp fa-solid fa-spinner'></i>
                        Offers
                      </SidebarListItem>
                    </Link>
                    <Link to='/admin/config/carousel'>
                      <SidebarListItem className='orders button'>
                        <i className='fa-sharp fa-solid fa-spinner'></i>
                        carousel
                      </SidebarListItem>
                    </Link>
                  </SubSidebarList>
                ) : (
                  console.log(123)
                )}
              </SidebarList>
            </SidebarMenu>

            <SidebarMenu>
              <SidebarTitle>Quick Menu</SidebarTitle>
              <SidebarList>
                <Link to='/admin/users'>
                  <SidebarListItem className='users button'>
                    <PermIdentity />
                    Users
                  </SidebarListItem>
                </Link>
                <Link to='/products'>
                  <SidebarListItem>
                    <Storefront />
                    Products
                  </SidebarListItem>
                </Link>
                <SidebarListItem>
                  <AttachMoney />
                  Transactions
                </SidebarListItem>
                <SidebarListItem>
                  <BarChart />
                  Reports
                </SidebarListItem>
              </SidebarList>
            </SidebarMenu>
            <SidebarMenu>
              <SidebarTitle>Notifications</SidebarTitle>
              <SidebarList>
                <SidebarListItem>
                  <MailOutline />
                  Mail
                </SidebarListItem>
                <SidebarListItem>
                  <DynamicFeed />
                  Feedback
                </SidebarListItem>
                <SidebarListItem>
                  <ChatBubbleOutline />
                  Messages
                </SidebarListItem>
              </SidebarList>
            </SidebarMenu>
            <SidebarMenu>
              <SidebarTitle>Staff</SidebarTitle>
              <SidebarList>
                <SidebarListItem>
                  <WorkOutline />
                  Manage
                </SidebarListItem>
                <SidebarListItem>
                  <Timeline />
                  Analytics
                </SidebarListItem>
                <SidebarListItem>
                  <Report />
                  Reports
                </SidebarListItem>
              </SidebarList>
            </SidebarMenu>
          </SidebarWrappper>
        </SidebarContainer>
      )}
    </>
  )
}

export default Sidebar
