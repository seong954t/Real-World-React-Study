import React from "react";
import './Header.css'
import {Link} from "react-router-dom";
import Auth from "../Auth/Auth";
import {inject, observer} from "mobx-react";

@inject("userStore")
@observer
class Header extends React.Component<any, any> {

    componentDidMount(): void {
        console.log("componentDidMount [ Header ]");
        this.props.userStore.getCurrentUser();
    }

    signedHeader = (username: string, image: string) => (
        <ul className="nav list-unstyled float-right justify-content-end">

            <li className="nav-item">
                <Link to={"/"} className="nav-link text-secondary">Home</Link>
            </li>
            <li className="nav-item">
                <Link to={"/editor"} className="nav-link text-secondary">
                    <i className="ion-compose"/>
                    &nbsp;New Post
                </Link>
            </li>
            <li className="nav-item">
                <Link to={"/settings"} className="nav-link text-secondary">
                    <i className="ion-gear-a"/>
                    &nbsp;Settings
                </Link>
            </li>
            <li className="nav-item">
                <Link to={`/@${username}`} className="nav-link text-secondary">
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
                <Link to={"/"} className="nav-link text-secondary">Home</Link>
            </li>
            <li className="nav-item">
                <Link to={"/login"} className="nav-link text-secondary">Sign In</Link>
            </li>
            <li className="nav-item">
                <Link to={"/register"} className="nav-link text-secondary">Sign up</Link>
            </li>
        </ul>
    );

    render() {
        const userInfo = this.props.userStore.user;

        console.log("Render [ Header ]");

        return (
            <nav className="navbar container">
                <div className="float-left">
                    <Link to={"/"} className="nav-brand nav justify-content-start">conduit</Link>
                </div>
                {Auth.isSigned() ? this.signedHeader(userInfo.username, userInfo.image) : this.defaultHeader}
            </nav>
        );
    }
}

export default Header;