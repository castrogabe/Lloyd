import 'react-toastify/dist/ReactToastify.css';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

const BottomHeader = () => {
  return (
    <Navbar className='bottom-header'>
      <Container>
        <Nav className='mx-auto'>
          {/* Centers the links */}
          <LinkContainer to='/'>
            <Nav.Link>Home</Nav.Link>
          </LinkContainer>
          <LinkContainer to='/about'>
            <Nav.Link>About Us</Nav.Link>
          </LinkContainer>
          <LinkContainer to='/collections'>
            <Nav.Link>Collections</Nav.Link>
          </LinkContainer>
          <LinkContainer to='/contact'>
            <Nav.Link>Contact</Nav.Link>
          </LinkContainer>
          {/* <LinkContainer to='/design'>
            <Nav.Link>Design</Nav.Link>
          </LinkContainer> */}
          <LinkContainer to='/soldAntiques'>
            <Nav.Link>Sold Antiques</Nav.Link>
          </LinkContainer>
          {/* <LinkContainer to='/askedQuestions'>
            <Nav.Link>FAQ</Nav.Link>
          </LinkContainer> */}
        </Nav>
      </Container>
    </Navbar>
  );
};

export default BottomHeader;
