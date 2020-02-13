import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {Provider} from "mobx-react";
import TagsStore from "./Store/TagsStore";
import FeedTabStore from "./Store/FeedTabStore";
import ArticlesStore from "./Store/ArticlesStore";
import CommentsStore from "./Store/CommentsStore";
import UserStore from "./Store/UserStore";
import AuthStore from "./Store/AuthStore";
import PostStore from "./Store/PostStore";
import ProfileStore from "./Store/ProfileStore";

const articlesStore = new ArticlesStore();
const authStore = new AuthStore();
const commentsStore = new CommentsStore();
const feedTabStore = new FeedTabStore();
const postStore = new PostStore();
const profileStore = new ProfileStore();
const tagsStore = new TagsStore();
const userStore = new UserStore();

const store = {
    articlesStore,
    authStore,
    commentsStore,
    feedTabStore,
    postStore,
    profileStore,
    tagsStore,
    userStore
}

ReactDOM.render(
    <Provider {...store}>
        <App />
    </Provider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
