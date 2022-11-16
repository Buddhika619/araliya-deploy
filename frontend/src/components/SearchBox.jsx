import { useEffect, useState } from 'react'
import {
  Form,
  Button,
  Row,
  Col,
  DropdownButton,
  Dropdown,
} from 'react-bootstrap'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import styled from 'styled-components'

const SearchBar = styled(Form)`
  .formContainer {
    display: flex;
    
    /* align-items: center; */
  }
  .searchContainer {
    flex:4;
    border-radius: 80px;
    margin-left: 200px;
    background-color: white;
    padding-right: 0px;
    position: relative;
    @media (max-width: 1200px) {
      
    }
    @media (max-width: 992px) {
      flex:0.75;
      width: 0px;
      margin-left: 10px;
      
    }
    @media (max-width: 500px) {
      flex:0.5;
      width: 0px;
      margin-left: 10px;
      
    }
  }
  .searchIcon {
    position: absolute;
    top: 10px;
    color: #7d879c;
    @media (max-width: 480px) {
      left: 10;
    }
    @media (max-width: 480px) {
      left: 6px;
    }
  }
  .search {
    width:450px;
    margin-right: 0px;
    border: 0px;
    outline: none;
    outline: none;
    box-shadow: none;
      @media (max-width: 1200px) {
        width:350px;
    }
    @media (max-width: 480px) {
      width:200px;
    }
    &::placeholder {
      /* Chrome, Firefox, Opera, Safari 10.1+ */
      color: #b4b8c1;
      opacity: 1; /* Firefox */
    }
  }

  .buttonContainer {
    padding-left: 0;
    margin-left: -20px;
    background-color: white;
    @media (max-width: 480px) {
      
    }
  }

  .dropButton {
    background-color: #f6f9fc;
    color: #4b566b;
    padding-right: 25px;
    border-radius: 0 50px 50px 0;
    border-left: none;
     @media (max-width: 1200px) {
      padding-right: 10px;
    }
    @media (max-width: 992px) {
     
    }
  }

  .dropdown-menu {
    border-radius: 1px;
    margin-top: 0px;
    box-shadow: 0 10px 10px -5px;
    border: 0px;
  }
`

const SearchContainer = styled(Col)`
  border: ${(props) => (props.hover ? '2px solid #00cc66;' : 'white')};
`

const DropButton = styled.button`
  border: ${(props) => (props.hover ? '2px solid #00cc66;' : 'white')};
`

const SearchBox = () => {
  const navigate = useNavigate()
  const [keyWord, setKeyword] = useState('')
  const [hover, setHover] = useState(0)

  // const submitHandler = (e) => {
  //   e.preventDefault()
  //   if (keyWord.trim()) {
  //     navigate(`/search/${keyWord}`)
  //     //   setKeyword('')
  //   } else {
  //     navigate('/')
  //   }
  // }

  const inputHandler = (e) => {
    setKeyword(e.target.value)
  }

  const hoverHandler = () => {
    setHover(1)
  }

  const hoverOutHandler = () => {
    setHover(0)
  }

  useEffect(() => {
    if (hover === 1) {
      navigate(`/search/${keyWord}`)
      if (keyWord === '') {
        navigate('/')
      }
    }
  }, [keyWord])

  return (
    // <Form action='#'>
    //           <Form.Group className='input-group mb-3'>
    //             <Input
    //               className='form-control'
    //               type='email'
    //               placeholder="Recipient's username"
    //             />
    //             <Button
    //               className='btn btn-primary'
    //               id='button-addon2'
    //               type='button'
    //             >
    //               <i className='fas fa-paper-plane'></i>
    //             </Button>
    //           </Form.Group>
    <SearchBar>
      <Row className='mt-2 formContainer'>
        <SearchContainer xs={8} className='searchContainer' hover={hover}>
          <i
            className='fa-solid fa-magnifying-glass searchIcon'
           
          ></i>

          
          <Form.Control
            type='text'
            name='q'
            onChange={inputHandler}
            onFocus={hoverHandler}
            onBlur={hoverOutHandler}
            placeholder='Search Products'
            className='ms-sm-2 me-sm-2 search override'
          ></Form.Control>
        </SearchContainer>
        <Col xs={1} className='buttonContainer dropdown'>
          {/* <Button type='submit' className='btn btn-primary'>
          <i className='fas fa-paper-plane'></i>
          </Button> */}

          <DropButton
            className='btn btn-secondary dropdown-toggle dropButton'
            hover={hover}
            type='button'
            data-bs-toggle='dropdown'
            aria-expanded='false'
          >
            All Products
          </DropButton>
          <ul className='dropdown-menu'>
            <li>
              <a className='dropdown-item' href='#'>
                Action
              </a>
            </li>
            <li>
              <a className='dropdown-item' href='#'>
                Another action
              </a>
            </li>
            <li>
              <a className='dropdown-item' href='#'>
                Something else
              </a>
            </li>
            <li>
              <a className='dropdown-item' href='#'>
                Something else
              </a>
            </li>
            <li>
              <a className='dropdown-item' href='#'>
                Something else
              </a>
            </li>

            <li>
              <a className='dropdown-item' href='#'>
                Something else
              </a>
            </li>
          </ul>
        </Col>
      </Row>
    </SearchBar>
  )
}

export default SearchBox
