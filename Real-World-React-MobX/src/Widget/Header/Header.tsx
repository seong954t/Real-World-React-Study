import React from "react";
import './Header.less'
import {Link} from "react-router-dom";
import HeaderProps from "../Props/HeaderProps";

export default class Header extends React.Component<HeaderProps, any> {

    signedHeader = (username: string, image: string) => (
        <ul className="nav list-unstyled float-right justify-content-end">

            <li className="nav-item">
                <Link to={this.props.linkToHome || ''} className="nav-link text-secondary">Home</Link>
            </li>
            <li className="nav-item">
                <Link to={this.props.linkToEditor || ''} className="nav-link text-secondary">
                    <i className="ion-compose"/>
                    &nbsp;New Post
                </Link>
            </li>
            <li className="nav-item">
                <Link to={this.props.linkToSettings || ''} className="nav-link text-secondary">
                    <i className="ion-gear-a"/>
                    &nbsp;Settings
                </Link>
            </li>
            <li className="nav-item">
                <Link to={this.props.linkToUser || ''} className="nav-link text-secondary">
                    <img src={image}
                         alt=""
                         className="header-author-img"/>
                    {username}
                </Link>
            </li>
        </ul>
    );

    defaultHeader = (
        <ul className="nav list-unstyled float-right justify-content-end">
            <li className="nav-item">
                <Link to={this.props.linkToHome || ''} className="nav-link text-secondary">Home</Link>
            </li>
            <li className="nav-item">
                <Link to={this.props.linkToSignIn || ''} className="nav-link text-secondary">Sign In</Link>
            </li>
            <li className="nav-item">
                <Link to={this.props.linkToSignUp || ''} className="nav-link text-secondary">Sign up</Link>
            </li>
        </ul>
    );

    render() {
        const {username, image, defaultHeader, title} = this.props;

        console.log("Render [ Header ]");

        return (
            <nav className="navbar container">
                <div className="float-left">
                    <Link to={this.props.linkToHome || ''} className="nav-brand nav justify-content-start">{title}</Link>
                </div>
                {
                    defaultHeader && defaultHeader === true ?
                        this.defaultHeader :
                        this.signedHeader(username ? username : "", image ? image : "")
                }
            </nav>
        );
    }
}