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

class Users extends React.Component {
  state = {
    users: [],
  }
  componentDidMount() {
    Axios.get('/users')
      .then(res => {
        console.log(res.data);
        this.setState({
          users: res.data.users
        })
      })
      .catch(err => {
        return console.log(err);
      })
  }
  toggleAccess(id){
    Axios.post('/toggle',{id:id})
    .then(updated=>{
      console.log(updated);
      this.componentDidMount()
    })
    .catch(err=>{
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
                  <CardTitle tag="h2">All  Users   ({this.state.users.length}) </CardTitle>
                  <ReactHTMLTableToExcel
                    className="btn btn-danger btn-sm "
                    table="emp"
                    filename="ReportExcel"
                    sheet="Sheet"
                    buttonText="Download List as XLS" />
                </CardHeader>
                <CardBody>
                  <div className="table-full-width table-responsive">
                    <Table id="emp" className="tablesorter" responsive>
                      <thead className="text-primary">
                        <tr>
                          <th>Name </th>
                          <th>Email</th>
                          <th>Type</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody id="table-holder">
                        {
                          this.state.users.map(el => {
                            return (
                              <tr>
                                <td> {el.name} </td>
                                <td> {el.email} </td>
                                <td> {el.type} </td>
                                <td><Button className={el.access?"btn-danger":"btn-success"} size="sm" onClick={() => this.toggleAccess(el._id)} >{el.access?" Block":"Unblock"}</Button></td>
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
export default Users;
