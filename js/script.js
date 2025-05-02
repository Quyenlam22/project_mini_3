import {
    fetchApi
} from "../helpers/fetchApi.helper.js";

fetchApi("http://localhost:3000/categories")
    .then(data => {
        const listCategories = document.querySelector(".inner-list-categories");
        let htmls = data.map(item => {
            return `
                <div class="inner-item">
                    ${item.name}
                </div>
            `;
        }).join("\n");

        listCategories.innerHTML = htmls;
    });

fetchApi("http://localhost:3000/products")
    .then(data => {
        const listProducts = document.querySelector(".inner-list-products");
        let htmls = data.map(item => {
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

const url = new URL(window.location.href);

const formSearch = document.querySelector("form");
if (formSearch) {
    formSearch.addEventListener("submit", (e) => {
        e.preventDefault();
        const input = formSearch.querySelector("input[name='keyword']");
        if (input.value) {
            fetchApi(`http://localhost:3000/products?title=${input.value}`)
                .then(data => {
                    const listProducts = document.querySelector(".inner-list-products");
                    if (data.length > 0) {
                        let htmls = data.map(item => {
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
                    } else {
                        listProducts.innerHTML = `
                            <h2">
                                Không tìm thấy sản phẩm!
                            </h2>
                        `;
                    }
                })
            url.searchParams.set("keyword", input.value);
        } else {
            url.searchParams.delete("keyword");
            window.location.href = url.href;
        }
    })
}

const selectSort = document.querySelector("#sort");
if (selectSort) {
    selectSort.addEventListener("change", () => {
        fetchApi(`http://localhost:3000/products?_sort=${selectSort.value}`)
            .then(data => {
                const listProducts = document.querySelector(".inner-list-products");
                let htmls = data.map(item => {
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
        // url.searchParams.set("_sort", selectSort.value);
    })
}

const pagination = document.querySelector(".pagination");
if (pagination) {
    const buttonPre = pagination.querySelector(".button-pre");
    const buttonNext = pagination.querySelector(".button-next");
    const currentPage = pagination.querySelector(".current-page");
    let totalPage = 1;

    const renderProducts = (page) => {
        fetchApi(`http://localhost:3000/products?_page=${page}&_per_page=6`)
            .then(data => {
                totalPage = data.pages;
    
                const listProducts = document.querySelector(".inner-list-products");
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
            })
    }

    buttonPre.addEventListener("click", () => {
        let page = parseInt(currentPage.innerHTML);
        if (page > 1) {
            currentPage.innerHTML = page - 1;
            renderProducts(currentPage.innerHTML);
        }
    });

    buttonNext.addEventListener("click", () => {
        let page = parseInt(currentPage.innerHTML);
        if (page < totalPage) {
            currentPage.innerHTML = page + 1;
            renderProducts(currentPage.innerHTML);
        }
    });

    renderProducts(currentPage.innerHTML);
}