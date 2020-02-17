import Auth from "../Auth/Auth";

const Method = {
    GET: "GET",
    POST: "POST",
    PUT: "PUT",
    DELETE: "DELETE"
};

const Header = {
    DEFAULT: {
        "Accecpt": "application/json",
        "Content-Type": "application/json; charset=utf-8"
    },
    AUTH: {
        "Accecpt": "application/json",
        "Content-Type": "application/json; charset=utf-8",
        "Authorization": `Token ${Auth.getToken()}`
    }
};

const RealWorldApi = {
    setAuthHeader: () => {
        Header.AUTH.Authorization = `Token ${Auth.getToken()}`
    },
    domain: "https://conduit.productionready.io/api/",
    login: (email: string, password: string): Promise<any> => {
        const url = RealWorldApi.domain + "users/login";
        const body = {
            user: {
                email: email,
                password: password
            }
        };

        return RealWorldApi.requestApi(url, Method.POST, Header.DEFAULT, body)
    },
    logout: () => {
        localStorage.clear();
        Header.AUTH.Authorization = "";
    },
    registration: (username: string, email: string, password: string): Promise<any> => {
        const url = RealWorldApi.domain + "users";
        const body = {
            user: {
                username: username,
                email: email,
                password: password
            }
        };

        return RealWorldApi.requestApi(url, Method.POST, Header.DEFAULT, body);
    },
    getCurrentUser: (): Promise<any> => {
        const url = RealWorldApi.domain + "user";

        return RealWorldApi.requestApi(url, Method.GET, Header.AUTH);
    },
    updateUser: (image: string, username: string, bio: string, email: string, password: string): Promise<any> => {
        const url = RealWorldApi.domain + "user";

        const body = `{
            "user": {
                "image": "${image}",
                "username": "${username}",
                "bio": "${bio}",
                "email": "${email}"
                ${password === "" ? "" : (`, "password": "` + password + '"')}
            }
        }`;

        return RealWorldApi.requestApi(url, Method.PUT, Header.AUTH, JSON.parse(body));
    },
    getProfile: (username: string): Promise<any> => {
        const url = RealWorldApi.domain + `profiles/${username}`;

        return RealWorldApi.requestApi(url, Method.GET, (Auth.isSigned() ? Header.AUTH : Header.DEFAULT))
    },
    followUser: (username: string, followed: boolean) => {
        const url = RealWorldApi.domain + `profiles/${username}/follow`;

        return RealWorldApi.requestApi(url, (followed ? Method.DELETE : Method.POST), Header.AUTH)
    },
    getArticles: (url: string): Promise<any> => {
        let header;

        if (Auth.isSigned()) {
            header = Header.AUTH
        } else {
            header = Header.DEFAULT;
        }

        return RealWorldApi.requestApi(url, Method.GET, header)
    },
    getArticle: (slug: string): Promise<any> => {
        const url = RealWorldApi.domain + `articles/${slug}`;
        return RealWorldApi.requestApi(url, Method.GET, Header.DEFAULT);
    },
    createArticle: (title: string, description: string, body: string, tagList: Set<String>): Promise<any> => {
        const url = RealWorldApi.domain + "articles";

        const responseBody = {
            article: {
                title: title,
                description: description,
                body: body,
                tagList: tagList
            }
        };

        return RealWorldApi.requestApi(url, Method.POST, Header.AUTH, responseBody)
    },
    updateArticle: (title: string, description: string, body: string, tagList: Set<String>, slug: string): Promise<any> => {
        const url = RealWorldApi.domain + `articles/${slug}`;

        const responseBody = {
            article: {
                title: title,
                description: description,
                body: body,
                tagList: tagList
            }
        };

        return RealWorldApi.requestApi(url, Method.PUT, Header.AUTH, responseBody)
    },
    deleteArticle: (slug: string): Promise<any> => {
        const url = RealWorldApi.domain + `articles/${slug}`;

        return RealWorldApi.requestApi(url, Method.DELETE, Header.AUTH)
    },
    addComment: (slug: string, body: string): Promise<any> => {
        const url = RealWorldApi.domain + `articles/${slug}/comments`;

        const responseBody = {
            comment: {
                body: body
            }
        };

        return RealWorldApi.requestApi(url, Method.POST, Header.AUTH, responseBody)
    },
    getComments: (slug: string): Promise<any> => {
        const url = RealWorldApi.domain + `articles/${slug}/comments`;

        return RealWorldApi.requestApi(url, Method.GET, Header.DEFAULT)
    },
    deleteComment: (slug: string, id: number): Promise<any> => {
        const url = RealWorldApi.domain + `articles/${slug}/comments/${id}`;

        return RealWorldApi.requestApi(url, Method.DELETE, Header.AUTH)
    },
    favoriteArticle: (slug: string, favorited: boolean): Promise<any> => {
        const url = RealWorldApi.domain + `articles/${slug}/favorite`;

        return RealWorldApi.requestApi(url, (favorited ? Method.DELETE : Method.POST), Header.AUTH)
    },
    getTags: (): Promise<any> => {
        const url = RealWorldApi.domain + "tags";
        return RealWorldApi.requestApi(url, Method.GET, Header.DEFAULT)
    },
    alertError: (errors: any) => {
        console.log("error : ", errors);
        alert("error")
    },
    requestApi: (url: string, method: string, headers: {}, body?: {}): Promise<any> => {
        const init = body === undefined ? {
            method: method,
            headers: headers,
        } : {
            method: method,
            headers: headers,
            body: JSON.stringify(body)
        };
        return fetch(url, init).then((response) => {
            if (!response.ok && response.status !== 422) {
                throw response;
            }
            return response.json()
        })
    }
};

export default RealWorldApi