import Axios from "axios";
import React from "react";
import { Link } from "react-router-dom";
import loading from "assets/img/loading1.gif";

// reactstrap components
import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Table,
  Row,
  Col,
  Button,
  Label,
  Input,
  FormGroup
} from "reactstrap";

class ImportData extends React.Component {
  state = {
    date: '',
    customerName: "",
    productName: "",
    price: '',
    description: '',
    storeN: '',
    category: '',

    store: [],
    storeName: '',
    categoryName: '',
    categorys: []
  }
  changeHandler(e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }
  componentDidMount() {
  }
  render() {
    return (
      <>
        <div className="content">
          <Row>
            <Col xs="12">
              <Card className="card-chart p-4">
                <CardHeader>
                  <Row>
                    <Col className="" >
                      <CardTitle tag="h2">Create </CardTitle>
                      <hr />
                    </Col>
                  </Row>
                </CardHeader>
                <CardBody>
                  <div className="row">
                    <div className="col-xl-3 col-md-4 col-sm-4 sm-col-12">
                      <Label>Date</Label>
                      <Input className="is-invalid" value={this.state.name} onChange={(e) => this.changeHandler(e)} type="date" name="date" placeholder="Select Date of Sale" />
                    </div>
                    <div className="col-xl-3 col-md-4 col-sm-4 sm-col-12">
                      <Label>Customer Name</Label>
                      <Input value={this.state.email} onChange={(e) => this.changeHandler(e)} type="text" name="customerName" placeholder="Customer Name" />
                    </div>
                    <div className="col-xl-3 col-md-4 col-sm-4 sm-col-12">
                      <Label>Product Name</Label>
                      <Input onChange={(e) => this.changeHandler(e)} type="text" name="productName" placeholder="Enter Product Name" />
                    </div>
                    <div className="col-xl-3 col-md-4 col-sm-4 sm-col-12">
                      <Label>Price</Label>
                      <Input onChange={(e) => this.changeHandler(e)} type="number" name="price" placeholder="Enter Price" />
                    </div>
                    <div className="col-xl-3 col-md-4 col-sm-4 sm-col-12">
                      <Label>Store</Label>
                      <select onChange={e => this.changeHandler(e)} name="storeN" className="form-control">
                        <option>Select Store</option>
                        <option>Out of all</option>
                        {
                          this.state.store.map(el => {
                            return (
                              <option value={el.name} > {el.name} </option>
                            )
                          })
                        }
                      </select>
                    </div>

                    <div className="col-xl-3 col-md-4 col-sm-4 sm-col-12">
                      <Label>Store</Label>
                      <select onChange={e => this.changeHandler(e)} name="category" className="form-control">
                        <option>Select Category</option>
                        <option>Out of all</option>
                        {
                          this.state.categorys.map(el => {
                            return (
                              <option value={el.name} > {el.name} </option>
                            )
                          })
                        }
                      </select>
                    </div>
                    <div className="col-xl-6 col-md-4 col-sm-4 sm-col-12">
                      <FormGroup>
                        <Label>Comment</Label>
                        <Input
                          onChange={e => this.changeHandler(e)}
                          name='description'
                          placeholder="Enter Short Description "
                          rows="4"
                          type="textarea"
                        />
                      </FormGroup>
                    </div>
                  </div>
                  {
                    this.state.date && this.state.category && this.state.customerName && this.state.price && this.state.storeN && this.state.description && this.state.productName ?
                      <Button value={this.state.storeName} onClick={e => { this.submitHandler(e) }} color="info" size="sm" className="mt-3" ><span style={{ fontWeight: '300' }}>Create Transection</span> </Button>
                      : <p className="text-danger text-center">Please Enter All required Information</p>
                  }
                </CardBody>
              </Card>
            </Col>
            <Col xs="12">
              <Card className="card-chart p-4">
                <CardHeader>
                  <Row>
                    <Col className="" >
                      <CardTitle tag="h2">Store </CardTitle>
                      <hr />
                    </Col>
                  </Row>
                </CardHeader>
                <CardBody>
                  <div className="col-md-6 offset-md-3">
                    <div className="col-md-8 offset-md-2">
                      <div className="d-flex">
                        <Input placeholder="Enter Store Name" onChange={e => this.changeHandler(e)} name="storeName" />
                        {
                          this.state.storeName ?
                            <Button className="btn-warning ml-5" size="sm" onClick={e => this.createStore()}>Add</Button> : ''
                        }
                      </div>
                      <Table id="emp" className="tablesorter" responsive>
                        <thead className="text-primary">
                          <tr>
                            <th>Name</th>
                            <th className="text-right">Action</th>
                          </tr>
                        </thead>
                        <tbody id="table-holder">
                          {
                            this.state.store.map(el => {
                              return (
                                <tr>
                                  <td>{el.name}</td>
                                  <td className="text-right"><Button color="danger" size="sm" onClick={() => this.deleteStore(el._id)} className="btn-danger">Delete</Button></td>
                                </tr>
                              )
                            })
                          }
                        </tbody>
                      </Table>
                    </div>
                  </div>
                </CardBody>
              </Card>
            </Col>

            <Col xs="12">
              <Card className="card-chart p-4">
                <CardHeader>
                  <Row>
                    <Col className="" >
                      <CardTitle tag="h2">Category </CardTitle>
                      <hr />
                    </Col>
                  </Row>
                </CardHeader>
                <CardBody>
                  <div className="col-md-6 offset-md-3">
                    <div className="col-md-8 offset-md-2">
                      <div className="d-flex">
                        <Input placeholder="Enter Category Name" onChange={e => this.changeHandler(e)} name="categoryName" />
                        {
                          this.state.categoryName ?
                            <Button className="btn-warning ml-5" size="sm" onClick={e => this.createCategory()}>Add </Button> : ''
                        }
                      </div>
                      <Table id="emp" className="tablesorter" responsive>
                        <thead className="text-primary">
                          <tr>
                            <th>Name</th>
                            <th className="text-right">Action</th>
                          </tr>
                        </thead>
                        <tbody id="table-holder">
                          {
                            this.state.categorys.map(el => {
                              return (
                                <tr>
                                  <td>{el.name}</td>
                                  <td className="text-right"><Button color="danger" size="sm" onClick={() => this.deleteCategory(el._id)} className="btn-danger">Delete</Button></td>
                                </tr>
                              )
                            })
                          }
                        </tbody>
                      </Table>
                    </div>
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </div>
      </>
    );
  }
}
export default ImportData;
