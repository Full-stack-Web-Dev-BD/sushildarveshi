import React from "react";
import PropTypes from "prop-types";
import { Container, Row, Nav, NavItem, NavLink } from "reactstrap";

class Footer extends React.Component {
  render() {
    return (
      <footer className="footer">
        <Container fluid>
          <Nav>
            <NavItem>
              <NavLink ><a href="http://localhost:6000" target="_blank">Contact Us</a></NavLink>
            </NavItem>
            <NavItem>
              <NavLink ><a href="http://localhost:6000" target="_blank">Return Policy </a></NavLink>
            </NavItem>
            <NavItem>
              <NavLink ><a href="http://localhost:6000" target="_blank">FAQs  </a></NavLink>
            </NavItem>
          </Nav>
        </Container>
      </footer>
    );
  }
}

export default Footer;
