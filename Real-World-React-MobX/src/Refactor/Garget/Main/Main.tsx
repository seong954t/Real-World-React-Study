import {Link} from "react-router-dom";
import React from "react";
import LINK from "../../../PageRouter/Link";

interface Props {
    username?: string,
    image?: string
}

export class Main extends React.Component<Props, any> {

    signedHeader = (username: string, image: string) => (
        <ul className="header-list-group">
            <li className="nav-item">
                <Link to={LINK.HOME} className="nav-link text-secondary">Home</Link>
            </li>
            <li className="nav-item">
                <Link to={LINK.EDITOR()} className="nav-link text-secondary">
                    <i className="ion-compose"/>
                    &nbsp;New Post
                </Link>
            </li>
            <li className="nav-item">
                <Link to={LINK.SETTINGS} className="nav-link text-secondary">
                    <i className="ion-gear-a"/>
                    &nbsp;Settings
                </Link>
            </li>
            <li className="nav-item">
                <Link to={LINK.USER(username)} className="nav-link text-secondary">
                    <img src={image}
                         alt=""
                         className="header-author-img"/>
                    {username}
                </Link>
            </li>
        </ul>
    );

    defaultHeader = (
        <ul className="header-list-group">
            <li className="nav-item">
                <Link to={LINK.HOME} className="nav-link text-secondary">Home</Link>
            </li>
            <li className="nav-item">
                <Link to={LINK.SIGN_IN} className="nav-link text-secondary">Sign In</Link>
            </li>
            <li className="nav-item">
                <Link to={LINK.SIGN_UP} className="nav-link text-secondary">Sign up</Link>
            </li>
        </ul>
    );

    render() {
        const {username, image} = this.props;

        console.log("Render [ Header ]");

        return (
            <nav className="container header-container">
                <div className="nav-brand-wrapper">
                    <Link to={LINK.HOME} className="nav-brand">conduit</Link>
                </div>
                {username && image ? this.signedHeader(username, image) : this.defaultHeader}
            </nav>
        );
    }
}