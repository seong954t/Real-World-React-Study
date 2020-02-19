import React from "react";
import {Link} from "react-router-dom";
import "./Feed.css"
import FeedTabProps from "../Props/FeedTabProps";

export default class FeedTab extends React.Component<FeedTabProps, any>{

    singedFeed = () => (
        <li className={`nav-item d-inline-block ${(this.props.tab === 'feed') ? 'active' : ''}`}>
            <Link className="list-group-item" to="/?tab=feed">Your Feed</Link>
        </li>
    );

    tagFeed = () => (
        <li className="nav-item d-inline-block active">
            <Link className="list-group-item" to="/#"><i className="ion-pound"/>{this.props.tag}</Link>
        </li>
    );

    mainFeed = (tab: string, tag: string) => (
        <ul className="nav list-unstyled list-group list-group-flush feed-nav">
            {this.props.isDefault ? '' : this.singedFeed()}
            <li className={`nav-item d-inline-block ${this.isDefaultTab() ? 'active' : ''}`}>
                <Link className="list-group-item" to="/#">GlobalFeed</Link>
            </li>
            {(this.props.tab === 'tag') && tag !== undefined ? this.tagFeed() : ''}
        </ul>
    );

    individualFeed = (tab: string, name: string) => (
        <ul className="nav list-unstyled list-group list-group-flush feed-nav">
            <li className={`nav-item d-inline-block ${this.isDefaultTab() ? 'active' : ''}`}>
                <Link className="list-group-item" to={`/@${name}`}>MyArticles</Link>
            </li>
            <li className={`nav-item d-inline-block ${(tab === 'favorites') ? 'active' : ''}`}>
                <Link className="list-group-item" to={`/@${name}/favorites`}>Favorited Articles</Link>
            </li>
        </ul>
    );

    isDefaultTab = () => {
        return (this.props.tab === undefined || this.props.tab.trim() === '') || (this.props.tab === 'all');
    };

    render() {
        const {tab, tag, name} = this.props;

        console.log("Render [ FeedTab ]");

        return (
            <div className={`container ${this.props.className}`}>
                {
                    !name ?
                        this.mainFeed(tab ? tab : '', tag ? tag : '') :
                        this.individualFeed(tab ? tab : '', name ? name : '')
                }
            </div>
        );
    }
}