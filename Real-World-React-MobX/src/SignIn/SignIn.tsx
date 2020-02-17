import React from "react";
import {Link} from "react-router-dom";
import {inject, observer} from "mobx-react";
import PageRouter from "../PageRouter/PageRouter";
import SignInProps from "../Props/SignInProps";

// @inject("userStore", "authStore")
@observer
export default class SignIn extends React.Component<SignInProps, any> {

    // componentDidMount(): void {
    //     console.log("componentDidMount [ SignIn ]");
    //     this.props.authStore.resetAuthInfo();
    // }

    // handleSignIn = (e: any) => {
    //     e.preventDefault();
    //     const loginPromise = this.props.authStore.login(this.props.userStore);
    //     if(this.props.authStore.errors.length === 0){
    //         PageRouter.pageRouteAfterPromise(loginPromise, this.props.history, "/");
    //     }
    // };
    //
    // handleChange = (e: any) => {
    //     this.props.authStore.setAuthInfo(e.target.name, e.target.value)
    // };

    errorElement = (errors: string[]) => (
        <ul className="error-message text-left">
            {errors.map((msg, index: number) => (
                <li key={index}>{msg}</li>
            ))}
        </ul>
    );

    render() {
        // const {email, password, errors} = this.props.authStore;
        const {email, password, errors, signInHandler, changeHandler} = this.props;

        console.log("Render [ SignIn ]");

        return (
            <div className="container text-center">
                <div className="col-6 m-auto">
                    <h1 className="mb-2">Sign In</h1>
                    <Link to={"./register"} className="mb-2">Need an account?</Link>
                    {errors.length !== 0 ? this.errorElement(errors) : ''}
                    <form className="text-right m-auto" onSubmit={signInHandler}>
                        <fieldset className="form-group">
                            <input type="text" placeholder="Email" className="form-control form-control-lg"
                                   value={email} name="email" onChange={changeHandler}/>
                        </fieldset>
                        <fieldset className="form-group">
                            <input type="password" placeholder="Password" className="form-control form-control-lg"
                                   value={password} name="password" onChange={changeHandler}/>
                        </fieldset>
                        <button className="btn btn-lg btn-success" type="submit">Sign in</button>
                    </form>
                </div>
            </div>
        );
    }
}

