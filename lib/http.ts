interface I_HTTP {
    url: string;
    method: "GET" | "POST" | "PUT" | "DELETE"
    data?: any
}

export const HTTP = async ({ url, method, data }: I_HTTP) => {
    return fetch(url, {
        method: method,
        headers: {
            'Content-Type': 'application/json',
        },
        ...(data ? { body: JSON.stringify(data) } : {}),
    });
}