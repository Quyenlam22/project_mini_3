import { drawProduct } from "./drawProduct.js";
import { params, formSearch, selectSort, pagination, buttonPre, buttonNext, currentPage } from "./variable.js";

drawProduct();

if (formSearch) {
    formSearch.addEventListener("submit", (e) => {
        e.preventDefault();
        const input = formSearch.querySelector("input[name='keyword']");
        
        params.title = input.value;
        drawProduct();
    })
}

if (selectSort) {
    selectSort.addEventListener("change", () => {
        params.sort = selectSort.value;
        drawProduct();
    })
}

if (pagination) {
    buttonPre.addEventListener("click", () => {
        let page = params.currentPage;
        if (page > 1) {
            params.currentPage = page - 1;
            currentPage.innerHTML = page - 1;
            drawProduct();
        }
    });

    buttonNext.addEventListener("click", () => {
        let page = params.currentPage;
        if (page < params.totalPage) {
            params.currentPage = page + 1;
            currentPage.innerHTML = page + 1;
            drawProduct();
        }
    });

    drawProduct();
}