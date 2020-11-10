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
import ProductCreateModal from "./ProductCreateModal";
import ProductUpdateModal from "./ProductUpdateModal";

class TaskManagement extends React.Component {
  state = {
    allProduct: []
  }
  componentDidMount() {
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
            <Col md="12">
              <Card className="p-4">
                <CardHeader>
                  <CardTitle tag="h2">All  Product   ({this.state.allProduct.length}) </CardTitle>
                  <div className="d-flex">
                    <ReactHTMLTableToExcel
                      className="btn btn-danger btn-sm mr-3"
                      table="emp"
                      filename="ReportExcel"
                      sheet="Sheet"
                      buttonText="Download as XLS" />
                    <ProductCreateModal />
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
                                <td > <i style={{cursor:'pointer'}} className="tim-icons icon-trash-simple" ></i> <ProductUpdateModal/> </td>
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
export default TaskManagement;
