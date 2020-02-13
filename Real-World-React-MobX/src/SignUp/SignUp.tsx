import React from "react";
import {Link} from "react-router-dom";
import {inject, observer} from "mobx-react";

@inject("userStore", "authStore")
@observer
class SignUp extends React.Component<any, any> {

    componentDidMount(): void {
        console.log("componentDidMount [ SignUp ]")
        this.props.authStore.resetAuthInfo();
    }

    handleSignUp = (e: any) => {
        e.preventDefault();
        this.props.authStore.registration(this.props.userStore)
    }

    handleChange = (e: any) => {
        this.props.authStore.setAuthInfo(e.target.name, e.target.value)
    }

    errorElement = (errors: string[]) => (
        <ul className="error-message text-left">
            {errors.map((msg, _) => (
                <li>{msg}</li>
            ))}
        </ul>
    )

    render() {
        const {username, email, password, errors} = this.props.authStore;

        console.log("Render [ SignUp ]")
        console.log(this.props.authStore.errors)

        return (
            <div className="container text-center">
                <div className="col-6 m-auto">
                    <h1 className="mb-2">Sign Up</h1>
                    <Link to={"./login"} className="mb-2">Have an account?</Link>
                    {errors.length !== 0 ? this.errorElement(errors) : ''}
                    <form className="text-right m-auto" onSubmit={this.handleSignUp}>
                        <fieldset className="form-group">
                            <input type="text" placeholder="Username" className="form-control form-control-lg"
                                   value={username} onChange={this.handleChange} name="username"/>
                        </fieldset>
                        <fieldset className="form-group">
                            <input type="text" placeholder="Email" className="form-control form-control-lg"
                                   value={email} onChange={this.handleChange} name="email"/>
                        </fieldset>
                        <fieldset className="form-group">
                            <input type="password" placeholder="Password" className="form-control form-control-lg"
                                   value={password} onChange={this.handleChange} name="password"/>
                        </fieldset>
                        <button className="btn btn-lg btn-success" type="submit">Sign Up</button>
                    </form>
                </div>
            </div>
        );
    }
}

export default SignUp;