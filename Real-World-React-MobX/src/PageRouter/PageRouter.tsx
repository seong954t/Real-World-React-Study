import React from "react";
import {BrowserRouter as Router, Route} from "react-router-dom";
import Home from "../Home/Home";
import Header from "../Header/Header";
import Settings from "../Settings/Settings";
import ArticleContainer from "../Article/ArticleContainer";
import Post from "../Post/Post";
import UserInfoContainer from "../UserInfo/UserInfoContainer";
import SignInAdapter from "../Adapter/SignInAdapter";
import SignUpAdapter from "../Adapter/SignUpAdapter";

class PageRouter extends React.Component<any, any> {

    static pageRoute(history: any, destination: string){
        history.replace(destination);
    }

    static pageRouteAfterPromise(promise: Promise<any>, history: any, destination: string){
        promise.then(() => {
            history.replace(destination);
        }).catch((error) => {
            console.log("error", error);
        })
    }

    render() {
        console.log("Render [ PageRouter ]");

        return (
            <Router>
                <Header/>
                <Route path="/" exact component={Home}/>
                <Route path="/login" component={SignInAdapter}/>
                <Route path="/register" component={SignUpAdapter}/>
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