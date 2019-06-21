import React, { Component } from 'react';
import firebase from 'firebase';
import Template from '../UI/Common/Template';
import { Link } from 'react-router-dom';
import Loader from '../UI/Common/Loader';

const INITIAL_STATE = {
    blogData: [],
    leftNav: [],
    selectedBlog: {},
    loading: true,
    blogEditId: null,
    searchValue: '',
    searchedBlogs: []
}

class Blog extends Component {

    constructor(props) {
        super(props);
        this.state = INITIAL_STATE;
    }

    componentDidMount() {
        this.db = firebase.database();
        this.listenForChange();
        this.admin = JSON.parse(localStorage.getItem('admin'));
    }

    listenForChange() {
        this.setState({ blogData: [] }, () => {
            this.db.ref('blogs').on('child_added', snapshot => {
                let blog = snapshot.val();
                blog.blogId = snapshot.key;
                blog.blogTech = blog.blogTech.toUpperCase();
                let blogData = this.state.blogData;
                blogData.push(blog);
                this.setState({ blogData: blogData }, () => {
                    this.loadBlog(this.props);
                });
            });
        });
    }

    componentWillReceiveProps(nextProps) {
        this.loadBlog(nextProps);
    }

    loadBlog = (nextProps) => {
        this.setState({ loading: true })
        if (nextProps.location.pathname === undefined || nextProps.location.pathname === '/') return;
        let blog = {};
        let leftNav = [];
        if (this.state.blogData.length > 0) {
            blog = this.state.blogData.find((blog) => {
                if (blog.blogHref.indexOf('/') !== 0) {
                    blog.blogHref = '/' + blog.blogHref;
                }
                return blog.blogHref.replace(/\\/g, "/") === nextProps.location.pathname;
            });
            if (blog && blog.blogTech) {
                leftNav = this.state.blogData.filter((b) => {
                    return blog.blogTech === b.blogTech;
                });
                leftNav.map((ln) => {
                    if (ln.blogHref.indexOf('/') !== 0) {
                        ln.blogHref = '/' + ln.blogHref;
                    }
                    return null;
                })
            }
            this.setState({ selectedBlog: blog, leftNav: leftNav, leftNavActive: (blog && blog.blogHref ? blog.blogHref : []), loading: false });
        }
        window.scroll(0, 0);
    }

    editBlogHandler = (id) => {
        this.props.edit(id);
    }

    changeSearch = e => {
        this.setState({
            searchValue: e.target.value
        }, () => {
            if (this.state.searchValue === '' || this.state.searchValue.length < 3) {
                this.setState({
                    searchedBlogs: []
                });
                return;
            };
            let data = this.state.blogData.filter((b) => {
                return b.blogData.toUpperCase().indexOf(this.state.searchValue.toUpperCase()) > -1;
            });
            this.setState({
                searchedBlogs: data
            });
        });

    }

    render() {
        let leftNav;
        let activeStyle = null;
        let blogTech = null;
        let blogName = null;
        let blogData = null;
        if (this.state.leftNav.length > 0) {
            leftNav = this.state.leftNav.map((nav, i) => {
                if (nav.blogHref === this.state.leftNavActive) {
                    activeStyle = 'list-group-item list-group-item-action active'
                } else {
                    activeStyle = null;
                }
                return <Link
                    className={activeStyle ? activeStyle : 'list-group-item list-group-item-action'}
                    id="list-home-list"
                    data-toggle="list"
                    role="tab"
                    to={nav.blogHref}
                    key={i}
                >
                    {nav.blogName}
                </Link>
            });
        }

        if (this.state.selectedBlog && this.state.selectedBlog.blogTech) {
            blogTech = (
                <div className="card text-white bg-info text-center bor-rad">
                    <h2 className="card-header bor-rad">{this.state.selectedBlog.blogTech}</h2>
                </div>
            )
        }

        if (this.state.selectedBlog && this.state.selectedBlog.blogName) {
            blogName = <h4 className="card-header text-success">{this.state.selectedBlog.blogName} {this.admin ? <span><button className="btn btn-primary" onClick={() => this.editBlogHandler(this.state.selectedBlog.blogId)}>Edit</button></span> : null}</h4>
        }

        if (this.state.selectedBlog && this.state.selectedBlog.blogData) {
            blogData = <Template html={this.state.selectedBlog.blogData} />;
        }
        let searchedBlogs = [];
        let searchInputStyle = { margin: '0 auto', width: '50%', marginTop: '15px', marginBottom: '15px' }
        let searchStyle = { margin: '0 auto', width: '50%', marginBottom: '15px' }
        if (this.state.searchedBlogs.length > 0) {
            searchedBlogs = (
                <ul class="list-group container" style={searchStyle}>
                    {
                        this.state.searchedBlogs.map((b) => {
                            return <Link class="list-group-item" to={b.blogHref}>{b.blogName}</Link>
                        })
                    }
                </ul>
            )
        }


        return (
            <div>
                <Loader loading={this.state.loading} />

                <div className="form-group" style={searchInputStyle}>
                    <input type="text" className="form-control" id="Search" placeholder="Search" value={this.state.searchValue} onChange={this.changeSearch} />
                </div>

                {searchedBlogs}

                {blogTech}
                {
                    blogData && blogName ? (
                        <div className="container-fluid pt-3 mt-auto">
                            <div className="row">
                                <div className="col-sm-3">
                                    <div className="list-group sticky-top" id="list-tab" role="tablist">
                                        {leftNav}
                                    </div>
                                </div>
                                <div className="col-sm-9">
                                    <div className="card border-info">
                                        {blogName}
                                        {blogData}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : <div className="alert alert-danger">Opps! Blog not found</div>
                }
            </div>
        )
    }
}

export default Blog;