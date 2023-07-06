//variables
let allContainerCart = document.querySelector('.productos');
let containerBuyCart = document.querySelector('.card-items');
let priceTotal = document.querySelector('.price-total')
let amountProduct = document.querySelector('.count-product');


let buyThings = [];
let totalCard = 0;
let countProduct = 0;


loadEventListenrs();
function loadEventListenrs() {
    allContainerCart.addEventListener('click', addProduct);

    containerBuyCart.addEventListener('click', deleteProduct);
}

function addProduct(e) {
    e.preventDefault();
    if (e.target.classList.contains('btn-add-cart')) {
        const selectProduct = e.target.parentElement;
        readTheContent(selectProduct);
    }
}

function deleteProduct(e) {         //borrado de pedidos
    if (e.target.classList.contains('delete-product')) {
        const deleteId = e.target.getAttribute('data-id');
        Toastify({
            text: "Producto Eliminado",
            duration: 3000,
            destination: "https://github.com/apvarun/toastify-js",
            newWindow: true,
            close: true,
            gravity: "top",
            position: "right",
            stopOnFocus: true,
            offset: {
                y:165
            },
            style: {
            background: "linear-gradient(to right, #ff6c00, #d55a00, #b14b00,  #8d3c00, #7c3400 ,#592600, #000000)",
            },
            onClick: function(){}
        }).showToast();

        buyThings.forEach(value => {
            if (value.id == deleteId) {
                let priceReduce = parseFloat(value.price) * parseFloat(value.amount);
                totalCard = totalCard - priceReduce;
                totalCard = totalCard.toFixed(2);
            }
        });
        buyThings = buyThings.filter(product => product.id !== deleteId);

        countProduct--;
    }
    if (buyThings.length === 0) {
        priceTotal.innerHTML = 0;
        amountProduct.innerHTML = 0;
    }
    loadHtml();
    saveToLocalStorage();
}

function readTheContent(product) {
    const infoProducto = {
        image: product.querySelector('div img').src,
        title: product.querySelector('.title').textContent,
        price: product.querySelector('div p span').textContent,
        id: product.querySelector('a').getAttribute('data-id'),
        amount: 1
    }

    totalCard = parseFloat(totalCard) + parseFloat(infoProducto.price);
    totalCard = totalCard.toFixed(2);

    const exist = buyThings.some(product => product.id === infoProducto.id);
    if (exist) {
        const pro = buyThings.map(product => {
            if (product.id === infoProducto.id) {
                product.amount++;
                return product;
            } else {
                return product
            }
        });
        buyThings = [...pro];
    } else {
        buyThings = [...buyThings, infoProducto]
        countProduct++;
    }
    loadHtml();
    saveToLocalStorage();
}

function loadHtml() {
    clearHtml();
    buyThings.forEach(product => {
        const { image, title, price, amount, id } = product;
        const row = document.createElement('div');
        row.classList.add('item');
        row.innerHTML = `
            <img src="${image}" alt="">
            <div class="item-content">
                <h5>${title}</h5>
                <h4 class="cart-price">${price}$</h4>
                <h5>Cantidad: ${amount}</h5>
            </div>
            <span class="delete-product" data-id="${id}">X</span>
        `;
        containerBuyCart.appendChild(row);
        priceTotal.innerHTML = totalCard;
        amountProduct.innerHTML = countProduct;
    });
}

function clearHtml() {
    containerBuyCart.innerHTML = '';
}
//------- JSON --------
function saveToLocalStorage() {
    localStorage.setItem('buyThings', JSON.stringify(buyThings));
    localStorage.setItem('totalCard', totalCard);
    localStorage.setItem('countProduct', countProduct);
}

function getFromLocalStorage() {
    if (localStorage.getItem('buyThings')) {
        buyThings = JSON.parse(localStorage.getItem('buyThings'));
        totalCard = localStorage.getItem('totalCard');
        countProduct = localStorage.getItem('countProduct');

        loadHtml();
    }
}
getFromLocalStorage();

//------reset del carrito y del contador en imagen

const resetCartButton = document.querySelector('#reset_carrito');
resetCartButton.addEventListener('click', resetCart);

function resetCart() {
    buyThings = [];
    totalCard = 0;
    countProduct = 0;
    clearHtml();
    saveToLocalStorage();
    priceTotal.innerHTML = 0;
    amountProduct.innerHTML = 0;
    Toastify({
        text: "Pedido Eliminado",
        duration: 3000,
        destination: "https://github.com/apvarun/toastify-js",
        newWindow: true,
        close: true,
        gravity: "top",
        position: "right",
        stopOnFocus: true,
        offset: {
            y:165
        },
        style: {
        background: "linear-gradient(to right, #ff6c00, #d55a00, #b14b00,  #8d3c00, #7c3400 ,#592600, #000000)",
        },
        onClick: function(){}
    }).showToast();
}


