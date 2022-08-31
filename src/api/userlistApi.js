import request from "@/ulits/request.js";
export const userListApi = function ({ query, pagenum, pagesize }) {
    return request.get('/users',
        {

            query,
            pagenum,
            pagesize,
        })
}