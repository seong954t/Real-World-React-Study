import React from "react";
import HomeBanner from "./HomeBanner";
import FeedContainer from "../Feed/FeedContainer";
import Tags from "../Tags/Tags";
import queryString from "query-string";

class Home extends React.Component<any, any>{

    getRealValue = (value: any):string => {
        if(value === undefined){
            return '';
        } else if(value === null){
            return '';
        }
        return value;
    }

    render() {
        const {tab, tag} = queryString.parse(this.props.location.search);

        return (
            <div>
                <HomeBanner/>
                <div className="container row m-auto">
                    <FeedContainer tab={this.getRealValue(tab) } tag={this.getRealValue(tag)}/>
                    <Tags/>
                </div>
            </div>
        );
    }
}

export default Home;