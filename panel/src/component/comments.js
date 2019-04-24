import React, { Component } from 'react';
import { Card } from 'react-bootstrap';
import axios from 'axios';

class Comments extends Component {

    constructor(props) {
        super(props);

        this.state = {
            error: null,
            Comments: []
        };

        // const { articleID } = this.props;


        const data = {
            id: this.props.articleID,
            FCM: '1'
        }
        axios.post('//localhost:3000/showComments', data)
            .then(response => {
                if (response.data.success) {
                    const Comments = response.data.comment;
                    this.setState({ Comments });
                } else {
                    this.setState({ error: true })
                }
            })
    }


    render() {
        const { Comments } = this.state;

        return (
            Comments.map(comment => 
                <Card className="mb-1" style={{ borderColor: 'black' }}>
                    <Card.Body>
                        <Card.Subtitle className="text-muted">{comment.username}</Card.Subtitle>
                        <Card.Text className="my-4">{comment.text}</Card.Text>
                        <Card.Text className="mb-2 text-muted">Posted on {comment.createDate}</Card.Text>
                    </Card.Body>                  
                </Card>
            )
            

        )
    }
}

export { Comments }