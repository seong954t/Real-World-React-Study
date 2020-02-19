import React from "react";
import {BrowserRouter as Router, Route} from "react-router-dom";
import SignInAdapter from "../Adapter/SignInAdapter";
import SignUpAdapter from "../Adapter/SignUpAdapter";
import SettingsAdapter from "../Adapter/SettingsAdapter";
import HeaderAdapter from "../Adapter/HeaderAdapter";
import UserStore from "../Store/UserStore";
import PostAdapter from "../Adapter/PostAdapter";
import HomeContainer from "../Container/HomeContainer";
import ArticleContainer from "../Container/ArticleContainer";
import UserInfoContainer from "../Container/UserInfoContainer";

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
                <HeaderAdapter userStore={UserStore.INSTANCE}/>
                <Route path="/" exact component={HomeContainer}/>
                <Route path="/login" component={SignInAdapter}/>
                <Route path="/register" component={SignUpAdapter}/>
                <Route path="/article/:name" component={ArticleContainer}/>
                <Route path="/editor" exact component={PostAdapter}/>
                <Route path="/editor/:slug" component={PostAdapter}/>
                <Route path="/settings" component={SettingsAdapter}/>
                <Route path="/@:name/" exact component={UserInfoContainer}/>
                <Route path="/@:name/:tab" component={UserInfoContainer}/>
            </Router>
        );
    }
}

export default PageRouter;