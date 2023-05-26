import { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import FormContainer from '../components/FormContainer'
import { ReactComponent as ArrowRightIcon } from '../assets/svg/keyboardArrowRightIcon.svg'
import visibilityIcon from '../assets/svg/visibilityIcon.svg'
import { toast } from 'react-toastify'
import { login } from '../actions/userActions'
import { Container, Spinner } from 'react-bootstrap'
import styled from 'styled-components'
import { resetErrors } from '../reducers/userSlice'


const LoginForm = styled.form`


  .inputIn {
    border-width: 0.5px;
    outline: none;

    &:hover {
      border-color: black;
      border-width: 1px;
    }
    &:focus {
      border-color: #00cc66;
      border-width: 2px;
      box-shadow: none;
    }
  }

 
`



const Signin = () => {
  const [showPassword, setShowPasssword] = useState(false)
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })

  const { email, password } = formData

  const dispatch = useDispatch()

  const userLogin = useSelector((state) => state.userLogin)
  const { loading, error, userInfo } = userLogin

  const navigate = useNavigate()

  let { search } = useLocation()

  const redirect = search ? search.split('=')[1] : '/'
  console.log(userInfo)

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,

      [e.target.id]: e.target.value,
    }))
  }

  dispatch(resetErrors()) 
  useEffect(() => {
   // reset error msg
    if (userInfo) {
      navigate(redirect)
      toast.success("Sign-in Success!")
    }
  }, [navigate, userInfo, redirect])

  const onSubmit = async (e) => {
    e.preventDefault()
    dispatch(login(email, password))
  }

  if(error) {
    toast.error(error)
  }

  
  if(loading) {
    return  <Spinner/>
  }

  return (
    
    <FormContainer>
      <div className='pageContainer'>
        <header>
          <p className='pageHeader'>Welcome Back!</p>
        </header>
        {/* <main> */}
        <LoginForm onSubmit={onSubmit}>
          <input
            type='email'
            id='email'
            className='emailInput inputIn'
            placeholder='Email'
            value={email}
            onChange={onChange}
            required
          />

          <div className='passwordInputDiv'>
            <input
              type={showPassword ? 'text' : 'password'}
              className='passwordInput inputIn'
              placeholder='Password'
              id='password'
              value={password}
              onChange={onChange}
              required
            />
            <img
              src={visibilityIcon}
              alt='show password'
              className='showPassword'
              onClick={() => setShowPasssword(!showPassword)}
            />
          </div>
          <Link to='/forgotpassword' className='forgotPasswordLink'>
            Forgot Password
          </Link>
          <div className='signInBar'>
            <p className='signInText'>Sign In</p>
            <button className='signInButton'>
              <ArrowRightIcon fill='#fff' width='34px' height='34px' />
            </button>
          </div>
        </LoginForm>

        <Link to={redirect ? `/register?redirect=${redirect}` : `/register`} className='registerLink' >
          Sign Up Instead
        </Link>
        {/* </main> */}
        <br/> <br/> <br/> <br/> <br/><br/> <br/>
      </div>
    </FormContainer>
  )
}

export default Signin
