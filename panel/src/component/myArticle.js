import React, { Component } from 'react';
import axios from 'axios';
import { Container, Card, Button, ButtonToolbar, Form, Collapse, Jumbotron, Modal, Alert } from 'react-bootstrap';
import { Comments } from './comments';

//######################################   MODAL FOR EDIT  ##################################
class MyVerticallyCenteredModal extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            error: null
        }
    }


    Submit = (event) => {
        event.preventDefault();
        const data = {
            id: this.props.id,
            title: event.target["title"].value,
            text: event.target["text"].value,
            FCM: '1'
        }
        axios.post('//localhost:3000/editArticle', data)
            .then(response => {
                if (response.data.success) {
                    window.location = '/panel/profile';
                } else {
                    this.setState({ error: true })
                }
            })
        console.log(data)
    }

    render() {
        const { id } = this.props;
        return (
            <Modal style={{direction:"rtl", textAlign:"right", }}
                {...this.props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered>

                <Modal.Header closeButton>
                    <Modal.Title  id="contained-modal-title-vcenter">
                        ویرایش مقاله
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    <Form onSubmit={this.Submit}>
                        <Form.Group>
                            <Form.Label >عنوان مقاله:</Form.Label>
                            <Form.Control className="px-0" name="title" type="text" />
                        </Form.Group>

                        <Form.Group>
                            <Form.Label>متن مقاله:</Form.Label>
                            <Form.Control className="px-0" name="text" as="textarea" rows="5" />
                        </Form.Group>
                        <Button id={id} type="submit" variant="success ml-auto" style={{ color: 'white' }}>ذخیره تغییرات</Button>
                    </Form>
                    {this.state.error && <p style={{ color: 'red' }}>خطا در ویرایش مقاله</p>}

                </Modal.Body>
            </Modal>
        );
    }
}
//###########################################################################################

class MyArticle extends Component {
    constructor(props) {
        super(props);

        this.state = {
            error: null,
            error1: null,
            error2: null,
            myArticles: [],
            success: null,
            open: false,
            modalShow: false
        }

        const data = {}
        axios.post('//localhost:3000/myArticle', data)
            .then(response => {
                if (response.data.success) {
                    const myArticles = response.data.content;
                    this.setState({ myArticles });
                } else {
                    this.setState({ error: true })
                }
            })
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
                    this.setState({ error2: true })
                }
            })
        console.log(data)
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
                    let { myArticles } = this.state;
                    this.setState({
                        success: true,
                        myArticles: myArticles.filter(article => article._id !== data.id)
                    })
                } else {
                    this.setState({ error1: true })
                }
            })
        console.log(data)
    }

    render() {
        const { myArticles } = this.state;
        const { open } = this.state;
        let modalClose = () => this.setState({ modalShow: false });

        return (

            <div style={{ paddingTop: 60 }}>
                <Container>
                    {this.state.error &&
                    <Alert variant="danger"> خطا در نمایش مقاله </Alert>}

                    {this.state.error1 &&
                    <Alert variant="danger"> خطا در حذف مقاله  </Alert>}

                    {this.state.error2 &&
                    <Alert variant="danger">خطا در ایجاد کامنت  </Alert>}

                    

                    <h3 style={{ paddingBottom: 40,direction:"rtl",textAlign:"right",color:"teal" }}>مقاله های من</h3>

                    {myArticles.map(article => {
                    return <Card className="mb-4" style={{ borderColor: 'teal', direction:"rtl",textAlign:"right" }}>
                        <Card.Header as="h5">عنوان مقاله: {article.title}</Card.Header>
                        <Card.Body>
                            <Card.Subtitle className="text-muted">نویسنده مقاله: {article.author}</Card.Subtitle>
                            <Card.Subtitle className="my-2 text-muted">نام کاربری: {article.username}</Card.Subtitle>
                            <Card.Text className="my-4">{article.text}</Card.Text>
                            <Card.Text className="mb-2 text-muted">ایجاد شده در تاریخ: {article.createDate}</Card.Text>
                        </Card.Body>
                        <Card.Footer>
                            <ButtonToolbar>
                                <Button
                                    onClick={() => this.setState({ open: !open })}
                                    aria-controls="example-collapse-text"
                                    aria-expanded={open}
                                    variant="secondary"
                                    style={{ color: 'white' }}>
                                    کامنت ها
                                </Button>
                                <Button
                                    onClick={() => this.setState({ modalShow: true })}
                                    variant="success ml-2 mr-2"
                                    style={{ color: 'white' }}
                                    id={article._id}>
                                    ویرایش مقاله 
                                </Button>

                                <MyVerticallyCenteredModal
                                    show={this.state.modalShow}
                                    onHide={modalClose}
                                    id={article._id}
                                />

                                <Button
                                    onClick={this.Delete}
                                    id={article._id}
                                    variant="danger"
                                    style={{ color: 'white' }}>
                                    حذف مقاله
                                </Button>
                            </ButtonToolbar>

                            <Collapse in={this.state.open}>
                                <Jumbotron className="mt-4 jumbotron">
                                    <Comments articleID={article._id} />

                                    {this.state.error && <p style={{ color: 'red' }}>خطا در ایجاد کامنت</p>}
                                    {this.state.success && <p style={{ color: 'green' }}>کامنت با موفقیت ایجاد شد</p>}

                                    <Form onSubmit={this.addComment} id="example-collapse-text">
                                        <Form.Group controlId="exampleForm.ControlTextarea1">
                                            <Form.Control name="commentText" className="comment" as="textarea" rows="3" />
                                        </Form.Group>

                                        <Button
                                            style={{ color: 'white' }}
                                            variant="success"
                                            type="submit">
                                            ذخیره کامنت
                                        </Button>

                                        



                                    </Form>


                                </Jumbotron>
                            </Collapse>

                        </Card.Footer>
                    </Card>

                })}

                {this.state.success &&
                    <Alert variant="info" style={{direction:"rtl",textAlign:"right" }}> مقاله با موفقیت حذف شد. </Alert>}

                </Container>
            </div>
        )
    }
}

export { MyArticle }

