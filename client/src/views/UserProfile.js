import React from "react";
// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardText,
  FormGroup,
  Form,
  Input,
  Row,
  Col
} from "reactstrap";
import Axios from "axios";
import decoder from 'jwt-decode'
class UserProfile extends React.Component {

  state = {
    file: {},
    status: 'Upload A Profile Picture',
    name: '',
    email: '',
    newPassword: '',
    currentPassword: '',
    aboutMe: '',
    user: {},
    error: {},
    addLocationShow: false,

    street: '',
    number: '',
    neighborhood: '',
    country: '',

    userLocation: {},
    locationEditor: false
  }


  componentDidMount() {
    let token = window.localStorage.getItem('load-token')
    if (token) {
      let userData = decoder(token)
      Axios.get(`/single-user/${userData._id}`)
        .then(res => {
          this.setState({
            user: res.data
          })
        })
        .catch(err => {
          return console.log(err);
        })
      Axios.post(`/getSingleLocation`, { id: userData._id })
        .then(res => {
          console.log(res.data);
          if (!res.data) {
            return this.setState({
              userLocation: {}
            })
          }
          this.setState({
            userLocation: res.data
          })
        })
        .catch(err => {
          console.log(err);
        })
    }
  }

  changeHandler(e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }
  updateProfile(e) {
    e.preventDefault()
    let user = this.state.user
    if (user.google) {
      return this.setPassword(e)
    }
    let { name, email, currentPassword, newPassword, aboutMe } = this.state
    let obj = {
      name: name ? name : user.name,
      email: email ? email : user.email,
      aboutMe: aboutMe ? aboutMe : user.aboutMe,
      uid: user._id,
      currentPassword,
      newPassword
    }


    Axios.post('/updateProfile', obj)
      .then(res => {
        setTimeout(() => {
          this.setState({
            error: {}
          })
        }, 3000);
        this.setState({
          user: res.data.user,
          error: {
            type: 'success',
            message: res.data.message
          }
        })
      })
      .catch(err => {
        this.setState({
          error: {}
        })
        if (err.response) {
          this.setState({
            error: {
              type: 'error',
              message: err.response.data.message
            }
          })
        }
      })
  }


  setPassword(e) {
    let { name, email, currentPassword, newPassword, aboutMe } = this.state
    e.preventDefault()
    let user = this.state.user
    let obj = {
      name: name ? name : user.name,
      email: email ? email : user.email,
      aboutMe: aboutMe ? aboutMe : user.aboutMe,
      uid: user._id,
      currentPassword,
      newPassword
    }
    Axios.post('/setpassword-google', obj)
      .then(res => {
        window.location.reload()
      })
      .catch(err => {
        console.log(err);
      })
  }
  editLocation() {
    this.setState({
      locationEditor: true
    })
  }

