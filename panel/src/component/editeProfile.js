import React, { Component } from 'react';
import { Container, Button, Form, Col, Row, Alert, Card } from 'react-bootstrap';
import axios from 'axios';

class EditProfile extends Component {

    constructor(props) {
        super(props);

        this.state = {
            profile: [],
            error: null,
            success: null,
            isOnEdit: false
        }
    }

    componentDidMount() {
        axios.get(`//localhost:3000/myprofile`)
            .then(res => {
                const profile = res.data;
                this.setState({ profile });
            })
    }

    onEdit = () => {
        this.setState({ isOnEdit: !this.state.isOnEdit });
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
        axios.post('//localhost:3000/editProfile', data)
            .then(response => {
                if (response.data.success) {
                    this.setState({ success: true })
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
        const { isOnEdit } = this.state;

        return (
            <div style={{ paddingTop: 60 }}>
                <Container>
                    {this.state.success &&
                    <Alert variant="success" style={{textAlign:"right" ,direction:"rtl"}}> پروفایل با موفقیت ویرایش شد. </Alert>}

                    {this.state.error &&
                    <Alert variant="danger" style={{textAlign:"right" ,direction:"rtl"}}> خطا در ویرایش پروفایل </Alert>}

                    <h3 style={{textAlign:"right" ,direction:"rtl",color:"teal"}}>ویرایش پروفایل</h3>


                    {this.state.profile.map(profile => {
                        return isOnEdit ?
                            <>
                                <Card style={{borderColor:"teal",marginBottom:'30px',marginTop:'20px'}}>
                                    <Form onSubmit={this.onSubmit} style={{marginLeft: '50px',textAlign:"right" ,direction:"rtl",marginRight:'50px',paddingTop:20}} >
                                        <Form.Group as={Row}>
                                            <Form.Label style={{marginTop: '8px'}} sm="6"><b>نام: </b></Form.Label> 
                                            <Col sm="6">
                                                <Form.Control name="firstname" style={{marginLeft: '24px'}}  />
                                            </Col> 
                                        </Form.Group>

                                        <Form.Group as={Row}>
                                            <Form.Label style={{marginTop: '8px'}} sm="6"><b>نام خانوادگی</b></Form.Label>
                                            <Col sm="6">
                                                <Form.Control name="lastname" style={{marginLeft: '25px'}}  />
                                            </Col>
                                        </Form.Group>

                                        <Form.Group as={Row}>
                                            <Form.Label style={{marginTop: '8px'}} sm="6"><b>نام کاربری</b></Form.Label>
                                            <Col sm="6">
                                                <Form.Control name="username" style={{marginLeft: '22px'}}  />
                                            </Col>
                                        </Form.Group>

                                        <Form.Group as={Row}>
                                            <Form.Label style={{marginTop: '8px'}} sm="6"><b>رمز عبور</b></Form.Label>
                                            <Col sm="6">
                                                <Form.Control name="password" style={{marginLeft: '25px'}}  />
                                            </Col>
                                        </Form.Group>

                                        <Form.Group as={Row}>
                                            <Form.Label style={{marginTop: '8px'}} sm="6"><b>جنسیت</b></Form.Label>
                                            <Col sm="6">
                                                <Form.Control name="sex" style={{marginLeft: '70px'}} as="select">
                                                    <option>مرد</option>
                                                    <option>زن</option>
                                                </Form.Control>
                                            </Col>
                                        </Form.Group>

                                        <Form.Group as={Row}>
                                            <Form.Label style={{marginTop: '8px'}} sm="6"><b>تلفن</b></Form.Label>
                                            <Col sm="6">
                                                <Form.Control name="phone" style={{marginLeft: '48px'}}  />
                                            </Col>
                                        </Form.Group>

                                        <Button type="submit" variant="success mt-3 mb-2 ml-2" style={{ color: 'white'}}>ذخیره</Button>
                                        <Button onClick={this.onEdit} variant="danger ml-2 mt-3 mb-2" style={{ color: 'white' }}>لغو</Button>
                                    </Form>
                                </Card>
                               

                                
                            </> :
                            <>
                                <Card style={{borderColor:"teal",marginBottom:'30px',marginTop:'20px'}}>
                                    <Form style={{marginLeft: '50px',textAlign:"right" ,direction:"rtl",marginRight:'50px',paddingTop:20}}>
                                        <Form.Group as={Row} >
                                            <Form.Label style={{marginTop: '6px'}} sm="6"><b>نام: </b></Form.Label> 
                                            <Col sm="6">
                                                <Form.Control style={{marginLeft: '24px'}} plaintext readOnly defaultValue={profile.firstname} />
                                            </Col> 
                                        </Form.Group>

                                        <Form.Group as={Row} >
                                            <Form.Label style={{marginTop: '6px'}} sm="6"><b>نام خانوادگی:</b></Form.Label>
                                            <Col sm="6">
                                                <Form.Control style={{marginLeft: '25px'}} plaintext readOnly defaultValue={profile.lastname} />
                                            </Col>
                                        </Form.Group>

                                        <Form.Group as={Row} >
                                            <Form.Label style={{marginTop: '6px'}} sm="6"><b>نام کاربری:</b></Form.Label>
                                            <Col sm="6">
                                                <Form.Control style={{marginLeft: '22px'}} plaintext readOnly defaultValue={profile.username} />
                                            </Col>
                                        </Form.Group>

                                        <Form.Group as={Row} >
                                            <Form.Label style={{marginTop: '6px'}} sm="6"><b>رمز عبور: </b></Form.Label>
                                            <Col sm="6">
                                                <Form.Control style={{marginLeft: '25px'}} plaintext readOnly defaultValue={profile.password} />
                                            </Col>
                                        </Form.Group>

                                        <Form.Group as={Row} >
                                            <Form.Label style={{marginTop: '6px'}} sm="6"><b>جنسیت: </b></Form.Label>
                                            <Col sm="6">
                                                <Form.Control style={{marginLeft: '70px'}} plaintext readOnly defaultValue={profile.sex} />
                                            </Col>
                                        </Form.Group>

                                        <Form.Group as={Row} >
                                            <Form.Label style={{marginTop: '6px'}} sm="6"><b>تلفن: </b></Form.Label>
                                            <Col sm="6">
                                                <Form.Control style={{marginLeft: '48px'}} plaintext readOnly defaultValue={profile.phone} />
                                            </Col>
                                        </Form.Group>
                                    </Form>
                                </Card>


                                <Button onClick={this.onEdit} variant="success mt-3" style={{ color: 'white', marginLeft: '35px' }}>ویرایش</Button>
                            </>
                    })}

                </Container>
            </div>
        )
    }
}

export { EditProfile }