import { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'
import { register } from '../actions/userActions'
import styled from 'styled-components'
import CustomButton from '../components/microComponents/CustomButton'

const RegisterForm = styled(Form)`
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
const LoginLink = styled(Link)`
  color: black;
  font-weight: bold;
  margin-left: 5px;
`
const RegisterScreen = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [message, setMessage] = useState(null)

  const dispatch = useDispatch()

  const userRegister = useSelector((state) => state.userLogin)
  const { loading, error, userInfo } = userRegister

  const navigate = useNavigate()

  let { search } = useLocation()

  const redirect = search ? search.split('=')[1] : '/'

  useEffect(() => {
    if (userInfo) {
      navigate(redirect)
    }
  }, [navigate, userInfo, redirect])

  const submitHandler = (e) => {
    e.preventDefault()
    if (password !== confirmPassword) {
      setMessage('passWords do not match')
    } else {
      dispatch(register(name, email, password))
    }
  }

  return (
    <>

          <FormContainer>
            <h1>Sign Up</h1>
            {message && <Message varient='danger'>{message}</Message>}
            {error && <Message varient='danger'>{error}</Message>}
            {loading && <Loader />}

            <RegisterForm onSubmit={submitHandler}>
              <Form.Group controlId='name'>
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type='name'
                  placeholder='Enter name'
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                ></Form.Control>
              </Form.Group>

              <Form.Group controlId='email'>
                <Form.Label>email Address</Form.Label>
                <Form.Control
                  type='email'
                  placeholder='Enter email'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                ></Form.Control>
              </Form.Group>

              <Form.Group controlId='password'>
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type='password'
                  placeholder='Enter password'
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                ></Form.Control>
              </Form.Group>

              <Form.Group controlId='confirmPasswrod'>
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control
                  type='password'
                  placeholder='Confirm password'
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                ></Form.Control>
              </Form.Group>

              <CustomButton type='submit'>Register</CustomButton>
            </RegisterForm>

            <Row className='py-3'>
              <Col>
                Have an Account?{' '}
                <LoginLink to={redirect ? `/login?redirect=${redirect}` : `/login`}>
                  Login
                </LoginLink>
              </Col>
            </Row>
          </FormContainer>
    </>
  )
}

export default RegisterScreen
