import { style } from '@mui/system'
import { Row, Col, Container } from 'react-bootstrap'
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


const Footer = () => {
  return (
    <Wrapper className='w-100 py-4 flex-shrink-0'>
      <Container className=' py-4'>
        <Row className='row gy-4 gx-5'>
          <Col lg={4} md={6}>
            <h5 className='h1 text-white'>ARALIYA</h5>
            <p className='small text-muted'>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
              eiusmod tempor incididunt.
            </p>
            <p className='small text-muted mb-0'>
              &copy; Copyrights. All rights reserved by{' '}
              <a className='text-primary ' href='#'>
                Buddhika Gamage
              </a>
            </p>
          </Col>
          <Col lg={2} md={6}>
            <h5 className='text-white mb-3'>Quick links</h5>
            <ul className='list-unstyled text-muted'>
              <li>
                <Link href='#'>Careers</Link>
              </li>
              <li>
                <Link href='#'>Our Stores</Link>
              </li>
              <li>
                <Link href='#'>Terms & Conditions</Link>
              </li>
              <li>
                <Link href='#'>Privacy Policy</Link>
              </li>
            </ul>
          </Col>
          <Col lg={2} md={6}>
            <h5 className='text-white mb-3'>Find Us On</h5>
            <ul className='list-unstyled text-muted'>
              <li className='mb-1'>
                <Link href='#'>
                  <i className='fa-brands fa-facebook fa-l'></i> Facebook
                </Link>
              </li>
              <li className='mb-1'>
                <Link href='#'>
                  <i className='fa-brands fa-instagram fa-l'></i> Instagram
                </Link>
              </li>
              <li className='mb-1'>
                <Link href='#'>
                  <i className='fa-brands fa-whatsapp fa-l'></i> Whatsapp
                </Link>
              </li>
              <li className='mb-1'>
                <Link href='#'>
                  <i className='fa-brands fa-twitter fa-l'></i> Twitter
                </Link>
              </li>
            </ul>
          </Col>
          <Col className='col-lg-4 col-md-6'>
            <h5 className='text-white mb-3'>Contact Us</h5>
            <p className=' text-muted'>70 Old Town, Digana, Rajawella</p>
            <p className=' text-muted'>Email: araliyaFoods@gmail.com</p>
            <p className=' text-muted'>Phone: +94 81 245 2525</p>
          </Col>
        </Row>
      </Container>
    </Wrapper>
  )
}

export default Footer
