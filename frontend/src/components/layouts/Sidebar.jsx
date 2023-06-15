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
  Autorenew,
  DirectionsBike,
  Add,
  ArrowUpward,
  AccessAlarm,
  Fastfood,
  ToggleOn,
  ToggleOnOutlined,
  ErrorOutline,
  ToggleOff,
  ToggleOffOutlined,
  NotificationsActive,
  Category,
  ExtensionOutlined,
  NoteAddOutlined,
  SettingsOutlined,
} from "@material-ui/icons";
import { Link, useLocation } from "react-router-dom";
import styled from "styled-components";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import { useEffect, useState } from "react";
import WarehouseIcon from '@mui/icons-material/Warehouse';
import SoupKitchenOutlinedIcon from '@mui/icons-material/SoupKitchenOutlined';
import InventoryOutlinedIcon from '@mui/icons-material/InventoryOutlined';
import TakeoutDiningOutlinedIcon from '@mui/icons-material/TakeoutDiningOutlined';
import HandshakeOutlinedIcon from '@mui/icons-material/HandshakeOutlined';
import ManageAccountsOutlinedIcon from '@mui/icons-material/ManageAccountsOutlined';
import DiscountOutlinedIcon from '@mui/icons-material/DiscountOutlined';
import DisplaySettingsOutlinedIcon from '@mui/icons-material/DisplaySettingsOutlined';

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
`;

const SidebarWrappper = styled.div`
  padding: 20px;
  color: #555;
`;

const SidebarMenu = styled.div`
  margin-bottom: 10px;
`;
const SidebarTitle = styled.h3`
  margin-bottom: 10px;
`;

const SidebarList = styled.ul`
  list-style: none;
  padding: 5px;
`;
const SubSidebarList = styled.ul``;

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
`;

