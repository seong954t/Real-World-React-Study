class LINK {
    HOME = "/";
    SIGN_IN = "/login";
    SIGN_UP = "/register";
    SETTINGS = "/settings";
    USER = (username: string) => `/@${username}/`;
    ARTICLE = (slug: string) => `/article/${slug}/`;
    EDITOR = (slug?: string) => `/editor/${slug ? slug + '/' : ''}`;
    static INSTANCE: LINK = new LINK();
}

export default class Config {
    static TITLE = "conduit";
    static DESCRIPTION = "A place to share your knowledge.";
    static LINK: LINK = LINK.INSTANCE
}