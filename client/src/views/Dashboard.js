import React from "react";
import classNames from "classnames";
import { Line, Bar } from "react-chartjs-2";
import Pdf from "react-to-pdf"
import {
  Button,
  ButtonGroup,
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  Label,
  FormGroup,
  Input,
  Table,
  Row,
  Col,
  UncontrolledTooltip
} from "reactstrap";

// core components
import SalesChart from "variables/SalesChart";
import BudgetChart from "variables/BudgetChart";
import CurrentPriceChart from "variables/CurrentPriceChart";
import PriceChangeChart from "variables/PriceChangeChart";
import { connect } from "react-redux";
import Axios from "axios";



const options = {
  unit: "in",
  format: [1500, window.screen.width]
};

const ref = React.createRef()
class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      bigChartData: "data1",
      thisMonthTransection: [[]]
    };
  }
  setBgChartData = name => {
    this.setState({
      bigChartData: name
    });
  };
  componentDidMount() {
    Axios.get('/thismonthtransection')
      .then(res => {
        this.setState({ thisMonthTransection: res.data })
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
            <img style={{width:'100%'}} src={require('../assets/business/business.jpg')} />
          </Row>
        </div>
      </>
    );
  }
}

const mapStateToProps = state => ({
  transection: state.transection,
})

export default connect(mapStateToProps)(Dashboard);
