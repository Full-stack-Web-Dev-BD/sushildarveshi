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
  Col
} from "reactstrap";
import CatalogCreateModal from "./CatalogCreateModal";
import ProductGroupCreateModal from "./ProductGroupCreateModal";
import ProductUpdateModal from "./ProductUpdateModal";

class CatalogAndProductGroup extends React.Component {
  state = {
    allCatalog: [],
    allProductGroup: []
  }
  getAll = () => {
    Axios.get('/getAllProductCatalog')
      .then(res => {
        this.setState({
          allCatalog: res.data
        })
      })
      .catch(err => {
        return console.log(err);
      })
      
    Axios.get('/getAllProductGroup')
    .then(res => {
      this.setState({
        allProductGroup: res.data
      })
    })
    .catch(err => {
      return console.log(err);
    })
  }


  deleteCatalog = (id) => {
    let permission = window.confirm('Are you sure to do delete this  ? ')
    if (permission) {
      Axios.delete(`/deleteProductCatalog/${id}`)
        .then(res => {
          this.setState({
            allCatalog:res.data.catalog
          })
        })
        .catch(err => {
          return console.log(err);
        })
    } else {
      console.log('Deny');
    }
  }
  
  deleteCatalog = (id) => {
    let permission = window.confirm('Are you sure to do delete this  ? ')
    if (permission) {
      Axios.delete(`/deleteProductGroup/${id}`)
        .then(res => {
          this.setState({
            allProductGroup:res.data.productGroup
          })
        })
        .catch(err => {
          return console.log(err);
        })
    } else {
      console.log('Deny');
    }
  }
  componentDidMount() {
    this.getAll()
  }
  changeHandler(e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }
  render() {
    return (
      <>
        <div className="content">
          <Row>
            <Col md="6">
              <Card className="p-4">
                <CardHeader>
                  <CardTitle tag="h2">All Catalog   ({this.state.allCatalog.length}) </CardTitle>
                  <div className="d-flex">
                    <ReactHTMLTableToExcel
                      className="btn btn-danger btn-sm mr-3"
                      table="catalog"
                      filename="ReportExcel"
                      sheet="Sheet"
                      buttonText="Download as XLS" />
                      <CatalogCreateModal getAll={this.getAll} />
                  </div>
                </CardHeader>
                <CardBody>
                  <div className="table-full-width table-responsive">
                    <Table id="catalog" className="tablesorter" responsive>
                      <thead className="text-primary">
                        <tr>
                          <th>Catalog Code</th>
                          <th>Description</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody id="table-holder">
                        {
                          this.state.allCatalog.map(el => {
                            return (
                              <tr>
                                <td>{el.catalogName}</td>
                                <td>{el.description?el.description:'N/A'}</td>
                                <td ><i onClick={e => this.deleteCatalog(el.catalogName)} style={{ cursor: 'pointer' }} className="tim-icons icon-trash-simple" ></i> </td>
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
            
            <Col md="6">
              <Card className="p-4">
                <CardHeader>
                  <CardTitle tag="h2">All Product Group   ({this.state.allProductGroup.length}) </CardTitle>
                  <div className="d-flex">
                    <ReactHTMLTableToExcel
                      className="btn btn-danger btn-sm mr-3"
                      table="productGroup"
                      filename="ReportExcel"
                      sheet="Sheet"
                      buttonText="Download as XLS" />
                      <ProductGroupCreateModal getAll={this.getAll} />
                  </div>
                </CardHeader>
                <CardBody>
                  <div className="table-full-width table-responsive">
                    <Table id="productGroup" className="tablesorter" responsive>
                      <thead className="text-primary">
                        <tr>
                          <th>Product Group Code</th>
                          <th>Description</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody id="table-holder">
                        {
                          this.state.allProductGroup.map(el => {
                            return (
                              <tr>
                                <td>{el.groupName}</td>
                                <td>{el.description?el.description:'N/A'}</td>
                                <td ><i onClick={e => this.deleteCatalog(el.groupName)} style={{ cursor: 'pointer' }} className="tim-icons icon-trash-simple" ></i> </td>
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
export default CatalogAndProductGroup;
