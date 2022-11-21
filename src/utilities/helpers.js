export function pluck(arr, k) {
    return arr.map((i) => i[k]);
}

export function getURLParam(url, param) {
    const params = new URL(url).searchParams;
    return (param) ? params.get(param) : params;
}

export function transformResponseToJSON(response) {
    const data = response.json();
    if (!response.ok) {
        const error = (data && data.detail) || response.statusText;
        return Promise.reject(error);
    }
    return data;
}
