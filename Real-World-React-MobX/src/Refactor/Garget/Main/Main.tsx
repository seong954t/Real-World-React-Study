import {Link} from "react-router-dom";
import React, {ReactNode} from "react";
import LINK from "../../../PageRouter/Link";
import "./Main.less";
// @ts-ignore
import {WidgetMiniInfo, WidgetMiniInfoType} from "../../Widget/MiniInfo/WidgetMiniInfo";
import {UserService} from "../../Service/UserService";
import {observer} from "mobx-react";

interface Props{
    children?: ReactNode
}

@observer
export class Main extends React.Component<Props, any> {
    readonly userService = UserService.instance;

    signedHeader = (username: string, image: string) => (
        <ul className="header-tab-list">
            <li className="header-tab-item">
                <Link to={LINK.REFACTOR.HOME} className="header-link ">Home</Link>
            </li>
            <li className="header-tab-item">
                <Link to={LINK.REFACTOR.EDITOR()} className="header-link ">
                    <i className="ion-compose"/>
                    &nbsp;New Post
                </Link>
            </li>
            <li className="header-tab-item">
                <Link to={LINK.REFACTOR.SETTINGS} className="header-link ">
                    <i className="ion-gear-a"/>
                    &nbsp;Settings
                </Link>
            </li>
            <li className="header-tab-item">
                <Link to={LINK.REFACTOR.USER(username)} className="header-link">
                    <WidgetMiniInfo src={image}
                                    imageSize={"26px"}
                                    title={""}
                                    subtitle={username}
                                    subtitleColor={"#AAAAAA"}
                                    subtitleFontSize={"18px"}
                                    type={WidgetMiniInfoType.INLINE}></WidgetMiniInfo>
                </Link>
            </li>
        </ul>
    );

    defaultHeader = (
        <ul className="header-tab-list">
            <li className="header-tab-item">
                <Link to={LINK.REFACTOR.HOME} className="header-link ">Home</Link>
            </li>
            <li className="header-tab-item">
                <Link to={LINK.REFACTOR.SIGN_IN} className="header-link ">Sign In</Link>
            </li>
            <li className="header-tab-item">
                <Link to={LINK.REFACTOR.SIGN_UP} className="header-link ">Sign up</Link>
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
                        <Link to={LINK.REFACTOR.HOME} className="main-header-logo">conduit</Link>
                    </div>
                    {username ? this.signedHeader(username, image || '') : this.defaultHeader}
                </nav>
                <section>
                    {this.props.children}
                </section>
            </>
        );
    }
}