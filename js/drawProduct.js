import { fetchApi } from "../helpers/fetchApi.helper.js";
import { API_PRODUCT } from "./constants.js";
import { params } from "./variable.js";

const listProducts = document.querySelector(".inner-list-products");

export const drawProduct = () => {
    let category = "";

    if(params.category) {
        category = `category=${params.category}`;
    }

    const api = `${API_PRODUCT}?title=${params.title}&_sort=${params.sort}&_page=${params.currentPage}&_per_page=${params.limit}&${category}`;

    fetchApi(api)
    .then(data => {
        params.totalPage = data.pages;
        let htmls = data.data.map(item => {
            return `
                <div class="inner-item">
                    <img class="inner-image" src=${item.thumbnail} alt=${item.title}>
                    <div class="inner-content">
                        <h3 class="inner-title">${item.title}</h3>
                        <p class="inner-price">${item.price}$</p>
                        <p class="inner-stock">Còn lại: ${item.stock} sản phẩm</p>
                        <p class="inner-discountPercentage">${item.discountPercentage}%</p>
                    </div>
                </div>
            `;
        }).join("\n");

        listProducts.innerHTML = htmls;
    });
}