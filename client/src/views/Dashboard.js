import React from "react";
import Pdf from "react-to-pdf"
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Table,
  Row,
  Col,
} from "reactstrap";

// core components
import Axios from "axios";
import { CurrentPriceChart } from "variables/CurrentPriceChart";
import ReactHTMLTableToExcel from 'react-html-table-to-excel';



const options = {
  unit: "in",
  format: [1500, window.screen.width]
};

const ref = React.createRef()
class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      alltransection: [],
      bigChartData: "data1",
      thisMonthTransection: [[]],
    };
  }
  setBgChartData = name => {
    this.setState({
      bigChartData: name
    });
  };
  componentDidMount() {
    Axios.get('/getall')
      .then(res => {
        this.setState({
          alltransection: res.data
        })
      })
      .catch(err => {
        console.log(err);
      })

  }

  printC1(toPdf) {
    let st = document.getElementById('tbRow')
    st.style.display = 'none'
    toPdf()
    st.style.display = 'block'

  }

  render() {
    return (
      <>
        <div className="content"   >
          <Row>
            <img style={{ width: '100%' }} src={require('../assets/business/business.jpg')} />
          </Row>
        </div>
      </>
    );
  }
}

export default Dashboard;
