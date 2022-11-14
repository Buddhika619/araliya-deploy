import { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'
import { login } from '../actions/userActions'
import styled from 'styled-components'
import CustomButton from '../components/microComponents/CustomButton'

const LoginForm = styled(Form)`
  * {
    margin: 5px 0px;
    background-color: #f6f9fc;
  }

  .input {
    border-width: 0.5px;
    outline: none;

    &:hover {
      border-color: black;
      border-width: 1px;
    }
    &:focus {
      border-color: #d23f57;
      border-width: 2px;
      box-shadow: none;
    }
  }

 
`
const RegisterLink = styled(Link)`
  color: black;
  font-weight: bold;
  margin-left: 5px;
`

const LoginScreen = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const dispatch = useDispatch()

  const userLogin = useSelector((state) => state.userLogin)
  const { loading, error, userInfo } = userLogin

  const navigate = useNavigate()

  let { search } = useLocation()

  const redirect = search ? search.split('=')[1] : '/'
  console.log(userInfo)

  useEffect(() => {
    if (userInfo) {
      navigate(redirect)
    }
  }, [navigate, userInfo, redirect])

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(login(email, password))
  }

  return (
    <>
      <FormContainer>
        <h1>Sign In</h1>
        {error && <Message varient='danger'>{error}</Message>}
        {loading && <Loader />}
        <LoginForm onSubmit={submitHandler}>
          <Form.Group controlId='email'>
            <Form.Label>email Address</Form.Label>
            <Form.Control
              className='input'
              type='email'
              placeholder='Enter email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId='password'>
            <Form.Label>Password</Form.Label>
            <Form.Control
              className='input'
              type='password'
              placeholder='Enter password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <CustomButton type='submit'>Sign In</CustomButton>
        </LoginForm>

        <Row className='py-3'>
          <Col>
            New Customer?
            <RegisterLink
              className='link'
              to={redirect ? `/register?redirect=${redirect}` : `/register`}
            >
              Register
            </RegisterLink>
          </Col>
        </Row>
      </FormContainer>
    </>
  )
}
export default LoginScreen
