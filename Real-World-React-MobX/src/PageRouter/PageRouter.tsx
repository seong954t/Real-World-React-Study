import React from "react";
import {BrowserRouter as Router, Route} from "react-router-dom";
import UserStore from "../Store/UserStore";
import HomeContainer from "../Container/Page/Home/HomeContainer";
import ArticleContainer from "../Container/Page/Article/ArticleContainer";
import UserInfoContainer from "../Container/Page/Profile/UserInfoContainer";
import HeaderContainer from "../Container/Header/HeaderContainer";
import PostContainer from "../Container/Page/Post/PostContainer";
import SignInContainer from "../Container/Page/Sign/SignInContainer";
import SignUpContainer from "../Container/Page/Sign/SignUpContainer";
import SettingsContainer from "../Container/Page/Settings/SettingsContainer";
import * as H from "history";
import {TestPage} from "../Refactor/TestPage";
import {HomePage} from "../Refactor/Page/Home/View/HomePage";
import {UserService} from "../Refactor/Service/UserService";
import {ProfilePage} from "../Refactor/Page/Profile/View/ProfilePage";
import {SettingsPage} from "../Refactor/Page/Settings/View/SettingsPage";
import {PostPage} from "../Refactor/Page/Post/View/PostPage";

class PageRouter extends React.Component<any, any> {

    constructor(props: any) {
        super(props);
        UserService.instance.loadUser();
    }

    static pageRoute(history: H.History, destination: string){
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
                {/*<HeaderContainer userStore={UserStore.INSTANCE}/>*/}
                <Route path="/" exact component={HomeContainer}/>
                <Route path="/login" component={SignInContainer}/>
                <Route path="/register" component={SignUpContainer}/>
                <Route path="/article/:name" component={ArticleContainer}/>
                <Route path="/editor" exact component={PostContainer}/>
                <Route path="/editor/:slug" component={PostContainer}/>
                <Route path="/settings" component={SettingsContainer}/>
                <Route path="/@:name/" exact component={UserInfoContainer}/>
                <Route path="/@:name/:tab" component={UserInfoContainer}/>
                <Route path="/test" component={TestPage}/>

                <Route path="/refactor" exact component={HomePage}/>
                {/*<Route path="/refactor/login" component={SignInContainer}/>*/}
                {/*<Route path="/refactor/register" component={SignUpContainer}/>*/}
                {/*<Route path="/refactor/article/:name" component={ArticleContainer}/>*/}
                <Route path="/refactor/editor" exact component={PostPage}/>
                {/*<Route path="/refactor/editor/:slug" component={PostContainer}/>*/}
                <Route path="/refactor/settings" component={SettingsPage}/>
                <Route path="/refactor/@:name/" exact component={ProfilePage}/>
                <Route path="/refactor/@:name/:tab" component={ProfilePage}/>
            </Router>
        );
    }
}

export default PageRouter;