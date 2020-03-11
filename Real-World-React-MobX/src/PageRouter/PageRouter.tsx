import React from "react";
import {BrowserRouter as Router, Route} from "react-router-dom";
import * as H from "history";
import {HomePage} from "../Page/Home/View/HomePage";
import {UserService} from "../Service/UserService";
import {ProfilePage} from "../Page/Profile/View/ProfilePage";
import {SettingsPage} from "../Page/Settings/View/SettingsPage";
import {PostPage} from "../Page/Post/View/PostPage";
import {SignUpPage} from "../Page/Sign/View/SignUpPage";
import {SignInPage} from "../Page/Sign/View/SignInPage";
import {observer} from "mobx-react";
import {ArticlePage} from "../Page/Article/View/ArticlePage";

@observer
class PageRouter extends React.Component<any> {
    readonly userService = UserService.instance;

    constructor(props: any) {
        super(props);
        this.userService.loadUser();
    }

    static pageRoute(history: H.History, destination: string){
        history.replace(destination);
    }

    static pageRouteAfterPromise(promise: Promise<any>, history: H.History, destination: string){
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
                {
                    this.userService.isLoad ?
                    (<>
                        <Route path="/" exact component={HomePage}/>
                        <Route path="/login" component={SignInPage}/>
                        <Route path="/register" component={SignUpPage}/>
                        <Route path="/article/:name" component={ArticlePage}/>
                        <Route path="/editor" exact component={PostPage}/>
                        <Route path="/editor/:slug" component={PostPage}/>
                        <Route path="/settings" component={SettingsPage}/>
                        <Route path="/@:name/" exact component={ProfilePage}/>
                        <Route path="/@:name/:tab" component={ProfilePage}/>
                    </>) : ''
                }

            </Router>
        );
    }
}

export default PageRouter;