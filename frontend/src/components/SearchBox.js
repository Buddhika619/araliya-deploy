import { useEffect, useState } from 'react'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { Link, useLocation, useNavigate } from 'react-router-dom'

const SearchBox = () => {
  const navigate = useNavigate()
  const [keyWord, setKeyword] = useState('')

  const submitHandler = (e) => {
    e.preventDefault()
    if (keyWord.trim()) {
      navigate(`/search/${keyWord}`)
    //   setKeyword('')
    } else {
      navigate('/')
    }
  }

//   useEffect(() => {
 
//     navigate(`/search/${keyWord}`)
//     if(keyWord === ''){
//         navigate('/')
//     }
//   }, [keyWord])


  return (
    <Form onSubmit={submitHandler}>
      <Row className='mt-2'>
        <Col xs={8}>
          <Form.Control
            type='text'
            name='q'
            onChange={(e) => setKeyword(e.target.value)}
            placeholder='Search Products'
            className='ms-sm-2 me-sm-2 '
          ></Form.Control>
        </Col>
        <Col xs={1}>
          <Button type='submit' variant='outline-success' className='p-2'>
            Search
          </Button>
        </Col>
      </Row>
    </Form>
  )
}

export default SearchBox
