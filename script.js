let productsList = []
let cart = []
/* The idea is create an object of all the values of the imput we'll need, initiate an empty
array and push the product in it. As it's gonna be an array of list of objects( We can add lots of products)  
We need to loop to be able to access each product and print it out on the screen. */

let submitButton = document.getElementById("submit-button")
let productContainer = document.getElementById("product-container")
let notification = document.querySelector('.notification');
let message = document.querySelector('.message');
let close = document.querySelector('.close');

submitButton.addEventListener("click", function(e){ 
    e.preventDefault();

    let imageInput = document.getElementById("image").value;
    let nameInput = document.getElementById("name").value
    let priceInput = document.getElementById("price").value
    let descriptionInput = document.getElementById("description").value
    /* let productContainer = document.getElementById("products-container")  */
   const product = {
    name: nameInput,
    image: imageInput,
    price: priceInput,
    description: descriptionInput
   }
  productsList.push(product);

  //clear the productContainer before creating a new one to avoid duplicating the products 
  productContainer.innerHTML = ""
 
  productsList.forEach((product, index) => {

    productContainer.innerHTML += `
    
      <div data-index = ${index}class="store-product">
        <div class="product">
          <img src="${product.image}" alt="Item 3" style="width: 150px; height: 150px">
          <div class="product-details">
            <h3 id="product-name">${product.name}</h3>
            <p id="product-price">Price: ${product.price}</p>
            <p id="product-description">${product.description}</p>
            <button data-index="${index}" class="add-to-cart">Add to cart</button>
          </div>
        </div>
      </div>
    `

  /* functionality below is moved inside the loop because if not, it the eventlistener is attaching the functionality to 
  every button with the classname regardless of if they've been created already or not and in this case no: The eventListener 
  is working for the buttons when they've not been created. The good practice is writing it inside the loop so that it only works 
  after the buttons have been created*/

  let addCartButtons = document.querySelectorAll(".add-to-cart")
    addCartButtons.forEach(addCartButton => {
      addCartButton.addEventListener("click", function(e){
        e.preventDefault()
    
        /* I'm using a dataset to add an index to the div containing each product and i'm using the index to access
        each product. creating a variable to get the value of each product object from the array containing them  */
        let index = parseInt(addCartButton.dataset.index)
        cartItem = productsList[index]
        if(cart.includes(cartItem)){          
          message.innerHTML = 'Product already in cart!';
          notification.classList.add("show-notification")
          notification.style.display = 'flex';
          
          /* notification.addEventListener("click", function(event) {
            if (event.target === close) {
              notification.remove();
            }
          })

          close.addEventListener("click", function() {
            close.parentElement.remove()
          }) */

          setTimeout(function() {
            notification.style.display = 'none';
          }, 2000); // hide notification after 3 seconds
        }
        else{
          cart.push(cartItem);
        }
       
        console.log("Product added to cart. This is the cart:", cart);
        /* cart.forEach(element => {
          console.log(cart[element])
        }); */
        renderCartItems()

      })
    });
  });
})

function renderCartItems(){
  let cartContainer = document.getElementById("cart-container")

  cartContainer.innerHTML = "";
  cart.forEach((cartProduct,index) => {
    cartContainer.innerHTML += `
      <div class="cart-items">
        <div class="item">
          <img src="" alt="Item 1">
          <div class="item-details">
            <h3>${cartProduct.name}</h3>
            <p>Price: ${cartProduct.price}</p>
            <button data-index = ${index} class="remove-cart-item-button">Remove</button>
          </div>
        </div>
      </div>
    `
    removeCartItem()
    console.log(index)
  });

}

function removeCartItem(){
  let removeButtons = document.querySelectorAll(".remove-cart-item-button")
  removeButtons.forEach(removeButton => {
    removeButton.addEventListener("click", function(){
      let index = parseInt(removeButton.dataset.index) 
      cart.splice(index, 1)
      this.parentNode.parentNode.remove()
      console.log(index)
    })
  });
  
}




  
  