import React from "react";
import Auth from "../../Auth/Auth";
import {observer} from "mobx-react";
import UserStore from "../../Store/UserStore";
import Config from "../../Configuration/Config";
import Header from "../../Widget/Header/Header";
import LINK from "../../PageRouter/Link";


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
                    linkToHome={LINK.HOME}
                    linkToUser={LINK.USER(username)}
                    linkToEditor={LINK.EDITOR()}
                    linkToSettings={LINK.SETTINGS}
                    linkToSignIn={LINK.SIGN_IN}
                    linkToSignUp={LINK.SIGN_UP}
            />
        );
    }
}