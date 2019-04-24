import React, { Component } from 'react';
import { Card, Collapse, Button, Form, Jumbotron } from 'react-bootstrap';
import { Comments } from './comments';
import axios from 'axios';

class AdminArticleComponent extends Component {

    constructor(props) {
        super(props);

        this.state = {
            open: false,
            error: null,
            success: null
        };
    }

    addComment = (event) => {
        event.preventDefault();

        const data = {
            id: this.props.article._id,
            text: event.target["commentText"].value,
            FCM: '1'
        }
        axios.post('//localhost:3000/addComment', data)
            .then(response => {
                if (response.data.success) {
                    this.setState({ success: true });
                    window.location = '/panel/adminprofile';
                } else {
                    this.setState({ error: true })
                }
            })
        console.log(data)
        console.log(this.state.articleID)
    }

    onChange = ({ target: { name, value } }) => {
        this.setState({ [name]: value })
    }

    Delete = (event) => {
        const data = {
            id: event.currentTarget.id,
            FCM: '1'
        }

        axios.post('//localhost:3000/deleteArticle', data)
            .then(response => {
                if (response.data.success) {
                    window.location = '/panel/adminprofile';
                } else {
                    this.setState({ error: true })
                }
            })
        console.log(data)
        console.log(this.state.members)
    }

    render() {
        const { article } = this.props;
        const { open } = this.state;
        return (
            <>
                <Card className="mb-4" style={{ borderColor: 'teal' }}>
                    <Card.Header as="h5">عنوان مقاله: {article.title}</Card.Header>
                    <Card.Body>
                        <Card.Subtitle className="text-muted">نویسنده مقاله: {article.author}</Card.Subtitle>
                        <Card.Subtitle className="my-2 text-muted">نام کاربری: {article.username}</Card.Subtitle>
                        <Card.Text className="my-4">متن مقاله: {article.text}</Card.Text>
                        <Card.Text className="mb-2 text-muted">ایجاد شده در تاریخ:  {article.createDate}</Card.Text>
                    </Card.Body>
                    <Card.Footer>
                        <Button
                            className="ml-auto"
                            onClick={() => this.setState({ open: !open })}
                            aria-controls="example-collapse-text"
                            aria-expanded={open}
                            variant="secondary"
                            style={{ color: 'white' }}>
                            نمایش کامنت 
                        </Button>
                        <Button
                            onClick={this.Delete}
                            id={article._id}
                            variant="danger"
                            style={{ color: 'white', float: 'right', marginLeft:'10px' }}>
                            حذف
                        </Button>

                        <Collapse in={this.state.open}>
                            <Jumbotron className="mt-4 jumbotron">
                                <Comments articleID={article._id} />

                                {this.state.error && <p style={{ color: 'red' }}>خطا در ایجاد کامنت</p>}
                                {this.state.success && <p style={{ color: 'green' }}>کامنت با موفقیت اضافه شد.</p>}

                                <Form onSubmit={this.addComment} id="example-collapse-text">
                                    <Form.Group controlId="exampleForm.ControlTextarea1">
                                        <Form.Control name="commentText" className="comment" as="textarea" rows="3" />
                                    </Form.Group>
                                    <Button style={{ color: 'white' }} variant="success" type="submit">
                                        درج کامنت
                                    </Button>
                                </Form>
                            </Jumbotron>
                        </Collapse>
                    </Card.Footer>
                </Card>

                {this.state.error && <p style={{ color: 'red' }}>خطا در حذف کاربر</p>}
            </>

        )
    }
}

export { AdminArticleComponent }