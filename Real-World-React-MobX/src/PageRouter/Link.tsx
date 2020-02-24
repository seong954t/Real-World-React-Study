export default class LINK {
    static HOME = "/";
    static SIGN_IN = "/login";
    static SIGN_UP = "/register";
    static SETTINGS = "/settings";
    static USER = (username: string) => `/@${username}/`;
    static ARTICLE = (slug: string) => `/article/${slug}/`;
    static EDITOR = (slug?: string) => `/editor/${slug ? slug + '/' : ''}`;
}