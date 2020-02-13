import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Header from "../Header/Header";
import SignIn from "../SignIn/SignIn";
import SignUp from "../SignUp/SignUp";
import Home from "../Home/Home";
import ArticleContainer from "../Article/ArticleContainer";
import Post from "../Post/Post";
import Settings from "../Settings/Settings";
import UserInfoContainer from "../UserInfo/UserInfoContainer";

class PageRouter extends React.Component<any, {signed: boolean}>{
    render() {
        return (
            <Router>
                <Header></Header>
                {/*<Route path="/" exact render={(props) => (<Home {...props} signed={this.state.signed}></Home>)}></Route>*/}
                <Route path="/" exact component={Home}></Route>
                <Route path="/login" component={SignIn}></Route>
                <Route path="/register" component={SignUp}></Route>
                <Route path="/article/:name" component={ArticleContainer}></Route>
                <Route path="/editor" exact component={Post}></Route>
                <Route path="/editor/:slug" component={Post}></Route>
                <Route path="/settings" component={Settings}></Route>
                <Route path="/@:name/" exact component={UserInfoContainer}></Route>
                <Route path="/@:name/:tab" component={UserInfoContainer}></Route>
            </Router>
        );
    }
}

export default PageRouter;