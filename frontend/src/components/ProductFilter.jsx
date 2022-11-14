import { Col, Container, Form, Row } from 'react-bootstrap'
import React, { useEffect, useState } from 'react'

import Box from '@mui/material/Box'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'

const Wrapper = styled(Container)`
  height: 8vh;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  border-radius: 5px;
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
  .select {
    width: 200px;
    border-width:0.5px;
    outline:none;
    border-color:#757272be;
    &:hover{
        border-color:black;
        border-width:1px;
    }
    &:focus{
        border-color: #d23f57;
        border-width:2px;
        box-shadow: none;
    }
   
  }
  span{
        padding-right:10px;
        
    }
`

const ProductFilter = ({keyword}) => {

    const navigate = useNavigate()
//   const [filter, setFilter] = useState('')

  const handleChange =  (e) => {
    //  setFilter(e.currentTarget.value)
  console.log(keyword)

    if(keyword){
        const filter = e.target.value
        console.log(filter)
        // navigate(`/sort/${keyword}/${filter}`)
    }else{
        const filter = e.target.value
        console.log(filter)
        // navigate(`/sort/${filter}`)
    }
  
  }



  return (
  
      <Wrapper className='mb-4'>
     <span> Short By:</span>
        <Form.Select
          aria-label='Default select example'
          className='select'
          onChange={handleChange}
        >
          <option value='new' default>
            Newest Product
          </option>
          <option value='asc'>Price Low to High</option>
          <option value='dsc'>Price High to Low</option>
          <option value='top'>Top Rated Products</option>
        </Form.Select>
      </Wrapper>

  )
}

export default ProductFilter


