import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Footer extends Component {
    render() {
        return (
            <div className="bg-dark">
                <div className="container mt-5">
                    <div className="row mt-5 p-2">
                        <div className="col-sm-3"></div>
                        <div className="col-sm-6 text-center">
                            <Link to="/" >way2programming.com</Link>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Footer;