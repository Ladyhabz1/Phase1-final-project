const baseUrl = 'http://localhost:3000/products'
//Render the products
function renderProduct(product){
    const card =  document.createElement("div");
    card.className = 'div';

//Cards innerHTML with the layout
    card.innerHTML = `
        <img src="${product.image_link}" alt="Product Image" class="product-image">
        <div class="description">
            <h3>${product.name}</h3>
            <h4>Brand: ${product.brand}</h4>
            <p>${product.description}</p>
            <span class="price">Price: ${product.price}Ksh</span>
        </div>
        <div class="button">
            <button class="purchase-btn">Buy Product</button>
        </div>        
    `;
    document.querySelector(".container").appendChild(card);
    
}


//function to render product menu in ul#product
function renderProductMenu(product){
    const productList = document.querySelector("#products");
    const itemList = document.createElement("li");
    itemList.className = 'item-list';
    itemList.textContent = product.name;
    
    //Highlight and display product details on click
    itemList.addEventListener("click", () => {
        document.querySelector(".container").innerHTML = ""; //clear previous cards
        renderProduct(product); //render only the selected product
    });

    productList.appendChild(itemList);
}

function showAllProducts(){
    fetch(baseUrl)
        .then(res => res.json())
        .then(productData => {

        const productList = document.querySelector("#products");
        if(productList){
            productList.innerHTML = ""; //clears the existing product list
        }
        //clear the existing cards
        document.querySelector(".container").innerHTML = "";

        productData.forEach(product => {
                renderProduct(product);
                renderProductMenu(product);
        
        });
    })
    .catch(Error => console.error("Error fetching product", Error))
}

//Function to handle the searchbar
function handleSearch(product){
    const searchButton = document.querySelector(".search-button");
    const searchBar = document.querySelector(".search-bar");

    searchButton.addEventListener("click", () => {
        const querry = searchBar.value.toLowerCase();

        //clear the existing cards
        document.querySelector(".container").innerHTML = "";
   
        fetch(baseUrl)
            .then(res => res.json())
            .then(productData => {
                const filterProduct = productData.filter((product) => 
                        product.name.toLowerCase().includes(querry)
                );
                //clear the existing cards
                document.querySelector(".container").innerHTML = "";

                if(filterProduct.length === 0){
                    document.querySelector(".container").innerHTML = `
                    <p>No product matches found for ${querry}</p>`
                } else {
                    filterProduct.forEach((product) =>  renderProduct(product));
                }
            })
            .catch(Error => console.error("Error fetching the search", Error));
            
    });
}

//Inititalize the application
document.addEventListener("DOMContentLoaded", () => {
    //// Ensure the ul#products element exists
    if(!document.querySelector("#products")){
        const productList = document.createElement("ul");    
        productList.id = "products"   
        
        document.body.prepend(productList);
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

    `;
    document.head.appendChild(style);

    //check if the required DOM exists if not create them

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