  fileChangeHandler(e) {
    this.setState({ status: "Uploading..." })
    const fData = new FormData()
    fData.append('file', e.target.files[0])
    fData.append('uid', this.state.user._id)

    Axios.post('/uploadpp', fData)
      .then(res => {
        this.setState({
          user: res.data
        })
      })
      .catch(err => {
        console.log(err.response.data);
        alert('err')
      })
  }
  addLocationOn() {
    this.setState({
      addLocationShow: true
    })
  }
  locationSubmitHandler(e) {
    e.preventDefault()
    Axios.post('/addLocation', {
      uid: this.state.user._id,
      street: this.state.street,
      number: this.state.number,
      neighborhood: this.state.neighborhood,
      country: this.state.country
    })
      .then(res => {
        window.location.reload()
      })
      .catch(err => {
        console.log(err);
      })
  }
  updateLocation(e) {
    e.preventDefault()
    Axios.post('/updateLocation', {
      id: this.state.userLocation._id,
      uid: this.state.user._id,
      street: this.state.street,
      number: this.state.number,
      neighborhood: this.state.neighborhood,
      country: this.state.country
    })
      .then(res => {
        window.location.reload()
      })
      .catch(err => {
        console.log(err);
      })
  }
  render() {
    let user = this.state.user
    return (
      <>
        <div className="content">
          <Row>
            <Col md="8">
              <Card className="p-4">
                <CardHeader>
                  <h2 className="title">Edit Profile</h2>
                </CardHeader>
                <CardBody>
                  {
                    this.state.error.message ?
                      <p className={this.state.error.type === "error" ? "text-danger text-bold " : "text-bold text-success"}> <b> {this.state.error.message}</b> </p> : ''
                  }
                  {
                    this.state.user.google ?
                      <p className="text-danger text-bold text-center mb-4 "> <b> It seems you logged in with Google/Facebook Please Create a password with your gmail for login in  next time  </b> </p> : ''
                  }
                  <Form >
                    <Row>
                      <Col className="pr-md-1" md="6">
                        <FormGroup>
                          <label> Name</label>
                          <Input
                            onChange={e => this.changeHandler(e)}
                            name='name'
                            defaultValue={user.name}
                            placeholder="Type Your Name"
                            type="text"
                          />
                        </FormGroup>
                      </Col>
                      <Col className="pl-md-1" md="6">
                        <FormGroup>
                          <label>Email</label>
                          <Input
                            onChange={e => this.changeHandler(e)}
                            name='email'
                            defaultValue={user.email}
                            placeholder="Your Email"
                            type="email"
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    {
                      user.google == true || user.facebook == true ?

                        <Col className="pl-md-1" md="6">
                          <FormGroup>
                            <label>New Password</label>
                            <Input
                              onChange={e => this.changeHandler(e)}
                              name='newPassword'
                              placeholder="New Password"
                              type="password"
                            />
                          </FormGroup>
                        </Col> :

                        <Row>
                          <Col className="pr-md-1" md="6">
                            <FormGroup>
                              <label> Curent Password</label>
                              <Input
                                onChange={e => this.changeHandler(e)}
                                name='currentPassword'
                                placeholder="Current Password"
                                type="password"
                              />
                            </FormGroup>
                          </Col>
                          <Col className="pl-md-1" md="6">
                            <FormGroup>
                              <label>New Password</label>
                              <Input
                                onChange={e => this.changeHandler(e)}
                                name='newPassword'
                                placeholder="New Password"
                                type="password"
                              />
                            </FormGroup>
                          </Col>
                        </Row>
                    }
                    <Row>
                      <Col md="12">
                        <FormGroup>
                          <label>About Me</label>
                          <Input
                            onChange={e => this.changeHandler(e)}
                            name='aboutMe'
                            id="aboutMe"
                            defaultValue={user.aboutMe}
                            placeholder="Here can be your description"
                            rows="4"
                            type="textarea"
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                  </Form>
                </CardBody>
                <CardFooter>
                  <Button className="btn-fill" size="sm" color="primary" onClick={e => this.updateProfile(e)} >Update</Button>
                </CardFooter>
              </Card>
            </Col>
            <Col md="4">
              <Card className="card-user">
                <CardBody>
                  <CardText />
                  <div className="author">
                    <div className="block block-one" />
                    <div className="block block-two" />
                    <div className="block block-three" />
                    <div className="block block-four" />
                    <div>
                      {
                        user.pp ?
                          <div>
                            <a href="#pablo" onClick={e => e.preventDefault()}>
                              <img
                                alt="..."
                                className="avatar"
                                src={`/uploads/${user.pp}`}
                              />
                            </a>
                            <br />
                            <a href="#pablo" onClick={e => document.getElementById('upp').click()}>Update Profile Picture</a>
                            <input accept="image/x-png, image/gif, image/jpeg" onChange={e => this.fileChangeHandler(e)} type="file" style={{ display: 'none' }} id="upp" />
                          </div>
                          :
                          <div>
                            <a href="#pablo" onClick={e => document.getElementById('upp').click()}>
                              <img
                                alt="..."
                                className="avatar"
                                src="/default/c.png"
                              />
                              <h5 className="title">{this.state.status}</h5>
                            </a>
                            <input accept="image/x-png, image/gif, image/jpeg" onChange={e => this.fileChangeHandler(e)} type="file" style={{ display: 'none' }} id="upp" />
                          </div>
                      }
                    </div>
                    <p className="description text-capitalize"> {user.name} </p>
                  </div>
                  <div className="card-description">
                    {
                      user.aboutMe ?
                        <p className="text-center"> <strong>About me : </strong> {user.aboutMe}</p> :
                        <div className="text-center">
                          <Button onClick={e => { document.getElementById('aboutMe').focus() }} className="btn-fill" size="sm" color="primary" type="submit">Add Yourself</Button>
                        </div>
                    }
                    {
                      Object.keys(this.state.userLocation).length > 0 ?
                        <div className="text-center">
                          <p className="text-center"> Street: {this.state.userLocation.street}  </p>
                          <p className="text-center"> Number: {this.state.userLocation.number}  </p>
                          <p className="text-center"> Neighborhood: {this.state.userLocation.neighborhood}  </p>
                          <p className="text-center"> Country: {this.state.userLocation.country}  </p>
                          <Button className="btn-secondary" onClick={e => this.editLocation()} size="sm">Edit </Button>
                        </div>
                        : ''
                    }
                  </div>
                </CardBody>
                <CardFooter>
                  {
                    Object.keys(this.state.userLocation).length > 0 ? '' :
                      <div className="button-container text-center">
                        <Button className="btn-danger" size="sm" onClick={e => this.addLocationOn()}>Add Location</Button>
                      </div>
                  }
                </CardFooter>
              </Card>
            </Col>
          </Row>
          {
            this.state.addLocationShow ?
              <div className="row">
                <div className="col-md-6 offset-md-3">
                  <Card className="p-4">
                    <CardHeader>
                      <h2 className="title">Add Location</h2>
                    </CardHeader>
                    <CardBody>
                      <Form onSubmit={e => this.locationSubmitHandler(e)} >
                        <Row>
                          <Col className="pr-md-1" md="6">
                            <FormGroup>
                              <label> Street</label>
                              <Input
                                onChange={e => this.changeHandler(e)}
                                id="addLocation"
                                name='street'
                                placeholder="Street"
                                type="text"
                                required
                              />
                            </FormGroup>
                          </Col>
                          <Col className="pl-md-1" md="6">
                            <FormGroup>
                              <label>Number</label>
                              <Input
                                onChange={e => this.changeHandler(e)}
                                name='number'
                                placeholder="Number"
                                type="number"
                                required
                              />
                            </FormGroup>
                          </Col>
                        </Row>
                        <Row>
                          <Col md="6">
                            <FormGroup>
                              <label>Neighborhood</label>
                              <Input
                                onChange={e => this.changeHandler(e)}
                                name='neighborhood'
                                placeholder="Neighborhood"
                                type="text"
                                required
                              />
                            </FormGroup>
                          </Col>
                          <Col md="6">
                            <FormGroup>
                              <label>Country</label>
                              <Input
                                onChange={e => this.changeHandler(e)}
                                name='country'
                                placeholder="Country"
                                type="text"
                                required
                              />
                            </FormGroup>
                          </Col>
                        </Row>
                        <Button className="btn-fill" type="submit" size="sm" color="primary" >Add</Button>
                      </Form>
                    </CardBody>
                  </Card>
                </div>
              </div> : ''
          }

          {
            this.state.locationEditor ?
              <div className="row">
                <div className="col-md-6 offset-md-3">
                  <Card className="p-4">
                    <CardHeader>
                      <h2 className="title">Update Location</h2>
                    </CardHeader>
                    <CardBody>
                      <Form onSubmit={e => this.updateLocation(e)} >
                        <Row>
                          <Col className="pr-md-1" md="6">
                            <FormGroup>
                              <label> Street</label>
                              <Input
                                onChange={e => this.changeHandler(e)}
                                id="addLocation"
                                name='street'
                                placeholder="Street"
                                type="text"
                                required
                              />
                            </FormGroup>
                          </Col>
                          <Col className="pl-md-1" md="6">
                            <FormGroup>
                              <label>Number</label>
                              <Input
                                onChange={e => this.changeHandler(e)}
                                name='number'
                                placeholder="Number"
                                type="number"
                                required
                              />
                            </FormGroup>
                          </Col>
                        </Row>
                        <Row>
                          <Col md="6">
                            <FormGroup>
                              <label>Neighborhood</label>
                              <Input
                                onChange={e => this.changeHandler(e)}
                                name='neighborhood'
                                placeholder="Neighborhood"
                                type="text"
                                required
                              />
                            </FormGroup>
                          </Col>
                          <Col md="6">
                            <FormGroup>
                              <label>Country</label>
                              <Input
                                onChange={e => this.changeHandler(e)}
                                name='country'
                                placeholder="Country"
                                type="text"
                                required
                              />
                            </FormGroup>
                          </Col>
                        </Row>
                        <Button className="btn-fill" type="submit" size="sm" color="primary" >Update</Button>
                      </Form>
                    </CardBody>
                  </Card>
                </div>
              </div> : ''
          }
        </div>
      </>
    );
  }
}
export default UserProfile