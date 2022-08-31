import request from "@/ulits/request.js";
export const menusApi = function () {
    return request.get('/menus')
}