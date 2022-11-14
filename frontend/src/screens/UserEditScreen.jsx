import { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'
import { getUserDetails, updateUser } from '../actions/userActions'
import { userUpdatereset } from '../reducers/userDetailsSlice'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'


const UserEditScreen = () => {
  const { id } = useParams()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [isAdmin, setIsAdmin] = useState(false)
  const [message, setMessage] = useState(null)

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const userDetails = useSelector((state) => state.userDetails)
  const { loading, error, user } = userDetails

  const uesrUpdate = useSelector((state) => state.userDetails)
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = uesrUpdate

  useEffect(() => {
    if (successUpdate) {
      setName(user.name)
      setEmail(user.email)
      setIsAdmin(user.isAdmin)
      // navigate('/admin/userlist')

      toast.success(`User Updated!`, {
        position: 'bottom-right',
        autoClose: 1000,
        theme: 'colored',
      })
    } else {
      if (!user.name || user._id !== id) {
        dispatch(getUserDetails(id))
      } else {
        setName(user.name)
        setEmail(user.email)
        setIsAdmin(user.isAdmin)
      }
    }
  }, [user, id, dispatch, navigate, successUpdate])

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(updateUser({ _id: id, name, email, isAdmin }))
  }

  const updateRest = () => {
    dispatch(userUpdatereset())
  }

  return (
    <>

          <ToastContainer hideProgressBar={true} />
          <Link
            to='/admin/userlist'
            className='btn btn-light my-3'
            onClick={updateRest}
          >
            Go Back
          </Link>
          {/* {successUpdate && <Message varient='success'>Profile Updated</Message>} */}
          <FormContainer>
            <h1>Edit User</h1>
            {/* {loadingUpdate && <Loader />}
        {errorUpdate && <Message varient='danger'>{errorUpdate}</Message>} */}
            {loading ? (
              <Loader />
            ) : error ? (
              <Message varient='danger'>{error}</Message>
            ) : (
              <Form onSubmit={submitHandler}>
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

                <Form.Group controlId='isAdmin'>
                  <Form.Check
                    type='checkbox'
                    label='isAdmin'
                    checked={isAdmin}
                    onChange={(e) => setIsAdmin(e.target.checked)}
                  ></Form.Check>
                </Form.Group>

                <Button className='my-3' type='submit' variant='primary'>
                  Update
                </Button>
              </Form>
            )}
          </FormContainer>

    </>
  )
}

export default UserEditScreen
