import React from "react";
import {BrowserRouter as Router, Route} from "react-router-dom";
import Home from "../Home/Home";
import Header from "../Header/Header";
import SignIn from "../SignIn/SignIn";
import SignUp from "../SignUp/SignUp";
import Settings from "../Settings/Settings";
import ArticleContainer from "../Article/ArticleContainer";
import Post from "../Post/Post";
import UserInfoContainer from "../UserInfo/UserInfoContainer";

class PageRouter extends React.Component<any, { signed: boolean }> {
    render() {
        console.log("Render [ PageRouter ]");

        return (
            <Router>
                <Header/>
                <Route path="/" exact component={Home}/>
                <Route path="/login" component={SignIn}/>
                <Route path="/register" component={SignUp}/>
                <Route path="/article/:name" component={ArticleContainer}/>
                <Route path="/editor" exact component={Post}/>
                <Route path="/editor/:slug" component={Post}/>
                <Route path="/settings" component={Settings}/>
                <Route path="/@:name/" exact component={UserInfoContainer}/>
                <Route path="/@:name/:tab" component={UserInfoContainer}/>
            </Router>
        );
    }
}

export default PageRouter;