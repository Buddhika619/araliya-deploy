import { style } from '@mui/system'
import { Row, Col, Form, Button, Container } from 'react-bootstrap'
import styled from 'styled-components'

//TODO - neeed to fix overflow issue in footer

const Wrapper = styled.div`
  background-color: #222935;
  overflow-x: none !important;
  
  @media (max-width: 1000px) {
    display: none;
  }
`

const Link = styled.a`
  color: inherit;
  text-decoration: none;
  transition: all 0.3s;
  &:hover,
  &:focus {
    text-decoration: none;
  }
`

const Input = styled.input`
  background: #212529;
  border-color: #545454;
  &:focus {
    background: #212529;
  }
`

const Footer = () => {
  return (
    <Wrapper className='w-100 py-4 flex-shrink-0'>
      <Container className=' py-4'>
        <Row className='row gy-4 gx-5'>
          <Col lg={4} md={6}>
            <h5 className='h1 text-white'>ARALIYA</h5>
            <p className=' text-muted mb-0 mt-4'>NO. 302, Digana, Rajawalla,, Kandy, Sri Lanka</p>
            <p className=' text-muted mb-0'>Email: araliyahoteldigana@gmail.com</p>
            <p className=' text-muted mb-0'>Phone: +94 81 237 6865</p>
            <p className='small text-muted mt-4'>
              Designed and Developed By{' '}
              <a className='text-primary ' href='#'>
                Buddhika Gamage
              </a>
            </p>
          </Col>
  

        </Row>
      </Container>
    </Wrapper>
  )
}

export default Footer
