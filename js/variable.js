export let params = {
    title: "",
    sort: "",
    currentPage: 1,
    limit: 6,
    totalPage: 1,
    category: ""
};

export const listCategories = document.querySelector(".inner-list-categories");

export const formSearch = document.querySelector("form");
export const selectSort = document.querySelector("#sort");
export const pagination = document.querySelector(".pagination");
export const buttonPre = pagination.querySelector(".button-pre");
export const buttonNext = pagination.querySelector(".button-next");
export const currentPage = pagination.querySelector(".current-page");