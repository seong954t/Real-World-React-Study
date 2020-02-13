import React from "react";
import Auth from "../Auth/Auth";
import RealWorldApi from "../RealWordApi/RealWorldApi";
import SettingDTO from "../DTO/SettingDTO";


class Settings extends React.Component<any, SettingDTO> {

    constructor(props: any) {
        super(props);
        const user = Auth.getUserInfo();
        if (user !== null) {
            this.state = {
                image: user.image,
                username: user.username,
                bio: user.bio,
                email: user.email,
                password: ''
            };
        }
    }

    handleUpdateSettings = (e: any) => {
        e.preventDefault();
        const {image, username, bio, email, password} = this.state;
        RealWorldApi.updateUser(image, username, bio, email, password);
    }

    handleChange = (e: any) => {
        e.preventDefault();
        this.setState({
            [e.target.name]: e.target.value
        } as Pick<SettingDTO, keyof SettingDTO>)
    }

    handleLogout = (e: any) => {
        e.preventDefault();
        RealWorldApi.logout();
    }

    render() {
        return (
            <div className="container text-center mt-4">
                <div className="col-6 m-auto">
                    <h1 className="mb-2">Your Settings</h1>
                    <form className="text-right m-auto" onSubmit={this.handleUpdateSettings}>
                        <fieldset className="form-group">
                            <input type="text" placeholder="URL of profile picture" value={this.state.image}
                                   className="form-control" name="image" onChange={this.handleChange}/>
                        </fieldset>
                        <fieldset className="form-group">
                            <input type="text" placeholder="Username"
                                   className="form-control form-control-lg" name="username" value={this.state.username}
                                   onChange={this.handleChange}/>
                        </fieldset>
                        <fieldset className="form-group">
                            <textarea rows={8} placeholder="Short bio about you" value={this.state.bio}
                                      className="form-control form-control-lg" name="bio" onChange={this.handleChange}/>
                        </fieldset>
                        <fieldset className="form-group">
                            <input type="text" placeholder="Email" className="form-control form-control-lg" name="email"
                                   onChange={this.handleChange} value={this.state.email}/>
                        </fieldset>
                        <fieldset className="form-group">
                            <input type="password" placeholder="New Password" className="form-control form-control-lg"
                                   name="password" onChange={this.handleChange} value={this.state.password}/>
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