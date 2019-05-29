import React, { Component } from 'react';
import axios from '../firebase.instance';
import Spinner from '../Spinner/Spinner';

class Contact extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: false
        }
    }
    componentDidMount() {

    }

    contactFormHandler = (event) => {
        event.preventDefault();
        const email = event.target.elements.email.value;
        const message = event.target.elements.query.value
        const data = { email, message };
        this.setState({ loading: true })
        axios.post('contact.json', data)
            .then(res => {
                this.setState({ loading: false });
            })
            .catch(err => console.log(err))
    }

    render() {
        return (
            <div>
                <Spinner loading={this.state.loading} />
                <h1>Contact Form</h1>
                <form onSubmit={this.contactFormHandler}>
                    <input type="text" name="email" placeholder="email" /><br /><br />
                    <textarea name="query" placeholder="message"></textarea>
                    <button>Submit</button>
                </form>
            </div>
        )
    }
}

export default Contact;