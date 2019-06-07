import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Modal } from 'react-bootstrap';

const INITIAL_STATE = {
    navLink: 'nav-link dropdown-toggle',
    dropDownMenu: 'dropdown-menu',
    toggle: false,
    toggleTechName: '',
    toggleNavbar: false,
    show: false
}

class Navbar extends Component {

    constructor(props) {
        super(props);
        this.state = INITIAL_STATE;
    }

    componentDidMount() {
    }

    handleShow = () => {
        this.setState({ show: true });
    };

    handleHide = () => {
        this.setState({ show: false });
    };

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
        if (nextProps.navData) {
            nextProps.navData.map((nd, i) => {
                nd.childTech && nd.childTech.map((ct, i) => {
                    if (ct.href.indexOf('/') !== 0) {
                        ct.href = '/' + ct.href;
                    }
                    return null;
                });
                return null;
            });
        }
    }

    toggleNavBar = () => {
        let toggleNavbar = !this.state.toggleNavbar
        this.setState({
            toggleNavbar: toggleNavbar
        })
    }

    newBlogHandler = () => {

    }

    render() {
        let navList = null;
        const style = { zIndex: "1030" }
        if (this.props.navData.length > 0) {
            navList = (
                <ul style={style} className="navbar-nav">
                    {
                        this.props.navData.map((nav, i) => {
                            return (
                                nav.childTech
                                    ? (
                                        <li key={i} className="nav-item dropdown">
                                            <span key={i} onClick={this.toggle.bind(this, nav.nav.techName)} className={this.state.navLink} id="navbarDropdownMenuLink" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
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
                    <li onClick={() => this.setState({ show: true })} className="nav-item active" >
                        <Link className="nav-link" to='/'>New Blog <span className="sr-only">(current)</span></Link>
                    </li>
                </ul>
            )
        }
        let navBarActive = 'collapse navbar-collapse';
        if (this.state.toggleNavbar) {
            navBarActive = 'collapse navbar-collapse show'
        }
        return (
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <Link className="navbar-brand" to="/">W</Link>
                <button className="navbar-toggler" onClick={this.toggleNavBar} type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className={navBarActive} id="navbarNavDropdown">
                    {navList}
                </div>
                <Modal
                    size="lg"
                    show={this.state.show}
                    onHide={this.handleHide}
                    aria-labelledby="example-modal-sizes-title-lg"
                >
                    <Modal.Header closeButton>
                        <Modal.Title id="example-modal-sizes-title-lg">
                            Add New Blog
                    </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <form>
                            <div class="row">
                                <div class="col-sm-2">
                                    <div class="form-group">
                                        <label>Sort</label>
                                        <input formControlName="sort" class="form-control" />
                                    </div>
                                </div>
                                <div class="col-sm-2">
                                    <div class="form-group">
                                        <label for="exampleFormControlInput1">Tech Name</label>
                                        <input formControlName="blogTech" class="form-control" />
                                    </div>
                                </div>
                                <div class="col-sm-4">
                                    <div class="form-group">
                                        <label for="exampleFormControlInput1">Blog href</label>
                                        <input formControlName="blogHref" class="form-control" />
                                    </div>
                                </div>
                                <div class="col-sm-4">
                                    <div class="form-group">
                                        <label>Title</label>
                                        <input formControlName="blogTitle" class="form-control" />
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-sm-4">
                                    <div class="form-group">
                                        <label>Desc</label>
                                        <input formControlName="blogDesc" class="form-control" />
                                    </div>
                                </div>
                                <div class="col-sm-4">
                                    <div class="form-group">
                                        <label for="exampleFormControlInput1">Blog Name</label>
                                        <input formControlName="blogName" class="form-control" />
                                    </div>
                                </div>
                                <div class="col-sm-4">
                                    <div class="form-group">
                                        <label>Keywords</label>
                                        <input formControlName="blogKeyword" class="form-control" />
                                    </div>
                                </div>
                            </div>
                            <div class="form-group">
                                <label for="exampleFormControlTextarea1">Blog Data</label>
                                <textarea formControlName="blogData" class="form-control" rows="10"></textarea>
                            </div>
                            <div class="form-group">
                                <button type="submit" class="btn btn-success">Add</button>
                            </div>
                        </form>
                    </Modal.Body>
                </Modal>
            </nav>
        )
    }
}

export default Navbar;