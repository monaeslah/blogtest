import React,{Component} from 'react';
import Axios from 'axios';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';

class LoginPage extends Component {
    state= {
        error: null
    }
    onSubmit = (event)=>{
        event.preventDefault();
        const data = {
            username: event.target["username"].value,
            password: event.target["password"].value,
            FCM: '1'
        }
        Axios.post('//localhost:3000/signin',data)
        .then(response=>{
            if (response.data.role === 'user'){
                localStorage.setItem('loginData',JSON.stringify(data));
                window.location = '/panel/profile';
                console.log(response.data.user)
            }
            else if (response.data.role === 'admin'){
                localStorage.setItem('adminLoginData',JSON.stringify(data));
                window.location = '/panel/adminprofile';
                console.log(response.data.user)
            }
            else {
                this.setState({error: true})
            }
            
        })
    }


    onChange = ({target:{name,value}})=>{
        this.setState({[name]:value})
    }

    render() {
        return (
            <div className="App-header">
                <Container>
                    <Row>
                        <Col md={{ span: 4, offset: 4 }}>
                            <h3 style={{ marginTop: 35, marginBottom: 35}}> ورود به حساب کاربری </h3>
                            <Form onSubmit={this.onSubmit}>
                                
                                <Form.Group controlId="formGroupUsername">
                                    <Form.Control name="username" type="text"  style={{textAlign:"right" }} placeholder="نام کاربری" />
                                </Form.Group>
                                <Form.Group controlId="formGroupPassword">
                                    <Form.Control name="password" type="password"  style={{textAlign:"right" }} placeholder="رمز عبور" />
                                </Form.Group>

                                <Button style={{ backgroundColor: 'teal', borderColor: 'teal', color: 'white',borderRadius:"20px",paddingRight:"35px",paddingLeft:"35px" }} type="submit">
                                    ورود
                                </Button>

                            </Form>
                            <p style={{fontSize: 15, marginTop: 30}}> هنوز ثبت نام نکرده اید؟<a href="/panel/signup" style={{color: 'teal', marginRight:"10px"}}>ثبت نام</a></p>
                            <p style={{fontSize: 16, marginTop: 30}}><a href="/" style={{color: 'white'}}>صفحه اصلی</a></p>
                            {this.state.error && <p style={{ color: 'red' }}>ورود با خطا مواجه شده است لطفا دوباره تکرار نمایید</p>}
                        </Col>
                    </Row>
                </Container>
                
            </div>
        )
    }
}

export {LoginPage}