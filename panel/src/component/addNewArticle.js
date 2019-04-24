import React, { Component } from 'react';
import { Container, Form, Button, Modal } from 'react-bootstrap';
import Axios from 'axios';


class AddNewArticle extends Component {

    state = {
        error: null,
        success: null,
        show: false
    }

    onSubmit = (event) => {
        event.preventDefault();
        const data = {
            title: event.target["title"].value,
            text: event.target["text"].value,
            FCM: '1'
        }
        Axios.post('//localhost:3000/addarticle', data)
            .then(response => {
                if (response.data.success) {
                    if(response.data.role === "user"){
                        window.location = '/panel/profile';
                        // this.setState({ success: true })
                    }
                    else if(response.data.role === "admin"){
                        window.location = '/panel/adminprofile';
                    }
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
        return (
            <div style={{ paddingRight: 20, paddingTop: 60,marginLeft:40 }}>
                <Container>
                    <h3 style={{ paddingBottom: 40,direction:"rtl",textAlign:"right",color:"teal" }}>ایجاد مقاله جدید</h3>

                    <Form onSubmit={this.onSubmit}>
                        <Form.Group controlId="formGroupUsername" style={{textAlign:"right" ,direction:"rtl"}}>
                            <Form.Label style={{textAlign:"right" ,direction:"rtl"}}>عنوان مقاله: </Form.Label>
                            <Form.Control style={{textAlign:"right" }} name="title" type="text" />
                        </Form.Group>

                        <Form.Group controlId="exampleForm.ControlTextarea1" style={{textAlign:"right" ,direction:"rtl"}}>
                            <Form.Label style={{textAlign:"right",direction:"rtl" }}>متن مقاله: </Form.Label>
                            <Form.Control style={{textAlign:"right" }} name="text" as="textarea" rows="5" />
                        </Form.Group>

                        <Button type="submit" onClick={this.handleShow} variant="success" style={{ color: 'white',textAlign:"right",direction:"rtl" }}>
                            اضافه کردن
                        </Button>
                    </Form>
              
                    {this.state.error && <p style={{ color: 'red' }}>خطا در ایجاد مقاله</p>}
                    {this.state.success && <p style={{ color: 'green' }}>مقاله ایجاد شد.</p>}


                </Container>
            </div>

        )
    }
}
console.log("it is test 2")
export { AddNewArticle }