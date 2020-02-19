import React from "react";
import {BrowserRouter as Router, Route} from "react-router-dom";
<<<<<<< HEAD
=======
import SignInAdapter from "../Adapter/SignInAdapter";
import SignUpAdapter from "../Adapter/SignUpAdapter";
import SettingsAdapter from "../Adapter/SettingsAdapter";
>>>>>>> master
import UserStore from "../Store/UserStore";
import HomeContainer from "../Container/HomeContainer";
import ArticleContainer from "../Container/ArticleContainer";
import UserInfoContainer from "../Container/UserInfoContainer";
import HeaderContainer from "../Container/HeaderContainer";
import PostContainer from "../Container/PostContainer";
<<<<<<< HEAD
import SettingsContainer from "../Container/SettingsContainer";
import SignUpContainer from "../Container/SignUpContainer";
import SignInContainer from "../Container/SignInContainer";
=======
>>>>>>> master

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
                <HeaderContainer userStore={UserStore.INSTANCE}/>
                <Route path="/" exact component={HomeContainer}/>
<<<<<<< HEAD
                <Route path="/login" component={SignInContainer}/>
                <Route path="/register" component={SignUpContainer}/>
                <Route path="/article/:name" component={ArticleContainer}/>
                <Route path="/editor" exact component={PostContainer}/>
                <Route path="/editor/:slug" component={PostContainer}/>
                <Route path="/settings" component={SettingsContainer}/>
=======
                <Route path="/login" component={SignInAdapter}/>
                <Route path="/register" component={SignUpAdapter}/>
                <Route path="/article/:name" component={ArticleContainer}/>
                <Route path="/editor" exact component={PostContainer}/>
                <Route path="/editor/:slug" component={PostContainer}/>
                <Route path="/settings" component={SettingsAdapter}/>
>>>>>>> master
                <Route path="/@:name/" exact component={UserInfoContainer}/>
                <Route path="/@:name/:tab" component={UserInfoContainer}/>
            </Router>
        );
    }
}

export default PageRouter;