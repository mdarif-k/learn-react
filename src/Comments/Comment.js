import React, { Component } from 'react';
import axios from 'axios';

class Comment extends Component {
    constructor(props) {
        super(props);
        this.state = {
            comments: []
        }
    }

    componentDidMount() {
        axios.get('https://jsonplaceholder.typicode.com/posts')
            .then((response) => {
                this.setState({
                    comments: response.data
                })
            })
            .catch(error => {
                console.log(error);
            })
    }

    deleteCommentHandler = (id) => {
        axios.delete('https://jsonplaceholder.typicode.com/posts/' + id)
            .then(res => {
                console.log(res);
            })
            .catch(err => {})
    }

    
    render() {
        let comments = null;
        if(this.state.comments.length > 0) {
            comments = this.state.comments.map((comment, index) => {
                return (
                    <div key={comment.id}>
                        {comment.title} <span onClick={this.deleteCommentHandler.bind(this, comment.id)}>Delete</span>
                    </div>
                )
            });
        }
        return (
            <div>
                {comments}
            </div>
        )
    }
}

export default Comment;