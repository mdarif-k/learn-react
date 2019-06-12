import React, { Component } from 'react';
import { Modal } from 'react-bootstrap';
import Input from '../UI/Common/Input';
import Loader from '../UI/Common/Loader';
import firebase from 'firebase'

const INITIAL_STATE = {
    show: false,
    addBlogForm: {
        sort: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'Sort',
                name: 'sort'
            },
            value: '',
            labelfor: "Sort"
        },
        blogTech: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'Tech Name',
                name: 'blogTech'
            },
            value: '',
            labelfor: "Tech Name"
        },
        blogHref: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'Blog Href',
                name: 'blogHref'
            },
            value: '',
            labelfor: "Blog Href"
        },
        blogTitle: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'Title',
                name: 'title'
            },
            value: '',
            labelfor: "Title"
        },
        blogDesc: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'Desc',
                name: 'desc'
            },
            value: '',
            labelfor: "Desc"
        },
        blogName: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'Blog Name',
                name: 'blogName'
            },
            value: '',
            labelfor: "Blog Name"
        },
        blogKeyword: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'Keywords',
                name: 'keywords'
            },
            value: '',
            labelfor: "Keywords"
        },
        blogData: {
            elementType: 'textarea',
            elementConfig: {
                type: 'text',
                placeholder: 'Blog Data',
                name: 'blogData',
                rows: '8'
            },
            value: '',
            labelfor: "Blog Data"
        },
    },
    loading: false,
    editMode: false,
    editId: null
}

class AddBlog extends Component {

    constructor(props) {
        super(props);
        this.state = INITIAL_STATE;
    }

    componentDidMount() {
        this.db = firebase.database();
    }

    handleShow = () => {
        this.setState({ show: true });
    };

    handleHide = () => {
        this.setState(INITIAL_STATE);
    };

    componentWillReceiveProps(nextProps) {
        if (nextProps.show) {
            this.setState({
                show: true
            })
        }
        if (nextProps.blogEditId) {
            this.setState({
                editId: nextProps.blogEditId
            })
            this.db.ref('blogs/' + nextProps.blogEditId).once('value').then(blog => {
                if (blog.val().blogData) {
                    let value = blog.val().blogData;
                    this.setState({
                        show: true,
                        editMode: true
                    }, () => {
                        this.onChangeHandler(value, 'blogData');
                    })
                }
                if (blog.val().blogTech) {
                    let value = blog.val().blogTech;
                    this.setState({
                        show: true,
                        editMode: true
                    }, () => {
                        this.onChangeHandler(value, 'blogTech');
                    })
                }
                if (blog.val().blogHref) {
                    let value = blog.val().blogHref;
                    this.setState({
                        show: true,
                        editMode: true
                    }, () => {
                        this.onChangeHandler(value, 'blogHref');
                    })
                }
                if (blog.val().blogName) {
                    let value = blog.val().blogName;
                    this.setState({
                        show: true,
                        editMode: true
                    }, () => {
                        this.onChangeHandler(value, 'blogName');
                    })
                }
                if (blog.val().blogKeyword) {
                    let value = blog.val().blogKeyword;
                    this.setState({
                        show: true,
                        editMode: true
                    }, () => {
                        this.onChangeHandler(value, 'blogKeyword');
                    })
                }
                if (blog.val().sort) {
                    let value = blog.val().sort;
                    this.setState({
                        show: true,
                        editMode: true
                    }, () => {
                        this.onChangeHandler(value, 'sort');
                    })
                }
                if (blog.val().blogTitle) {
                    let value = blog.val().blogTitle;
                    this.setState({
                        show: true,
                        editMode: true
                    }, () => {
                        this.onChangeHandler(value, 'blogTitle');
                    })
                }
                if (blog.val().blogDesc) {
                    let value = blog.val().blogDesc;
                    this.setState({
                        show: true,
                        editMode: true
                    }, () => {
                        this.onChangeHandler(value, 'blogDesc');
                    })
                }
            });
        }
    }

    onSubmitHandler = (event) => {
        event.preventDefault();
        this.setState({ loading: true });
        const formData = {};
        for (let formElementIdentifier in this.state.addBlogForm) {
            formData[formElementIdentifier] = this.state.addBlogForm[formElementIdentifier].value;
        }
        if(!this.state.editMode) {
            this.db.ref('blogs').push(formData).then(() => {
                this.setState({ loading: false });
            });
        } else {
            this.db.ref('blogs/'+this.state.editId).update(formData).then(() => {
                this.setState({ loading: false, editId: null, editMode: false });
            });
        }
    }

