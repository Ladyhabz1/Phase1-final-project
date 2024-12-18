//Render the products
function renderProduct(product){
    const card =  document.createElement("div");
    card.className = 'div';

//Cards innerHTML with the layout
    card.innerHTML = `
        <img src="${product.image_link}" alt="Product Image" class="product-image">
        <div class="description">
            <h3>${product.name}</h3>
            <h4>${product.brand}</h4>
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

const baseUrl = 'http://localhost:3000/products'

fetch(baseUrl)
 .then(res => res.json())
 .then(productData => {
    productData.forEach(product => {
        renderProduct(product);
        
    });
 })
 .catch(Error => console.error("Error fetching data", Error))