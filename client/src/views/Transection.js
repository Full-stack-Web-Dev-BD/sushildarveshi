import { TabContent, TabPane, Nav, NavItem, NavLink, Card, Button, CardTitle, CardText, Row, Col } from "reactstrap";
import React, { useState } from 'react';
import classnames from 'classnames';
import MakeTransection from "./MakeTransection";

class Transection extends React.Component {
  state = {
    activeTab: '1'
  }
  toggle = tab => {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      })
    }
  }
  render() {
    return (
      <>
        <div className="content">
          <div>
            <Nav tabs style={{marginBottom:'10px'}}>
              <NavItem>
                <NavLink
                  className={classnames({ active: this.state.activeTab === '1' })}
                  onClick={() => { this.toggle('1'); }}
                >Make Transection</NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  className={classnames({ active: this.state.activeTab === '2' })}
                  onClick={() => { this.toggle('2'); }}
                >My Order</NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  className={classnames({ active: this.state.activeTab === '3' })}
                  onClick={() => { this.toggle('3'); }}
                >Order History</NavLink>
              </NavItem>
              <NavItem  >
                <NavLink
                  className={classnames({ active: this.state.activeTab === '4' })}
                  onClick={() => { this.toggle('4'); }}
                >MyPDP </NavLink>
              </NavItem>
            </Nav>
            <TabContent activeTab={this.state.activeTab}>
              <TabPane tabId="1">
                  <MakeTransection/>
              </TabPane>
              <TabPane tabId="2">
                  <h1>My Order </h1>
              </TabPane>
              <TabPane tabId="3">
                  <h1>Order History</h1>
              </TabPane>
              <TabPane tabId="4">
                  <h1>MyPDP</h1>
              </TabPane>
            </TabContent>
          </div>
        </div>
      </>
    );
  }
}
export default Transection;
