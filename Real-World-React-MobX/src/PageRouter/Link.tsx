export default class LINK {
    static HOME = "/";
    static SIGN_IN = "/login";
    static SIGN_UP = "/register";
    static SETTINGS = "/settings";
    static USER = (username: string) => `/@${username}/`;
    static ARTICLE = (slug: string) => `/article/${slug}/`;
    static EDITOR = (slug?: string) => `/editor/${slug ? slug + '/' : ''}`;

    static REFACTOR = class {
        static HOME = "/refactor/";
        static SIGN_IN = "/refactor/login";
        static SIGN_UP = "/refactor/register";
        static SETTINGS = "/refactor/settings";
        static USER = (username: string) => `/refactor/@${username}/`;
        static ARTICLE = (slug: string) => `/refactor/article/${slug}/`;
        static EDITOR = (slug?: string) => `/refactor/editor/${slug ? slug + '/' : ''}`;
    };
}