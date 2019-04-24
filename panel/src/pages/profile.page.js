import React, { Component } from 'react';
// import {Link} from 'react-router-dom';
import { Tab, Row, Col, Nav, Button } from 'react-bootstrap';
import {AddNewArticle, MyArticle, AllArticle, EditProfile} from '../component';
import axios from 'axios';

class ProfilePage extends Component {

    state = {
        profile: []
    }

    logout = () => {
        localStorage.removeItem('loginData');
        window.location = "/";
    }

    componentDidMount() {
        axios.get(`//localhost:3000/myprofile`)
            .then(res => {
                const profile = res.data;
                this.setState({ profile });
            })
    }

    render() {
        return (
                <Tab.Container id="left-tabs-example" defaultActiveKey="first" >
                    <Row className="main">                        
                        
                        <Col sm={3} className="App-header right">
                            <p className="mb-5" style={{fontSize: '20px'}}>
                                خوش آمدید<br/> <span style={{color: 'teal'}}>{this.state.profile.map(profile => profile.firstname +" "+ profile.lastname)}</span> 
                            </p>

                            <Nav fill variant="warning" className="flex-column mb-5">
                                <Nav.Item>
                                    <Nav.Link className="btn" eventKey="first">همه مقاله ها</Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link className="btn" eventKey="second">مقاله های من</Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link className="btn" eventKey="third">ایجاد مقاله جدید</Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link className="btn" eventKey="fourth">ویرایش پروفایل</Nav.Link>
                                </Nav.Item>
                            </Nav>
                            <Button variant="danger mt-4" style={{ color: 'white', paddingLeft:"35px" , paddingRight:"35px" , borderRadius:"20px"}} onClick={this.logout}>خروج</Button>
                        </Col>

                        <Col sm={9} className="left">
                            <Tab.Content>
                                <Tab.Pane eventKey="first">

                                    <AllArticle/>

                                </Tab.Pane>
                                <Tab.Pane eventKey="second">

                                    <MyArticle/>

                                </Tab.Pane>
                                <Tab.Pane eventKey="third">

                                    <AddNewArticle/>

                                </Tab.Pane>
                                <Tab.Pane eventKey="fourth">

                                    <EditProfile/>

                                </Tab.Pane>
                            </Tab.Content>
                        </Col>
                    </Row>
                </Tab.Container>


            

        )
    }
}

export { ProfilePage }