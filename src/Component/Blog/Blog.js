import React, { Component } from 'react';
import firebase from 'firebase';
import Template from '../UI/Common/Template';
import { Link } from 'react-router-dom';

const INITIAL_STATE = {
    blogData: [],
    leftNav: [],
    selectedBlog: {}
}

class Blog extends Component {

    constructor(props) {
        super(props);
        this.state = INITIAL_STATE;
    }

    componentDidMount() {
        this.db = firebase.database();
        this.listenForChange();
    }

    listenForChange() {
        this.setState({ blogData: [] }, () => {
            this.db.ref('blogs').on('child_added', snapshot => {
                let blog = snapshot.val();
                blog.blogTech = blog.blogTech.toUpperCase();
                let blogData = this.state.blogData;
                blogData.push(blog);
                this.setState({ blogData: blogData }, () => {
                    this.loadBlog(this.props);
                });
            });
        });
    }

    componentDidUpdate() {
    }


    componentWillReceiveProps(nextProps) {
        this.loadBlog(nextProps);
    }

    loadBlog = (nextProps) => {
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
            this.setState({ selectedBlog: blog, leftNav: leftNav, leftNavActive: (blog && blog.blogHref ? blog.blogHref : []) });
        }
        window.scroll(0, 0);
    }

    render() {
        let leftNav;
        let activeStyle = null;
        let blogTech = null;
        let blogName = null;
        let blogData = null;
        let loading = true;
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
            loading = false;
            blogTech = (
                <div className="card text-white bg-info text-center bor-rad">
                    <h2 className="card-header bor-rad">{this.state.selectedBlog.blogTech}</h2>
                </div>
            )
        }

        if (this.state.selectedBlog && this.state.selectedBlog.blogName) {
            blogName = <h4 className="card-header text-success">{this.state.selectedBlog.blogName}</h4>
        }

        if (this.state.selectedBlog && this.state.selectedBlog.blogData) {
            blogData = <Template html={this.state.selectedBlog.blogData} />;
        }

        if(loading) {
            loading = false;
        }

        return (
            <div>
                {loading ? <div className="loading">Loading&#8230;</div> : null}
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