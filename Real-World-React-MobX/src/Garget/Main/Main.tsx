import {Link} from "react-router-dom";
import React, {ReactNode} from "react";
import LINK from "../../PageRouter/Link";
import "./Main.less";
// @ts-ignore
import {WidgetMiniInfo, WidgetMiniInfoType} from "../../Widget/MiniInfo/WidgetMiniInfo";
import {UserService} from "../../Service/UserService";
import {observer} from "mobx-react";
import Auth from "../../Auth/Auth";

interface Props{
    children?: ReactNode
}

@observer
export class Main extends React.Component<Props> {
    readonly userService = UserService.instance;

    signedHeader = (username: string, image: string) => (
        <ul className="header-tab-list">
            <li className="header-tab-item">
                <Link to={LINK.HOME} className="header-link ">Home</Link>
            </li>
            <li className="header-tab-item">
                <Link to={LINK.EDITOR()} className="header-link ">
                    <i className="ion-compose"/>
                    &nbsp;New Post
                </Link>
            </li>
            <li className="header-tab-item">
                <Link to={LINK.SETTINGS} className="header-link ">
                    <i className="ion-gear-a"/>
                    &nbsp;Settings
                </Link>
            </li>
            <li className="header-tab-item">
                <Link to={LINK.USER(username)} className="header-link">
                    <WidgetMiniInfo src={image}
                                    imageSize={"26px"}
                                    title={""}
                                    subtitle={username}
                                    subtitleColor={"#AAAAAA"}
                                    subtitleFontSize={"18px"}
                                    type={WidgetMiniInfoType.INLINE}/>
                </Link>
            </li>
        </ul>
    );

    defaultHeader = (
        <ul className="header-tab-list">
            <li className="header-tab-item">
                <Link to={LINK.HOME} className="header-link ">Home</Link>
            </li>
            <li className="header-tab-item">
                <Link to={LINK.SIGN_IN} className="header-link ">Sign In</Link>
            </li>
            <li className="header-tab-item">
                <Link to={LINK.SIGN_UP} className="header-link ">Sign up</Link>
            </li>
        </ul>
    );

    render() {
        const {image, username} = this.userService.user;

        console.log("Render [ Header ]");

        return (
            <>
                <nav className="container main-header-container">
                    <div className="main-header-logo-wrapper">
                        <Link to={LINK.HOME} className="main-header-logo">conduit</Link>
                    </div>
                    {Auth.isSigned() ? this.signedHeader(username, image || '') : this.defaultHeader}
                </nav>
                <section>
                    {this.props.children}
                </section>
            </>
        );
    }
}