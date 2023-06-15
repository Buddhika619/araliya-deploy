import { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { ReactComponent as ArrowRightIcon } from '../assets/svg/keyboardArrowRightIcon.svg'
import visibilityIcon from '../assets/svg/visibilityIcon.svg'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import FormContainer from '../components/FormContainer'
import { register } from '../actions/userActions'
import styled from 'styled-components'
import Spinner from '../components/Spinner'
import { resetErrors } from '../reducers/userSlice'

const RegisterForm = styled.form`
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

const Signup = () => {
  const [showPassword, setShowPasssword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confrimPassword: '',
  })

  const { name, email, password, confrimPassword } = formData

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,

      [e.target.id]: e.target.value,
    }))
  }

  const dispatch = useDispatch()

  const userRegister = useSelector((state) => state.userLogin)
  const { loading, error, userInfo } = userRegister

  const navigate = useNavigate()

  let { search } = useLocation()

  const redirect = search ? search.split('=')[1] : '/'
  dispatch(resetErrors())
  useEffect(() => {
    dispatch(resetErrors()) // reset error msg
    if (userInfo) {
      navigate(redirect)
      toast.success("Sign-up Success!")
    }
  }, [navigate, userInfo, redirect])

  const onSubmit = async (e) => {
    e.preventDefault()

    if (password !== confrimPassword) {
      toast.error('Password does not match')
    } else {
      dispatch(register(name, email, password))
    }
 
  }

  if(error) {
    toast.error(error)
  }

  if(loading) {
    <Spinner/>
  }

  return (
    <FormContainer>
      <div className='pageContainer'>
        <header>
          <p className='pageHeader'>Welcome Back!</p>
        </header>
        {/* <main> */}
        <RegisterForm onSubmit={onSubmit}>
          <input
            type='text'
            id='name'
            className='nameInput inputIn'
            placeholder='name'
            value={name}
            onChange={onChange}
            required
          />

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

          <div className='passwordInputDiv'>
            <input
              type={showConfirmPassword ? 'text' : 'password'}
              className='passwordInput inputIn'
              placeholder='confirm password'
              id='confrimPassword'
              value={confrimPassword}
              onChange={onChange}
              required
            />
            <img
              src={visibilityIcon}
              alt='show password'
              className='showPassword'
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            />
          </div>

         
          <div className='signUpBar'>
            <p className='signUpText'>Sign Up</p>
            <button className='signUpButton'>
              <ArrowRightIcon fill='#fff' width='34px' height='34px' />
            </button>
          </div>
        </RegisterForm>

        <Link to={redirect ? `/login?redirect=${redirect}` : `/login`} className='registerLink' >
          Sign In Instead
        </Link>
        {/* </main> */}
        <br/> <br/> <br/> <br/> <br/><br/> <br/>
      </div>
    </FormContainer>
  )
}

export default Signup
