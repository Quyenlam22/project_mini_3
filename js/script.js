fetch("http://localhost:3000/categories")
    .then(res => res.json())
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

fetch("http://localhost:3000/products")
    .then(res => res.json())
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