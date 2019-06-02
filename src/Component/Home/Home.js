import React, { Component } from 'react';
import './Home.css';
import { Link } from 'react-router-dom'

class Home extends Component {
    render() {
        return (
            <main role="main">

                <div className="jumbotron">
                    <div className="container">
                        <h1 className="display-3">React JS</h1>
                        <p><Link className="btn btn-primary btn-lg" role="button" to="/react/reactjs-configuration">Learn more &raquo;</Link></p>
                    </div>
                </div>

                <div className="container">
                    <div className="row">
                        <div className="col-md-4">
                            {/* <p><Link className="btn btn-secondary" href="#" role="button">View details &raquo;</a></p> */}
                        </div>
                    </div>
                    <hr />
                    <br/><br/><br/><br/><br/><br/>
                </div>
            </main>
        )
    }
}

export default Home;