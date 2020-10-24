import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import { Button, Col, Form, FormGroup, Input, Label, Nav, NavItem, Pagination, PaginationItem, PaginationLink, Row, Table } from 'reactstrap'

export class MakeTransection extends Component {
    render() {
        let alldata = [23, 442, 24, 242, 4,]
        return (
            <Row>
                <Col md="3">
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
                <Col md="5">
                    <div className="d-flex">
                        <div className="col-md-9">
                            <div className="col-md-9">
                                <Pagination aria-label="Page navigation example">
                                    <PaginationItem >
                                        <PaginationLink first href="#" />
                                    </PaginationItem>

                                    <PaginationItem>
                                        <PaginationLink href="#">
                                            1
                                        </PaginationLink>
                                    </PaginationItem>
                                    <PaginationItem>
                                        <PaginationLink last href="#" />
                                    </PaginationItem>
                                </Pagination>
                            </div>
                        </div>
                        <div className="col-md-3"><Button size="sm">Add To Cart</Button></div>
                    </div>
                    <div className="table-full-width table-responsive">
                        <Table className="tablesorter" responsive>
                            <thead className="text-primary">
                                <tr>
                                    <th>Code </th>
                                    <th>Product</th>
                                    <th>MRP</th>
                                    <th>CLP</th>
                                    <th>MOQ</th>
                                    <th>Quota</th>
                                    <th>Qty </th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    alldata.map(el => {
                                        return (
                                            <tr>
                                                <td>1234567</td>
                                                <td>Test Product</td>
                                                <td>2344</td>
                                                <td>345.43</td>
                                                <td>1</td>
                                                <td>N/A</td>
                                                <td><input /></td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </Table>
                    </div>
                </Col>
                <Col md="4">
                    <div className="d-flex">
                        <div className="col-md-9">
                            <h3>My Cart . Total Amount (3233)</h3>
                        </div>
                    </div>
                    <div className="table-full-width table-responsive">
                        <Table className="tablesorter" responsive>
                            <thead className="text-primary">
                                <tr>
                                    <th>Code </th>
                                    <th>Product</th>
                                    <th>Qty </th>
                                    <th>Amount</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    alldata.map(el => {
                                        return (
                                            <tr>
                                                <td>1234567</td>
                                                <td>Test Product</td>
                                                <td>1</td>
                                                <td>34532</td>
                                            </tr>
                                        )
                                    })
                                }

                                <tr className="bg-warning text-white">
                                    <td></td>
                                    <td className="text-right">Total : </td>
                                    <td>43</td>
                                    <td>34532</td>
                                </tr>
                            </tbody>
                        </Table>
                    </div>
                </Col>
            </Row>
        )
    }
}

export default MakeTransection