    onChangeHandler = (event, id) => {
        const updatedAddBlogForm = {
            ...this.state.addBlogForm
        };
        const updatedFormElement = {
            ...updatedAddBlogForm[id]
        }
        if(event && event.target && event.target.value) {
            updatedFormElement.value = event.target.value;
        } else {
            updatedFormElement.value = event;
        }
        updatedAddBlogForm[id] = updatedFormElement;
        this.setState({
            addBlogForm: updatedAddBlogForm
        })
    }

    render() {
        return (
            <div>
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
                        <form onSubmit={this.onSubmitHandler}>
                            <div className="row">
                                <div className="col-sm-2">
                                    <Input
                                        elementType={this.state.addBlogForm.sort.elementType}
                                        elementConfig={this.state.addBlogForm.sort.elementConfig}
                                        labelFor={this.state.addBlogForm.sort.labelfor}
                                        value={this.state.addBlogForm.sort.value}
                                        changed={(event) => this.onChangeHandler(event, 'sort')} />
                                </div>
                                <div className="col-sm-2">
                                    <Input
                                        elementType={this.state.addBlogForm.blogTech.elementType}
                                        elementConfig={this.state.addBlogForm.blogTech.elementConfig}
                                        labelFor={this.state.addBlogForm.blogTech.labelfor}
                                        value={this.state.addBlogForm.blogTech.value}
                                        changed={(event) => this.onChangeHandler(event, 'blogTech')} />
                                </div>
                                <div className="col-sm-4">
                                    <Input
                                        elementType={this.state.addBlogForm.blogHref.elementType}
                                        elementConfig={this.state.addBlogForm.blogHref.elementConfig}
                                        labelFor={this.state.addBlogForm.blogHref.labelfor}
                                        value={this.state.addBlogForm.blogHref.value}
                                        changed={(event) => this.onChangeHandler(event, 'blogHref')} />
                                </div>
                                <div className="col-sm-4">
                                    <Input
                                        elementType={this.state.addBlogForm.blogTitle.elementType}
                                        elementConfig={this.state.addBlogForm.blogTitle.elementConfig}
                                        labelFor={this.state.addBlogForm.blogTitle.labelfor}
                                        value={this.state.addBlogForm.blogTitle.value}
                                        changed={(event) => this.onChangeHandler(event, 'blogTitle')} />
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-sm-4">
                                    <Input
                                        elementType={this.state.addBlogForm.blogDesc.elementType}
                                        elementConfig={this.state.addBlogForm.blogDesc.elementConfig}
                                        labelFor={this.state.addBlogForm.blogDesc.labelfor}
                                        value={this.state.addBlogForm.blogDesc.value}
                                        changed={(event) => this.onChangeHandler(event, 'blogDesc')} />
                                </div>
                                <div className="col-sm-4">
                                    <Input
                                        elementType={this.state.addBlogForm.blogName.elementType}
                                        elementConfig={this.state.addBlogForm.blogName.elementConfig}
                                        labelFor={this.state.addBlogForm.blogName.labelfor}
                                        value={this.state.addBlogForm.blogName.value}
                                        changed={(event) => this.onChangeHandler(event, 'blogName')} />
                                </div>
                                <div className="col-sm-4">
                                    <Input
                                        elementType={this.state.addBlogForm.blogKeyword.elementType}
                                        elementConfig={this.state.addBlogForm.blogKeyword.elementConfig}
                                        labelFor={this.state.addBlogForm.blogKeyword.labelfor}
                                        value={this.state.addBlogForm.blogKeyword.value}
                                        changed={(event) => this.onChangeHandler(event, 'blogKeyword')} />
                                </div>
                            </div>
                            <Input
                                elementType={this.state.addBlogForm.blogData.elementType}
                                elementConfig={this.state.addBlogForm.blogData.elementConfig}
                                labelFor={this.state.addBlogForm.blogData.labelfor}
                                value={this.state.addBlogForm.blogData.value}
                                changed={(event) => this.onChangeHandler(event, 'blogData')} />
                            <div className="form-group">
                                <button type="submit" className="btn btn-success">{this.state.editMode ? 'EDIT' : 'ADD'}</button>
                            </div>
                        </form>
                    </Modal.Body>
                </Modal>
                <Loader loading={this.state.loading} />
            </div>
        )
    }
}

export default AddBlog;
