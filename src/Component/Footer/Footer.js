import React, { Component } from 'react';

class Footer extends Component {
    render() {
        return (
            <div className="bg-dark">
                <div className="container mt-5">
                    <div className="row mt-5 p-2">
                        <div className="col-sm-3"></div>
                        <div className="col-sm-6 text-center">
                            <a >way2programming.com</a>
                        </div>
                        <div className="col-sm-3 text-right">
                            <a className="mr-sm-2" >contact</a>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Footer;