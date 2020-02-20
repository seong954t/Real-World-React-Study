import React from "react";
import Auth from "../Auth/Auth";
import {observer} from "mobx-react";
import UserStore from "../Store/UserStore";
import Config from "../Configuration/Config";
import Header from "../Widget/Header/Header";


interface Props {
    userStore: UserStore
}

@observer
export default class HeaderContainer extends React.Component<Props, any> {

    componentDidMount(): void {
        console.log("componentDidMount [ HeaderContainer ]");
        this.props.userStore.getCurrentUser();
    }

    render() {
        const {username, image} = this.props.userStore.user;

        console.log("Render [ HeaderContainer ]");

        return (
            <Header username={username}
                    image={image}
                    defaultHeader={!Auth.isSigned()}
                    title={Config.TITLE}
                    linkToHome={Config.LINK.HOME}
                    linkToUser={Config.LINK.USER(username)}
                    linkToEditor={Config.LINK.EDITOR()}
                    linkToSettings={Config.LINK.SETTINGS}
                    linkToSignIn={Config.LINK.SIGN_IN}
                    linkToSignUp={Config.LINK.SIGN_UP}
            />
        );
    }
}