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
  Button
} from "reactstrap";
import ProductCreateModal from "./ProductCreateModal";
import ProductUpdateModal from "./ProductUpdateModal";

class ProductManagement extends React.Component {
  state = {
    allProduct: [],
    file:{}
  }
  delete = (id) => {

    let permission = window.confirm('Are you sure to do delete this  ? ')
    if (permission) {
      Axios.delete(`/deleteProduct/${id}`)
        .then(res => {
          this.getAll()
        })
        .catch(err => {
          return console.log(err);
        })
    } else {
      console.log('Deny');
    }
  }
  getAll = () => {
    Axios.get('/getAllProduct')
      .then(res => {
        console.log(res.data.length);
        this.setState({
          allProduct: res.data
        })
      })
      .catch(err => {
        return console.log(err);
      })
  }
  componentDidMount() {
    this.getAll()
  }
  changeHandler(e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }
  filechangeHandler(event){
    let permission = window.confirm('Are you sure to Upload Product from  this XLSX ? ')
    if(permission){
      let  data=new FormData 
      data.append('file',event.target.files[0])
      Axios.post('/upload-product',data)
      .then(res=>{
        this.getAll()
      })
      .catch(err=>{
        console.log(err);
      })
    }else{
      
    }

  }
  render() {
    return (
      <>
        <div className="content">
          <Row>
            <Col md="12">
              <Card className="p-4">
                <CardHeader>
                  <CardTitle tag="h2">All  Product   ({this.state.allProduct.length}) </CardTitle>
                  <div className="d-flex">
                    <Button size="sm" onClick={e => document.getElementById('selectXlsx').click()}>Upload  From Xls</Button>
                    <ReactHTMLTableToExcel
                      className="btn btn-danger btn-sm mr-3 ml-3"
                      table="emp"
                      filename="ReportExcel"
                      sheet="Sheet"
                      buttonText="Download as XLS" />
                    <ProductCreateModal getAll={this.getAll} />
                    <input onChange={event=>this.filechangeHandler(event)} style={{ display: 'none' }} type="file" accept=".xls,.xlsx" id="selectXlsx" />
                  </div>
                </CardHeader>
                <CardBody>
                  <div className="table-full-width table-responsive">
                    <Table id="emp" className="tablesorter" responsive>
                      <thead className="text-primary">
                        <tr>
                          <th>Product Code</th>
                          <th>Description</th>
                          <th>Product Group Code</th>
                          <th>MOQ</th>
                          <th>Status </th>
                          <th>Catalog Code</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody id="table-holder">
                        {console.log(this.state.allProduct)}
                        {
                          this.state.allProduct.map(el => {
                            return (
                              <tr>
                                <td>{el.productCode}</td>
                                <td>{el.description}</td>
                                <td>{el.productGroupCode}</td>
                                <td>{el.MOQ}</td>
                                <td>{el.status}</td>
                                <td>{el.catalogCode}</td>
                                <td > <i onClick={e => this.delete(el._id)} style={{ cursor: 'pointer' }} className="tim-icons icon-trash-simple" ></i> <ProductUpdateModal productInfo={el} getAll={this.getAll} /> </td>
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
export default ProductManagement;
