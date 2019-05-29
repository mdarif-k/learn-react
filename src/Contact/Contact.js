import React, { Component } from 'react';
import axios from '../firebase.instance';
import Spinner from '../Spinner/Spinner';

class Contact extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            contactedQuries: []
        }
    }
    componentDidMount() {
        axios.get('contact.json')
            .then(res => {
                console.log(res.data);
                this.setState({
                    contactedQuries: res.data
                });
            });
    }

    contactFormHandler = (event) => {
        event.preventDefault();
        const email = event.target.elements.email.value;
        const message = event.target.elements.query.value
        const data = { email, message };
        this.setState({ loading: true });
        axios.post('contact.json', data)
            .then(res => {
                this.setState({ loading: false });
            })
            .catch(err => console.log(err));
    }

    render() {
        let contactedQuries = null;
        if(this.state.contactedQuries.length > 0) {
            contactedQuries = (
                <div>
                    <table>
                        <tbody>
                            <tr>
                                <th>Email</th>
                                <th>Message</th>
                                <th>Delete</th>
                            </tr>
                            {
                            this.state.contactedQuries.map((c, i) => {
                                return (
                                    <tr key={i}>
                                        <td>{c.email}</td>
                                        <td>{c.message}</td>
                                        <td><button onClick="">Delete</button></td>
                                    </tr>
                                )
                            })
                            }
                        </tbody>
                    </table>
                </div>
            );
        }
        return (
            <div>
                <Spinner loading={this.state.loading} />
                <h1>Contact Form</h1>
                <form onSubmit={this.contactFormHandler}>
                    <input type="text" name="email" placeholder="email" /><br /><br />
                    <textarea name="query" placeholder="message"></textarea>
                    <button>Submit</button>
                </form>
                <div>
                    {contactedQuries}
                </div>
            </div>
        )
    }
}

export default Contact;