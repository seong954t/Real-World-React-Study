import {Link} from "react-router-dom";
import React, {ReactNode} from "react";
import LINK from "../../../PageRouter/Link";
import "./Main.less";
import {WidgetMiniInfo, WidgetMiniInfoType} from "../../Widget/MiniInfo/WidgetMiniInfo";

interface Props{
    username?: string,
    image?: string,
    children?: ReactNode
}

export class Main extends React.Component<Props, any> {

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
                                    type={WidgetMiniInfoType.INLINE}></WidgetMiniInfo>
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
        const {username, image} = this.props;

        console.log("Render [ Header ]");

        return (
            <>
                <nav className="container main-header-container">
                    <div className="main-header-logo-wrapper">
                        <Link to={LINK.HOME} className="main-header-logo">conduit</Link>
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