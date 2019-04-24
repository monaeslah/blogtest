import React, { Component } from 'react';
import { Card, Collapse, Button, Form, Jumbotron } from 'react-bootstrap';
import { Comments } from './comments';
import axios from 'axios';

class ArticleComponent extends Component {

    constructor(props) {
        super(props);

        this.state = {
            open: false,
            success: null,
            error: null
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
                    window.location = '/panel/profile';
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
        const { article } = this.props;
        const { open } = this.state;
        return (

            <Card className="mb-4" style={{ borderColor: 'teal' }}>
                <Card.Header as="h5">عنوان مقاله: {article.title}</Card.Header>
                <Card.Body>
                    <Card.Subtitle className="text-muted">نویسنده مقاله: {article.author}</Card.Subtitle>
                    <Card.Subtitle className="my-2 text-muted">نام کاربری:  {article.username}</Card.Subtitle>
                    <Card.Text className="my-4">متن مقاله: <p>{article.text}</p></Card.Text>
                    <Card.Text className="mb-2 text-muted">ایجاد شده در تاریخ {article.createDate}</Card.Text>
                </Card.Body>
                <Card.Footer>
                    <Button
                        className="ml-auto"
                        onClick={() => this.setState({ open: !open })}
                        aria-controls="example-collapse-text"
                        aria-expanded={open}
                        variant="secondary"
                        style={{ color: 'white' }}>
                        نمایش کامنت ها
                    </Button>

                    <Collapse in={this.state.open}>
                        <Jumbotron className="mt-4 jumbotron">
                            <Comments articleID={article._id} />

                            {this.state.error && <p style={{ color: 'red' }}>خطا در ایجاد کامنت</p>}
                            {this.state.success && <p style={{ color: 'green' }}>کامنت با موفقیت ایجاد شد.</p>}

                            <Form onSubmit={this.addComment} key={article._id} id="example-collapse-text">
                                <Form.Group controlId="exampleForm.ControlTextarea1">
                                    <Form.Control name="commentText" className="comment" as="textarea" rows="2" />
                                </Form.Group>
                                <Button style={{ color: 'white' }} variant="success" type="submit">
                                ذخیره کامنت
                            </Button>
                            </Form>
                        </Jumbotron>
                    </Collapse>
                </Card.Footer>
            </Card>

        )
    }
}

export { ArticleComponent }