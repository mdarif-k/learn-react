import React, { Component } from 'react';
import { Link } from 'react-router-dom';

const INITIAL_STATE = {
    navLink: 'nav-link dropdown-toggle',
    dropDownMenu: 'dropdown-menu',
    toggle: false,
    toggleTechName: ''
}

class Navbar extends Component {

    constructor(props) {
        super(props);
        this.state = INITIAL_STATE;
    }

    componentDidMount() {
    }

    toggle = (name) => {
        let toggle = !this.state.toggle;
        if (toggle) {
            this.setState({
                navLink: 'nav-link dropdown-toggle show',
                dropDownMenu: 'dropdown-menu show',
                toggle: true,
                toggleTechName: name
            })
        } else {
            this.setState({
                navLink: 'nav-link dropdown-toggle',
                dropDownMenu: 'dropdown-menu',
                toggle: false,
                toggleTechName: name
            })
        }

    }

    resetToggleHandler = () => {
        this.setState({
            navLink: 'nav-link dropdown-toggle',
            dropDownMenu: 'dropdown-menu',
            toggle: false
        });
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.navData) {
            nextProps.navData.map((nd, i) => {
                nd.childTech && nd.childTech.map((ct, i) => {
                    if(ct.href.indexOf('/') !== 0) {
                        ct.href = '/'+ ct.href;
                    }
                    return null;
                });
                return null;
            });
        }
    }

    render() {
        let navList = null;
        const style = { zIndex: "1030"}
        if (this.props.navData.length > 0) {
            navList = (
                <ul style={style} className="navbar-nav">
                    {
                        this.props.navData.map((nav, i) => {
                            return (
                                nav.childTech
                                    ? (
                                        <li  key={i} className="nav-item dropdown">
                                            <span key={i} onClick={this.toggle.bind(this, nav.nav.techName)}  className={this.state.navLink} id="navbarDropdownMenuLink" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                {nav.nav.techName}
                                            </span>
                                            {
                                                this.state.toggleTechName === nav.nav.techName
                                                    ?
                                                    <div className={this.state.dropDownMenu} aria-labelledby="navbarDropdownMenuLink">
                                                        {
                                                            nav.childTech.map((ct, i) => {
                                                                return (
                                                                    ct.href ? <Link key={i} onClick={() => this.resetToggleHandler(nav.nav.techName)} className="dropdown-item" to={ct.href}>{ct.techName}</Link> : null
                                                                )
                                                            })
                                                        }
                                                    </div>
                                                    : null
                                            }
                                        </li>
                                    )
                                    : nav.nav.href ? (
                                        <li key={i} onClick={() => this.resetToggleHandler(nav.nav.techName)} className="nav-item active" >
                                            <Link className="nav-link" to={nav.nav.href}>{nav.nav.techName} <span className="sr-only">(current)</span></Link>
                                        </li>
                                    ) : null

                            )
                        })
                    }
                </ul>
            )


        }
        return (
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <Link className="navbar-brand" to="/">W</Link>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNavDropdown">
                    {navList}
                </div>
            </nav>
        )
    }
}

export default Navbar;