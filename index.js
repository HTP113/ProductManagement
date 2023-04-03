class Product {
    constructor(productId, name,image, color, price, quantity) {
        this.productId = productId;
        this.name = name;
        this.image = image;
        this.color = color;
        this.price = price;
        this.quantity = quantity;
    }
}

function init() {
    if (getData(key_data) == null) {
        setData(key_data, products);
    }
    else {
        products = getData(key_data);
    }
}
function getData(key) {
    return JSON.parse(localStorage.getItem(key))
}
function setData(key, data) {
    localStorage.setItem(key, JSON.stringify(data))
}
function renderProductIndex() {
    // let tbProduct = document.querySelector('.table>tbody');
    let tbProduct = document.querySelector('#tbLip');
    let trs = products.map(function (product) {
        return `
                <div class="font_size">
                <img src="${product.image}" alt=""><br>
                <a href="" class="buynow">Order</a>
                <span class="stt">${product.quantity}</span><br>
                <span class="name">${product.name}</span> <br>
                <span class="price">${formatCurrency(product.price)}</span>
            </div>
    `;
    })
    tbProduct.innerHTML = trs.join("");
}

function formatCurrency(number){
    return number.toLocaleString('zh-CN', {
        style: 'currency',
        currency: 'CNY'
      });
}
function ready() {
    init()
    renderProductIndex();
}
var products = [];
const key_data = "product_data";
ready();
