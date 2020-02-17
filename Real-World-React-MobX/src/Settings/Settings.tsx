import React from "react";
import {inject, observer} from "mobx-react";
import PageRouter from "../PageRouter/PageRouter";
import {RouteComponentProps} from "react-router";
import UserStore from "../Store/UserStore";
import AuthStore from "../Store/AuthStore";

interface Props extends RouteComponentProps {
    userStore: UserStore,
    authStore: AuthStore
}

@inject("userStore", "authStore")
@observer
class Settings extends React.Component<Props, any> {

    componentDidMount(): void {
        console.log("componentDidMount [ Settings ]");
        this.props.userStore.resetUpdatingUser();
    }

    handleUpdateSettings = (e: any) => {
        e.preventDefault();
        PageRouter.pageRouteAfterPromise(
            this.props.userStore.updateUser(),
            this.props.history,
            "/")
    };

    handleChange = (e: any) => {
        if (e.target.name === "password") {
            this.props.userStore.setPassword(e.target.value);
        } else {
            this.props.userStore.setUpdatingUserInfo(e.target.name, e.target.value);
        }
    };

    handleLogout = (e: any) => {
        e.preventDefault();
        this.props.authStore.logout(this.props.userStore);
        PageRouter.pageRoute(this.props.history, "/")
    };

    render() {
        const {password} = this.props.userStore;
        const {email, username, bio, image} = this.props.userStore.updatingUser;

        console.log("Render [ Settings ]");

        return (
            <div className="container text-center mt-4">
                <div className="col-6 m-auto">
                    <h1 className="mb-2">Your Settings</h1>
                    <form className="text-right m-auto" onSubmit={this.handleUpdateSettings}>
                        <fieldset className="form-group">
                            <input type="text" placeholder="URL of profile picture" value={image}
                                   className="form-control" name="image" onChange={this.handleChange}/>
                        </fieldset>
                        <fieldset className="form-group">
                            <input type="text" placeholder="Username"
                                   className="form-control form-control-lg" name="username" value={username}
                                   onChange={this.handleChange}/>
                        </fieldset>
                        <fieldset className="form-group">
                            <textarea rows={8} placeholder="Short bio about you" value={bio}
                                      className="form-control form-control-lg" name="bio" onChange={this.handleChange}/>
                        </fieldset>
                        <fieldset className="form-group">
                            <input type="text" placeholder="Email" className="form-control form-control-lg" name="email"
                                   onChange={this.handleChange} value={email}/>
                        </fieldset>
                        <fieldset className="form-group">
                            <input type="password" placeholder="New Password" className="form-control form-control-lg"
                                   name="password" onChange={this.handleChange} value={password}/>
                        </fieldset>
                        <button className="btn btn-lg btn-success" type="submit">Update Settings</button>
                    </form>
                    <hr/>
                    <button className="btn btn-outline-danger float-left" onClick={this.handleLogout}>Or click here to
                        logout.
                    </button>
                </div>
            </div>
        )
    }
}

export default Settings;