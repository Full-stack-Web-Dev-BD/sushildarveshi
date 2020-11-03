import Axios from "axios";
import React from "react";
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
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
  Input
} from "reactstrap";

class Tables extends React.Component {
  state = {
    date: '',
    customerName: "",
    productName: "",
    price: '',
    description: '',
    allData: [],
    activeEditor: false,
    id: ''
  }
  componentDidMount() {
    Axios.get('/getall')
      .then(res => {
        console.log(res.data);
        this.setState({
          allData: res.data
        })
      })
      .catch(err => {
        return console.log(err);
      })
  }
  activeEdit(el) {
    this.setState({
      date: el.date,
      customerName: el.customerName,
      productName: el.productName,
      price: el.price,
      description: el.description,
      activeEditor: true,
      id: el._id
    })
  }

  changeHandler(e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }
  deActiveEditor() {
    this.setState({
      date: '',
      customerName: "",
      productName: "",
      price: '',
      description: '',
      allData: [],
      activeEditor: false,
      id: ''
    })
  }
  submitHandler(e) {
    e.preventDefault()
    Axios.post('/update', this.state)
      .then(res => {
        window.location.reload()
      })
      .catch(err => {
        console.log(err);
      })
  }
  deleteTransection(id) {
    Axios.post('/delete', { id: id })
      .then(res => {
        window.location.reload()
      })
      .catch(err => {
        console.log(err);
      })
  }
  render() {
    return (
      <>
        <div className="content">
          <Row>
            <Col md="12">
              <Card className="p-4">
                <CardHeader>
                  <CardTitle tag="h2">All  Data   ({this.state.allData.length}) </CardTitle>
                  <ReactHTMLTableToExcel
                    className="btn btn-danger btn-sm "
                    table="emp"
                    filename="ReportExcel"
                    sheet="Sheet"
                    buttonText="Download as XLS" />
                </CardHeader>

                <CardBody>
                  <div className="table-full-width table-responsive">
                    <Table id="emp" className="tablesorter" responsive>
                      <thead className="text-primary">
                        <tr>
                          <th>Date</th>
                          <th>Customer Name</th>
                          <th>Product Name</th>
                          <th>Price</th>
                          <th>Comment</th>
                          <th>Store</th>
                          <th>Category </th>
                          <th>Edit </th>
                          <th>Delete</th>
                        </tr>
                      </thead>
                      <tbody id="table-holder">
                        {
                          this.state.activeEditor ?
                            <tr>
                              <td><Input onChange={e => this.changeHandler(e)} onClick={e => console.log(this.state)} value={this.state.date.split('T')[0]} placeholder="Select Date" type="date" name="date" /></td>
                              <td><Input onChange={e => this.changeHandler(e)} id="focusOn" value={this.state.customerName} placeholder="Customer Name" type="text" name="customerName" /></td>
                              <td><Input onChange={e => this.changeHandler(e)} value={this.state.productName} placeholder="Product Name" type="text" name="productName" /></td>
                              <td><Input onChange={e => this.changeHandler(e)} value={this.state.price} placeholder="Price" type="number" name="price" /></td>
                              <td><Input onChange={e => this.changeHandler(e)} value={this.state.description} placeholder="Comment" type="text" name="description" /></td>
                              <td></td>
                              <td></td>
                              <td><Button color="success" size="sm" className="btn-success" onClick={e => this.deActiveEditor()}>Cancel</Button></td>
                              <td><Button color="danger" size="sm" className="btn-danger" onClick={e => this.submitHandler(e)} >Submit</Button></td>
                            </tr> : ''
                        }
                        {
                          this.state.allData.map(el => {
                            return (
                              <tr>
                                <td>{el.date.split('T')[0]}</td>
                                <td>{el.customerName}</td>
                                <td>{el.productName}</td>
                                <td>{el.price}</td>
                                <td>{el.description}</td>
                                <td>{el.store}</td>
                                <td>{el.category}</td>
                                <td><Button color="warning" size="sm" onClick={e => this.activeEdit(el)} className="btn-warning">Edit</Button></td>
                                <td><Button color="danger" size="sm" onClick={() => this.deleteTransection(el._id)} className="btn-danger">Delete</Button></td>
                              </tr>
                            )
                          })
                        }
                      </tbody>
                    </Table>
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
export default Tables;
