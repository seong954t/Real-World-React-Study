import React from "react";
import SettingsProps from "../Props/SettingsProps";

export default class Settings extends React.Component<SettingsProps, any> {

    render() {
        const {password, email, username, bio, image, onChangeInputAndTextArea, onSubmit, onClickLogout} = this.props;

        console.log("Render [ Settings ]");

        return (
            <div className="container text-center mt-4">
                <div className="col-6 m-auto">
                    <h1 className="mb-2">Your Settings</h1>
                    <form className="text-right m-auto" onSubmit={onSubmit}>
                        <fieldset className="form-group">
                            <input type="text" placeholder="URL of profile picture" value={image}
                                   className="form-control" name="image" onChange={onChangeInputAndTextArea}/>
                        </fieldset>
                        <fieldset className="form-group">
                            <input type="text" placeholder="Username"
                                   className="form-control form-control-lg" name="username" value={username}
                                   onChange={onChangeInputAndTextArea}/>
                        </fieldset>
                        <fieldset className="form-group">
                            <textarea rows={8} placeholder="Short bio about you" value={bio}
                                      className="form-control form-control-lg" name="bio" onChange={onChangeInputAndTextArea}/>
                        </fieldset>
                        <fieldset className="form-group">
                            <input type="text" placeholder="Email" className="form-control form-control-lg" name="email"
                                   onChange={onChangeInputAndTextArea} value={email}/>
                        </fieldset>
                        <fieldset className="form-group">
                            <input type="password" placeholder="New Password" className="form-control form-control-lg"
                                   name="password" onChange={onChangeInputAndTextArea} value={password}/>
                        </fieldset>
                        <button className="btn btn-lg btn-success" type="submit">Update Settings</button>
                    </form>
                    <hr/>
                    <button className="btn btn-outline-danger float-left" onClick={onClickLogout}>Or click here to
                        logout.
                    </button>
                </div>
            </div>
        )
    }
}