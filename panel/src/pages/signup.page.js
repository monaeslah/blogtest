import React, { Component } from 'react';
import Axios from 'axios';
// import {SignIn} from '../Components';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
// import ImageUploader from 'react-images-upload';

class SignUpPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            error: null,
            pictures: []
        };
    }

    onSubmit = (event) => {
        event.preventDefault();
        const data = {
            firstname: event.target["firstname"].value,
            lastname: event.target["lastname"].value,
            username: event.target["username"].value,
            password: event.target["password"].value,
            phone: event.target["phone"].value,
            sex: event.target["sex"].value,
            FCM: '1'
        }
        Axios.post('//localhost:3000/signup', data)
            .then(response => {
                if (response.data.success) {
                    window.location = '/panel/login';
                } else {
                    this.setState({ error: true })
                }
            })
        console.log(data)
    }


    onChange = ({ target: { name, value } }) => {
        this.setState({ [name]: value })
    }

    
    render() {
        const { error } = this.state;
        return (
            <div className="App-header">
                <Container>
                    <Row>
                        <Col md={{ span: 4, offset: 4 }}>
                            <h3 style={{ marginTop: 35, marginBottom: 35 }}>ثبت نام کاربر</h3>
                            <Form onSubmit={this.onSubmit}>
                                <Form.Group controlId="formGroupFirstname" >
                                    <Form.Control name="firstname" type="text" style={{textAlign:"right" }} placeholder="نام" />
                                </Form.Group>
                                <Form.Group controlId="formGroupLastname">
                                    <Form.Control name="lastname" type="text" style={{textAlign:"right" }} placeholder="نام خانوادگی" />
                                </Form.Group>
                                <Form.Group controlId="formGroupUsername">
                                    <Form.Control name="username" type="text" style={{textAlign:"right" }} placeholder="نام کاربری" />
                                </Form.Group>
                                <Form.Group controlId="formGroupPassword">
                                    <Form.Control name="password" type="password" style={{textAlign:"right" }} placeholder="رمز عبور" />
                                </Form.Group>

                                <Form.Group controlId="exampleForm.ControlSelect1">
                                    <Form.Control name="sex" type="text" as="select" style={{textAlign:"right"}}>
                                        <option style={{textAlign:"right",direction:"rtl"}}>مرد</option>
                                        <option style={{textAlign:"right",direction:"rtl" }}>زن</option>
                                    </Form.Control>
                                </Form.Group>

                                <Form.Group controlId="formGroupPhone">
                                    <Form.Control name="phone" type="text" style={{textAlign:"right" }} placeholder="تلفن" />
                                </Form.Group>

                               
                                <Button style={{ backgroundColor: 'teal', borderColor: 'teal', color: 'white',borderRadius:"20px",paddingRight:"35px",paddingLeft:"35px" }} type="submit">
                                    ثبت نام
                                </Button>

                            </Form>
                            <p style={{ fontSize: 16, marginTop: 20 }}>قبلا ثبت نام کرده اید؟<a href="/panel/login" style={{ color: 'teal', marginRight:"10px" }}>وارد شوید</a></p>
                            <p style={{ fontSize: 16, marginTop: 20 }}><a href="/" style={{ color: 'white' }}>صفحه اصلی</a></p>
                            {error && <p style={{ color: 'red' }}>ثبت نام با شکست مواجه شد لطفا دوباره تکرار نمایید.</p>}
                        </Col>
                    </Row>
                </Container>
            </div>
        );
    }
}

export { SignUpPage }