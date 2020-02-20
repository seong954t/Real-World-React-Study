import React from "react";
import Auth from "../Auth/Auth";
import {observer} from "mobx-react";
import UserStore from "../Store/UserStore";
import Configuration from "../Configuration/Configuration";
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
                    title={Configuration.TITLE}
                    linkToHome={"/"}
                    linkToUser={`/@${username}`}
                    linkToEditor={"/editor"}
                    linkToSettings={"/settings"}
                    linkToSignIn={"/login"}
                    linkToSignUp={"/register"}
            />
        );
    }
}