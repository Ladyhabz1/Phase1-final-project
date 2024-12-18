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

const baseUrl = 'http://localhost:3000/products'

fetch(baseUrl)
 .then(res => res.json())
 .then(productData => {
    productData.forEach(product => {
        renderProduct(product);
        
    });
 })
 .catch(Error => console.error("Error fetching data", Error))