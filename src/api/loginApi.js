import request from "@/ulits/request.js";
export const loginApi = function ({ username, password }) {
    return request.post('/login',
        {
            username,
            password
        }
    )
}