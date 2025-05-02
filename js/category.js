import { fetchApi } from "../helpers/fetchApi.helper.js";
import { API_CATEGORY } from "./constants.js";
import { drawProduct } from "./drawProduct.js";
import { listCategories, params } from "./variable.js";

fetchApi(API_CATEGORY)
    .then(data => {
        let htmls = data.map(item => {
            return `
                <div class="inner-item" data-name="${item.name}">
                    ${item.name}
                </div>
            `;
        }).join("\n");

        listCategories.innerHTML = htmls;

        const categories = document.querySelectorAll(".inner-item");
        categories.forEach(item => {
            item.addEventListener("click", () => {
                params.category = item.getAttribute("data-name").toLowerCase();

                drawProduct();
            })
        })
    });