import React from "react";
import Auth from "../Auth/Auth";

const Method = {
    GET: "GET",
    POST: "POST",
    PUT: "PUT",
    DELETE: "DELETE"
}

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
}

const RealWorldApi = {
    domain: "https://conduit.productionready.io/api/",
    login: (email: string, password: string, handler: any) => {
        const url = RealWorldApi.domain + "users/login";
        const body = {
            user: {
                email: email,
                password: password
            }
        }

        RealWorldApi.requestApi(url, Method.POST, Header.DEFAULT, body)
            .then(res => res.json())
            .then((result) => {
                const {errors, user} = result;
                if (errors !== undefined) {
                    const arrayError: string[] = [];
                    Object.keys(errors).forEach(key => {
                        arrayError.push(key + " " + errors[key].toString())
                    })
                    handler(arrayError)
                } else if (user !== undefined) {
                    localStorage.setItem("user", JSON.stringify(user));
                    window.location.href = "/";
                }
            });
    },
    logout: () => {
        localStorage.clear();
        document.location.href = "/";
    },
    registration: (username: string, email: string, password: string, handler: any) => {
        const url = RealWorldApi.domain + "users";
        const body = {
            user: {
                username: username,
                email: email,
                password: password
            }
        }

        RealWorldApi.requestApi(url, Method.POST, Header.DEFAULT, body)
            .then(res => res.json())
            .then((result) => {
                const {errors, user} = result;
                if (errors !== undefined) {
                    const arrayError: string[] = [];
                    Object.keys(errors).forEach(key => {
                        arrayError.push(key + " " + errors[key].toString())
                    })
                    handler(arrayError)
                } else if (user !== undefined) {
                    localStorage.setItem("user", JSON.stringify(user));
                    window.location.href = "/";
                }
            })
    },
    updateUser: (image: string, username: string, bio: string, email: string, password: string) => {
        const url = RealWorldApi.domain + "user";

        const body = `{
            "user": {
                "image": "${image}",
                "username": "${username}",
                "bio": "${bio}",
                "email": "${email}"
                ${password === "" ? "" : (`, "password": "` + password + '"')}
            }
        }`

        RealWorldApi.requestApi(url, Method.PUT, Header.AUTH, JSON.parse(body))
            .then(res => res.json())
            .then((result) => {
                const {errors, user} = result;
                if (errors !== undefined) {
                    RealWorldApi.alertError(errors)
                } else if (user !== undefined) {
                    localStorage.setItem("user", JSON.stringify(user));
                    window.location.href = "/";
                }
            })
    },
    getProfile: (username: string, handler: any) => {
        const url = RealWorldApi.domain + `profiles/${username}`;

        RealWorldApi.requestApi(url, Method.GET, (Auth.isSigned() ? Header.AUTH : Header.DEFAULT))
            .then(res => res.json())
            .then((result) => {
                    const {errors, profile} = result;
                    if (errors !== undefined) {
                        RealWorldApi.alertError(errors);
                    }else{
                        handler(profile);
                    }
                }
            )
    },
    followUser: (username: string, followed: boolean, handler: any) => {
        const url = RealWorldApi.domain + `profiles/${username}/follow`

        RealWorldApi.requestApi(url, (followed ? Method.DELETE : Method.POST), Header.AUTH)
            .then(res => res.json())
            .then((result) => {
                const {errors, profile} = result;
                if(errors !== undefined){
                    RealWorldApi.alertError(errors)
                }else if(profile !== undefined){
                    handler();
                }
            })
    },
    getArticles: (url: string, page: number, handler: any) => {
        let header;
        if (Auth.isSigned()) {
            header = Header.AUTH
        } else {
            header = Header.DEFAULT;
        }

        RealWorldApi.requestApi(url, Method.GET, header)
            .then(res => res.json())
            .then((result) => {
                const {errors, articles, articlesCount} = result;
                if (errors !== undefined) {
                    RealWorldApi.alertError(errors);
                } else {
                    handler(articles, articlesCount, page);
                }
            })
    },
    getArticle: (slug: string, handler: any) => {
        const url = RealWorldApi.domain + `articles/${slug}`
        RealWorldApi.requestApi(url, Method.GET, Header.DEFAULT)
            .then(res => res.json())
            .then((result) => {
                const {errors, article} = result;
                if (errors !== undefined) {
                    RealWorldApi.alertError(errors);
                } else {
                    handler(article);
                }
            })
    },
    createArticle: (title: string, description: string, body: string, tagList: string[]) => {
        const url = RealWorldApi.domain + "articles";

        const responseBody = {
            article: {
                title: title,
                description: description,
                body: body,
                tagList: tagList
            }
        }

        RealWorldApi.requestApi(url, Method.POST, Header.AUTH, responseBody)
            .then(res => res.json())
            .then((result) => {
                const {errors, article} = result;
                if (errors !== undefined) {
                    RealWorldApi.alertError(errors);
                } else if (article !== undefined) {
                    window.location.href = `/article/${article.slug}`;
                }
            })
    },
    updateArticle: (title: string, description: string, body: string, tagList: string[], slug: string) => {
        const url = RealWorldApi.domain + `articles/${slug}`;

        const responseBody = {
            article: {
                title: title,
                description: description,
                body: body,
                tagList: tagList
            }
        }

        RealWorldApi.requestApi(url, Method.PUT, Header.AUTH, responseBody)
            .then(res => res.json())
            .then((result) => {
                const {errors, article} = result;
                if (errors !== undefined) {
                    RealWorldApi.alertError(errors);
                } else if (article !== undefined) {
                    window.location.href = `/article/${article.slug}`;
                }
            })
    },
    deleteArticle: (slug: string) => {
        const url = RealWorldApi.domain + `articles/${slug}`;

        RealWorldApi.requestApi(url, Method.DELETE, Header.AUTH)
            .then(res => res.json())
            .then((result) => {
                const {errors} = result;
                if (errors !== undefined) {
                    RealWorldApi.alertError(errors);
                } else {
                    window.location.href = `/`;
                }
            })
    },
    addComment: (slug: string, body: string, handler: any) => {
        const url = RealWorldApi.domain + `articles/${slug}/comments`;

        const responseBody = {
            comment: {
                body: body
            }
        }

        RealWorldApi.requestApi(url, Method.POST, Header.AUTH, responseBody)
            .then(res => res.json())
            .then((result) => {
                const {errors, comment} = result;
                if (errors !== undefined) {
                    RealWorldApi.alertError(errors)
                } else {
                    handler();
                }
            })
    },
    getComments: (slug: string, handler: any) => {
        const url = RealWorldApi.domain + `articles/${slug}/comments`;

        RealWorldApi.requestApi(url, Method.GET, Header.DEFAULT)
            .then(res => res.json())
            .then((result) => {
                const {errors, comments} = result;
                if (errors !== undefined) {
                    RealWorldApi.alertError(errors);
                } else {
                    handler(comments);
                }
            })
    },
    deleteComment: (slug: string, id: number, handler: any) => {
        const url = RealWorldApi.domain + `articles/${slug}/comments/${id}`;

        RealWorldApi.requestApi(url, Method.DELETE, Header.AUTH)
            .then(res => res.json())
            .then((result) => {
                const {errors} = result;
                if (errors !== undefined) {
                    RealWorldApi.alertError(errors)
                } else {
                    handler();
                }
            })
    },
    favoriteArticle: (slug: string, favorited: boolean, handle: any) => {
        const url = RealWorldApi.domain + `articles/${slug}/favorite`;

        RealWorldApi.requestApi(url, (favorited ? Method.DELETE : Method.POST), Header.AUTH)
            .then(res => res.json())
            .then((result) => {
                const {errors, article} = result;
                if (errors !== undefined) {
                    RealWorldApi.alertError(errors);
                } else {
                    handle(article);
                }
            })
    },
    getTags: (handler: any) => {
        const url = RealWorldApi.domain + "tags";
        RealWorldApi.requestApi(url, Method.GET, Header.DEFAULT)
            .then(res => res.json())
            .then((result) => {
                const {errors, tags} = result;
                if (errors !== undefined) {
                    RealWorldApi.alertError(errors);
                } else if (tags !== undefined) {
                    handler(tags);
                }
            })
    },
    alertError: (errors: any) => {
        console.log("error : ", errors)
        alert("error")
    },
    requestApi: (url: string, method: string, headers: {}, body?: {}): Promise<Response> => {
        const init = body === undefined ? {
            method: method,
            headers: headers,
        } : {
            method: method,
            headers: headers,
            body: JSON.stringify(body)
        };

        return fetch(url, init)
    }

}

export default RealWorldApi