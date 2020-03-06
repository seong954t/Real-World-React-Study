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
    getTags: (): Promise<any> => {
        const url = RealWorldApi.domain + "tags";
        return RealWorldApi.requestApi(url, Method.GET, Header.DEFAULT)
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