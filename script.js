const baseUrl = 'http://localhost:3000/products';

// Render the products
function renderProduct(product) {
    const card = document.createElement("div");
    card.className = 'card';

    const volumeAvailable = product.volume - product.products_sold;

    // Cards innerHTML with the layout
    card.innerHTML = `
        <img src="${product.image_link}" alt="Product Image" class="product-image">
        <div class="description">
            <h3>${product.name}</h3>
            <h4>Brand: ${product.brand}</h4>
            <p>${product.description}</p>
            <p class="price">Price: ${product.price} Ksh</p>
            <span class="volume">Available: ${volumeAvailable}</span>
        </div>
        <div class="button">
            <button class="purchase-btn" ${volumeAvailable === 0 ? "disabled" : ""}>
                ${volumeAvailable === 0 ? "Sold Out" : "Buy Product"}
            </button>
        </div>        
    `;

    // Adding the card into the container
    document.querySelector(".container").appendChild(card);

    // Adding functionality to the purchase button
    const purchaseButton = card.querySelector(".purchase-btn");
    const volumeElement = card.querySelector(".volume");

    purchaseButton.addEventListener("click", () => {
        if (volumeAvailable > 0) {
            alert(`You purchased: ${product.name}`);

            // Update the products sold and volume available
            product.products_sold += 1;
            const newVolumeAvailable = product.volume - product.products_sold;
            volumeElement.textContent = `Available: ${newVolumeAvailable}`;

            // If sold out, disable the button
            if (newVolumeAvailable === 0) {
                purchaseButton.textContent = "Sold Out";
                purchaseButton.disabled = true;
            }

            // Add the purchased product to the purchased list
            renderPurchasedProduct(product);
        }
    });
}

// Render purchased products
function renderPurchasedProduct(product) {
    const purchasedList = document.querySelector("#purchased-products");
    const item = document.createElement("li");
    item.className = 'purchased-item';
    item.textContent = product.name;
    purchasedList.appendChild(item);
}

// Function to render product menu in ul#products
function renderProductMenu(product) {
    const productList = document.querySelector("#products");
    const itemList = document.createElement("li");
    itemList.className = 'item-list';
    itemList.textContent = product.name;

    // Highlight and display product details on click
    itemList.addEventListener("click", () => {
        document.querySelector(".container").innerHTML = ""; // Clear previous cards
        renderProduct(product); // Render only the selected product
    });

    productList.appendChild(itemList);
}

function showAllProducts() {
    fetch(baseUrl)
        .then(res => res.json())
        .then(productData => {

            const productList = document.querySelector("#products");
            if (productList) {
                productList.innerHTML = ""; // Clears the existing product list
            }
            // Clear the existing cards
            document.querySelector(".container").innerHTML = "";

            productData.forEach(product => {
                renderProduct(product);
                renderProductMenu(product);
            });
        })
        .catch(Error => console.error("Error fetching product", Error));
}

// Function to handle the search bar
function handleSearch() {
    const searchButton = document.querySelector(".search-button");
    const searchBar = document.querySelector(".search-bar");

    searchButton.addEventListener("click", () => {
        const query = searchBar.value.toLowerCase();

        // Clear the existing cards
        document.querySelector(".container").innerHTML = "";

        fetch(baseUrl)
            .then(res => res.json())
            .then(productData => {
                const filterProduct = productData.filter((product) =>
                    product.name.toLowerCase().includes(query)
                );
                // Clear the existing cards
                document.querySelector(".container").innerHTML = "";

                if (filterProduct.length === 0) {
                    document.querySelector(".container").innerHTML = `
                    <p>No product matches found for "${query}"</p>`;
                } else {
                    filterProduct.forEach((product) => renderProduct(product));
                }
            })
            .catch(Error => console.error("Error fetching the search", Error));
    });
}

// Initialize the application
document.addEventListener("DOMContentLoaded", () => {
    // Ensure the ul#products element exists
    if (!document.querySelector("#products")) {
        const productList = document.createElement("ul");
        productList.id = "products";

        document.body.prepend(productList);
    }

    // Ensure the purchased products list exists
    if (!document.querySelector("#purchased-products")) {
        const purchasedList = document.createElement("ul");
        purchasedList.id = "purchased-products";
        purchasedList.innerHTML = "<h3>Purchased Products</h3>";
        document.body.appendChild(purchasedList);
    }

    const style = document.createElement("style");
    style.textContent = `
        #products {
            position: fixed;
            top: 50%;
            left: 0;
            transform: translateY(-50%);
            list-style-type: none;
            padding: 10px;
            background-color: #f4f4f4;
            box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);
            height: auto;
            max-height: 80%;
            overflow-y: auto;
        }

        .item-list {
            padding: 10px;
            margin: 5px 0;
            cursor: pointer;
            transition: background-color 0.3s;
        }

        .item-list:hover {
            background-color: #ddd;
        }

        #purchased-products {
            margin-top: 20px;
            padding: 10px;
            background-color: #fff;
            border: 2px solid #eee;
            border-radius: 5px;
            max-width: 300px;
        }

        .purchased-item {
            margin: 5px 0;
            color: #555;
        }
    `;
    document.head.appendChild(style);

    // Check if the required DOM elements exist, if not create them
    if (!document.querySelector(".search-bar")) {
        const searchBar = document.createElement("input");
        searchBar.className = "search-bar";
        searchBar.type = "text";
        searchBar.placeholder = "Search for a product..";
        document.body.prepend(searchBar);
    }

    if (!document.querySelector(".search-button")) {
        const searchButton = document.createElement("button");
        searchButton.className = "search-button";
        searchButton.textContent = "Search";
        document.body.prepend(searchButton);
    }

    if (!document.querySelector(".container")) {
        const container = document.createElement("div");
        container.className = "container";
        document.body.appendChild(container);
    }

    // Initialize the functionality
    showAllProducts();
    handleSearch();
});
