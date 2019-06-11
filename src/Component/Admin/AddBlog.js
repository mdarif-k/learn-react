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
        title: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'Title',
                name: 'title'
            },
            value: '',
            labelfor: "Title"
        },
        desc: {
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
        keywords: {
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
    loading: false
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
        this.setState({ show: false });
    };

    componentWillReceiveProps(nextProps) {
        if (nextProps.show) {
            this.setState({
                show: true
            })
        }
    }

    onSubmitHandler = (event) => {
        event.preventDefault();
        this.setState({loading: true});
        const formData = {};
        for(let formElementIdentifier in this.state.addBlogForm) {
            formData[formElementIdentifier] = this.state.addBlogForm[formElementIdentifier].value;
        }
        this.db.ref('blogs').push(formData).then(() => {
            this.setState({loading: false});
        });
    }

    onChangeHandler = (event, id) => {
        const updatedAddBlogForm = {
            ...this.state.addBlogForm
        };
        const updatedFormElement = {
            ...updatedAddBlogForm[id]
        }
        updatedFormElement.value = event.target.value;
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
                                        elementType={this.state.addBlogForm.title.elementType}
                                        elementConfig={this.state.addBlogForm.title.elementConfig}
                                        labelFor={this.state.addBlogForm.title.labelfor}
                                        value={this.state.addBlogForm.title.value}
                                        changed={(event) => this.onChangeHandler(event, 'title')} />
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-sm-4">
                                    <Input
                                        elementType={this.state.addBlogForm.desc.elementType}
                                        elementConfig={this.state.addBlogForm.desc.elementConfig}
                                        labelFor={this.state.addBlogForm.desc.labelfor}
                                        value={this.state.addBlogForm.desc.value}
                                        changed={(event) => this.onChangeHandler(event, 'desc')} />
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
                                        elementType={this.state.addBlogForm.keywords.elementType}
                                        elementConfig={this.state.addBlogForm.keywords.elementConfig}
                                        labelFor={this.state.addBlogForm.keywords.labelfor}
                                        value={this.state.addBlogForm.keywords.value}
                                        changed={(event) => this.onChangeHandler(event, 'keywords')} />
                                </div>
                            </div>
                            <Input
                                elementType={this.state.addBlogForm.blogData.elementType}
                                elementConfig={this.state.addBlogForm.blogData.elementConfig}
                                labelFor={this.state.addBlogForm.blogData.labelfor}
                                value={this.state.addBlogForm.blogData.value}
                                changed={(event) => this.onChangeHandler(event, 'blogData')} />
                            <div className="form-group">
                                <button type="submit" className="btn btn-success">Add</button>
                            </div>
                        </form>
                    </Modal.Body>
                </Modal>
                <Loader loading={this.state.loading}/>
            </div>
        )
    }
}

export default AddBlog;
