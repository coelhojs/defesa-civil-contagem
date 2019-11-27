import { create } from "apisauce";

export const api = create({
    //Base json-db:
    baseURL: "http://localhost:3004"

    //Back-end aplicação:
    //baseURL: "http://104.197.124.173:3001"
    //baseURL: "https://3001-f78dc803-dffa-4566-acdf-abd12fcca25b.ws-us02.gitpod.io/"

    //baseURL: "http://192.168.43.196:3001"
    // baseURL: "http://192.168.137.94:3001"
})