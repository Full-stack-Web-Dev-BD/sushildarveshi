import Axios from 'axios'
import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import { Button, Col, Form, FormGroup, Input, Label, Nav, NavItem, Pagination, PaginationItem, PaginationLink, Row, Table } from 'reactstrap'
import CartProductPagination from './CartProductPagination'
import ProductPagination from './ProductPagination'

export class MakeTransection extends Component {
    state={
        allProduct:[]
    }
    componentDidMount(){
        this.getData()
    }
    getData() {
        Axios.get('/getAllProduct')
            .then(res => {
                this.setState({
                    allProduct:res.data
                })
            });
    }
    
    render() {
        return (
            <Row>
                <Col md="3" >
                    <h3>Catalogue</h3>
                    <Form>
                        <FormGroup>
                            <Input type="select" name="select" id="exampleSelect">
                                <option>All</option>
                                <option>2</option>
                                <option>3</option>
                                <option>4</option>
                                <option>5</option>
                            </Input>
                        </FormGroup>
                        <ul style={{ margin: '0', padding: '0', marginTop: '200px' }}>
                            <NavItem style={{ display: 'block', fontSize: '15px', fontWeight: '500', cursor: 'pointer' }}>Brand</NavItem>
                            <NavItem style={{ display: 'block', fontSize: '15px', fontWeight: '500', cursor: 'pointer' }}>Sub Brand</NavItem>
                            <NavItem style={{ display: 'block', fontSize: '15px', fontWeight: '500', cursor: 'pointer' }}>Product Code</NavItem>
                        </ul>
                    </Form>
                </Col>
                <Col md="5" xl="5">
                <div className="d-flex">
                        <div className="col-md-9">
                            <h4>All Product</h4>
                        </div>
                    </div>
                    <ProductPagination />
                </Col>
                <Col md="4" xl="4">
                    <div className="d-flex">
                        <div className="col-md-9">
                            <h4>My Cart . Total Amount (3233)</h4>
                        </div>
                    </div>
                    <CartProductPagination />
                </Col>
            </Row>
        )
    }
}

export default MakeTransection
