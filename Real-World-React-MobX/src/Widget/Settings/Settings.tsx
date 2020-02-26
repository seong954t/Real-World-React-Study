import React from "react";
import SettingsProps from "../Props/SettingsProps";
import "../Style/Form/form.less";

export default class Settings extends React.Component<SettingsProps, any> {

    render() {
        const {password, email, username, bio, image, onChangeInputAndTextArea, onSubmit, onClickLogout} = this.props;

        console.log("Render [ Settings ]");

        return (
            <div className="container form-wrapper">
                <div className="col-6">
                    <h1>Your Settings</h1>
                    <form className="sign-form" onSubmit={onSubmit}>
                        <fieldset className="form-group">
                            <input type="text" placeholder="URL of profile picture" value={image}
                                   name="image" onChange={onChangeInputAndTextArea}/>
                        </fieldset>
                        <fieldset className="form-group">
                            <input type="text" placeholder="Username"
                                   name="username" value={username}
                                   onChange={onChangeInputAndTextArea}/>
                        </fieldset>
                        <fieldset className="form-group">
                            <textarea rows={8} placeholder="Short bio about you" value={bio}
                                      name="bio" onChange={onChangeInputAndTextArea}/>
                        </fieldset>
                        <fieldset className="form-group">
                            <input type="text" placeholder="Email" name="email"
                                   onChange={onChangeInputAndTextArea} value={email}/>
                        </fieldset>
                        <fieldset className="form-group">
                            <input type="password" placeholder="New Password"
                                   name="password" onChange={onChangeInputAndTextArea} value={password}/>
                        </fieldset>
                        <button className="button-success" type="submit">Update Settings</button>
                    </form>
                    <hr/>
                    <button className="button-danger" onClick={onClickLogout}>Or click here to
                        logout.
                    </button>
                </div>
            </div>
        )
    }
}