import React, { Component } from 'react'
import Signup from "views/Signup";
import Login from "views/Login";
import { createBrowserHistory } from "history";
import { Router, Route, Switch, Redirect } from "react-router-dom";
import AdminLayout from "layouts/Admin/Admin.js";
import decoder from 'jwt-decode'
import "assets/scss/black-dashboard-react.scss";
import "assets/demo/demo.css";
import "assets/css/nucleo-icons.css";
import './update.css'
const hist = createBrowserHistory();
class App extends Component {
    state = {
        user: {}
    }
    componentDidMount() {
        let token = window.localStorage.getItem('load-token')
        if (token) {
            let userData = decoder(token)
            this.setState({
                user: userData
            })
        }
    }

    render() {
        return (
            <Router history={hist}>
                <Switch>
                    <Route path="/admin" render={props => <AdminLayout {...props} />} />
                    <Route path='/signup' component={Signup} />
                    <Route path='/login' component={Login} />
                    <Redirect from="/" to={this.state.user.name ? "/admin/dashboard" : '/login'} />
                </Switch>
            </Router>
        )
    }
}
export default App