const Sidebar = ({ view, success }) => {
  const location = useLocation();

  const path = location.pathname.split("/")[2];
  console.log(path);

  const [productSub, setProductSub] = useState(false);
  const [oproductSub, setoProductSub] = useState(false);
  const [orderSub, setOrderSub] = useState(false);
  const [configSub, setConfigSub] = useState(false);
  const [matSub, setMatSub] = useState(false);

  const pathMatchRoute = (route) => {
    if (route == location.pathname) {
      return true;
    }
  };

  return (
    <>
      {view && (
        <SidebarContainer>
          <SidebarWrappper>
            <SidebarList>
            <Link to="/admin/dashboard">
                  <SidebarListItem
                    className={
                      path == "dashboard"
                        ? "navbarListINameActive"
                        : "navbarListIName"
                    }
                  >
                    <i className="fa-solid fa-gauge"></i>
                    Dashboard
                  </SidebarListItem>
                </Link>

                <SidebarListItem onClick={() => setOrderSub(!orderSub)}>
                  <LocalShippingOutlined />
                  Orders
                </SidebarListItem>

                {/* order links */}
                {orderSub ? (
                  <SubSidebarList>
                    <Link to="/admin/orders/neworders">
                      <SidebarListItem className="orders button">
                      <NotificationsActive/>
                        New Orders
                      </SidebarListItem>
                    </Link>
                    <Link to="/admin/orders/processing">
                      <SidebarListItem>
                      <Autorenew/>
                        Processing Orders
                      </SidebarListItem>
                    </Link>
                    <Link to="/admin/orders/dispatched">
                      <SidebarListItem>
                      <DirectionsBike/>
                        Dipatched Orders
                      </SidebarListItem>
                    </Link>
                    <Link to="/admin/orders/completed">
                      <SidebarListItem>
                        <i className="fa-regular fa-circle-check"></i>
                        Completed Orders
                      </SidebarListItem>
                    </Link>
                  </SubSidebarList>
                ) : path === "orders" ? (
                  <SubSidebarList>
                    <Link to="/admin/orders/neworders">
                      <SidebarListItem
                        className={
                          pathMatchRoute("/admin/orders/neworders")
                            ? "navbarListINameActive"
                            : "navbarListIName"
                        }
                      >
                        <AccessAlarm/>
                        New Orders
                      </SidebarListItem>
                    </Link>
                    <Link to="/admin/orders/processing">
                      <SidebarListItem
                        className={
                          pathMatchRoute("/admin/orders/processing")
                            ? "navbarListINameActive"
                            : "navbarListIName"
                        }
                      >
                        <Autorenew/>
                        Processing Orders
                      </SidebarListItem>
                    </Link>
                    <Link to="/admin/orders/dispatched">
                      <SidebarListItem
                        className={
                          pathMatchRoute("/admin/orders/dispatched")
                            ? "navbarListINameActive"
                            : "navbarListIName"
                        }
                      >
                         <DirectionsBike/>
                        Dipatched Orders
                      </SidebarListItem>
                    </Link>
                    <Link to="/admin/orders/completed">
                      <SidebarListItem
                        className={
                          pathMatchRoute("/admin/orders/completed")
                            ? "navbarListINameActive"
                            : "navbarListIName"
                        }
                      >
                        <i className="fa-regular fa-circle-check"></i>
                        Completed Orders
                      </SidebarListItem>
                    </Link>
                  </SubSidebarList>
                ) : (
                  console.log(123)
                )}
            </SidebarList>
            <SidebarMenu>
              <SidebarList>
            

                {/* products links */}
                <SidebarListItem onClick={() => setProductSub(!productSub)}>
                  <Fastfood />
                  Custom Products
                </SidebarListItem>
                {productSub ? (
                  <SubSidebarList>
                    <Link to="/admin/products/active">
                      <SidebarListItem>
                        <ToggleOnOutlined/>
                        Active
                      </SidebarListItem>
                    </Link>
                    <Link to="/admin/products/outofstock">
                      <SidebarListItem>
                        <ErrorOutline/>
                        Out Of Stock
                      </SidebarListItem>
                    </Link>
                    <Link to="/admin/products/deactivated">
                      <SidebarListItem>
                        <ToggleOffOutlined/>
                        Deactivated
                      </SidebarListItem>
                    </Link>
                  </SubSidebarList>
                ) : path === "products" ? (
                  <SubSidebarList>
                    <Link to="/admin/products/active">
                      <SidebarListItem
                        className={
                          pathMatchRoute("/admin/products/active")
                            ? "navbarListINameActive"
                            : "navbarListIName"
                        }
                      >
                         <ToggleOnOutlined/>
                        Active
                      </SidebarListItem>
                    </Link>
                    <Link to="/admin/products/outofstock">
                      <SidebarListItem
                        className={
                          pathMatchRoute("/admin/products/outofstock")
                            ? "navbarListINameActive"
                            : "navbarListIName"
                        }
                      >
                        <ErrorOutline/>
                        Out Of Stock
                      </SidebarListItem>
                    </Link>
                    <Link to="/admin/products/deactivated">
                      <SidebarListItem
                        className={
                          pathMatchRoute("/admin/products/deactivated")
                            ? "navbarListINameActive"
                            : "navbarListIName"
                        }
                      >
                        <ToggleOffOutlined/>
                        Deactivated
                      </SidebarListItem>
                    </Link>
                  </SubSidebarList>
                ) : (
                  console.log(123)
                )}

                {/* products links */}
                <SidebarListItem onClick={() => setoProductSub(!oproductSub)}>
                  <TakeoutDiningOutlinedIcon />
                  Other Produts
                </SidebarListItem>
                {oproductSub ? (
                  <SubSidebarList>
                    <Link to="/admin/productsout/active">
                      <SidebarListItem>
                      <ToggleOnOutlined/>
                        Active
                      </SidebarListItem>
                    </Link>
                    <Link to="/admin/productsout/inStock">
                      <SidebarListItem>
                        <WarehouseIcon/>
                        Stock
                      </SidebarListItem>
                    </Link>
                    <Link to="/admin/productsout/deactivated">
                      <SidebarListItem>
                      <ToggleOffOutlined/>
                        Deactivated
                      </SidebarListItem>
                    </Link>
                  </SubSidebarList>
                ) : path === "productsout" ? (
                  <SubSidebarList>
                    <Link to="/admin/productsout/active">
                      <SidebarListItem
                        className={
                          pathMatchRoute("/admin/productsout/active")
                            ? "navbarListINameActive"
                            : "navbarListIName"
                        }
                      >
                        <ToggleOnOutlined/>
                        Active
                      </SidebarListItem>
                    </Link>
                    <Link to="/admin/productsout/inStock">
                      <SidebarListItem
                        className={
                          pathMatchRoute("/admin/productsout/inStock")
                            ? "navbarListINameActive"
                            : "navbarListIName"
                        }
                      >
                         <WarehouseIcon/>
                        Stock
                      </SidebarListItem>
                    </Link>
                    <Link to="/admin/productsout/deactivated">
                      <SidebarListItem
                        className={
                          pathMatchRoute("/admin/productsout/deactivated")
                            ? "navbarListINameActive"
                            : "navbarListIName"
                        }
                      >
                       <ToggleOffOutlined/>
                        Deactivated
                      </SidebarListItem>
                    </Link>
                  </SubSidebarList>
                ) : (
                  console.log(123)
                )}

                <Link to="/admin/category">
                  <SidebarListItem
                    className={
                      path == "category"
                        ? "navbarListINameActive"
                        : "navbarListIName"
                    }
                  >
                    <Category />
                    Product Categories
                  </SidebarListItem>
                </Link>
                <SidebarListItem onClick={() => setMatSub(!matSub)}>
                  <ExtensionOutlined />
                  Materials
                </SidebarListItem>

                {/* material links */}
                {matSub ? (
                  <SubSidebarList>
                    <Link to="/admin/materials/all">
                      <SidebarListItem className="orders button">
                      <ExtensionOutlined/>
                        Materials
                      </SidebarListItem>
                    </Link>
                    <Link to="/admin/materials/stock">
                      <SidebarListItem className="orders button">
                      <WarehouseIcon/>
                        Stock
                      </SidebarListItem>
                    </Link>
                  </SubSidebarList>
                ) : path === "materials" ? (
                  <SubSidebarList>
                    <Link to="/admin/materials/all">
                      <SidebarListItem
                        className={
                          pathMatchRoute("/admin/materials/all")
                            ? "navbarListINameActive"
                            : "navbarListIName"
                        }
                      >
                        <ExtensionOutlined/>
                        Materials
                      </SidebarListItem>
                    </Link>
                    <Link to="/admin/materials/stock">
                      <SidebarListItem
                        className={
                          pathMatchRoute("/admin/materials/stock")
                            ? "navbarListINameActive"
                            : "navbarListIName"
                        }
                      >
                        <WarehouseIcon/>
                        Stock
                      </SidebarListItem>
                    </Link>
                  </SubSidebarList>
                ) : (
                  console.log(123)
                )}
              </SidebarList>
            </SidebarMenu>

            <SidebarMenu>
              {/* <SidebarTitle>Inventory</SidebarTitle> */}
              <SidebarList>
                <Link to="/admin/batches">
                  <SidebarListItem
                    className={
                      path == "batches"
                        ? "navbarListINameActive"
                        : "navbarListIName"
                    }
                  >
                    <InventoryOutlinedIcon />
                    GRN and Batches
                  </SidebarListItem>
                </Link>

                <Link to="/admin/kitchen">
                  <SidebarListItem
                    className={
                      path == "kitchen"
                        ? "navbarListINameActive"
                        : "navbarListIName"
                    }
                  >
                    <SoupKitchenOutlinedIcon />
                    Kitchen Reservations
                  </SidebarListItem>
                </Link>
              
                <Link to="/admin/supplier">
                  <SidebarListItem
                    className={
                      path == "supplier"
                        ? "navbarListINameActive"
                        : "navbarListIName"
                    }
                  >
                    <HandshakeOutlinedIcon />
                    Suppliers
                  </SidebarListItem>
                </Link>

             
              </SidebarList>

             
              <Link to="/admin/users">
                  <SidebarListItem
                    className={
                      path == "users"
                        ? "navbarListINameActive"
                        : "navbarListIName"
                    }
                  >
                    <ManageAccountsOutlinedIcon />
                    Users
                  </SidebarListItem>
                </Link>
                <Link to="/admin/reports">
                  <SidebarListItem
                    className={
                      path == "reports"
                        ? "navbarListINameActive"
                        : "navbarListIName"
                    }
                  >
                    <BarChart />
                    Reports
                  </SidebarListItem>
                </Link>
              <SidebarListItem onClick={() => setConfigSub(!configSub)}>
                <SettingsOutlined />
                Configuration
              </SidebarListItem>

              {/* Config links */}
              {configSub ? (
                <SubSidebarList>
                  <Link to="/admin/config/offers">
                    <SidebarListItem className="orders button">
                      <DiscountOutlinedIcon/>
                      Offers
                    </SidebarListItem>
                  </Link>
                  <Link to="/admin/config/carousel">
                    <SidebarListItem className="orders button">
                      <DisplaySettingsOutlinedIcon/>
                      carousel
                    </SidebarListItem>
                  </Link>
                </SubSidebarList>
              ) : path === "config" ? (
                <SubSidebarList>
                  <Link to="/admin/config/offers">
                    <SidebarListItem
                      className={
                        pathMatchRoute("/admin/config/offers")
                          ? "navbarListINameActive"
                          : "navbarListIName"
                      }
                    >
                       <DiscountOutlinedIcon/>
                      Offers
                    </SidebarListItem>
                  </Link>
                  <Link to="/admin/config/carousel">
                    <SidebarListItem
                      className={
                        pathMatchRoute("/admin/config/carousel")
                          ? "navbarListINameActive"
                          : "navbarListIName"
                      }
                    >
                      <DisplaySettingsOutlinedIcon/>
                      carousel
                    </SidebarListItem>
                  </Link>
                </SubSidebarList>
              ) : (
                console.log(123)
              )}
              <div style={{ paddingBottom: "350px" }}></div>
            </SidebarMenu>
          </SidebarWrappper>
        </SidebarContainer>
      )}
    </>
  );
};

export default Sidebar;
