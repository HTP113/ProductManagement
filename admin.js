function Product(productId, name, image, color, price, quantity) {
    this.productId = productId;
    this.name = name;
    this.image = image;
    this.color = color;
    this.price = price;
    this.quantity = quantity;

}

function init() {
    if (getData(key_data) == null) {
        products = [
            new Product(1, '神秘', "https://filebroker-cdn.lazada.vn/kf/S36e46a61ba3a469e8b575a2b98f1caefS.jpg", '颜色 红', 30, 7),
            new Product(2, '性感的', "https://salt.tikicdn.com/ts/tmp/f8/51/fb/665499a36c497442c1515045cda97ea3.jpg", '颜色 白', 20, 9),
            new Product(3, '迷人', "https://cf.shopee.vn/file/1120584e6cab844bd0684f5cf2cbbe6b", '颜色 白', 30, 7),
            new Product(4, '优雅的', "https://vn-live-05.slatic.net/p/0238676e9f579eea7aca878e06bc0f23.jpg_525x525q80.jpg", '颜色 黑', 20, 9),
            new Product(5, '和谐', "http://i.luctieumi.com/11669/tramcaitochoadaobac-4.jpg", '颜色 蓝', 30, 3),
        ]
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
function renderPagination(page_size, page_number) {
    let total_page = Math.ceil(products.length / page_size)
    let pagination = document.querySelector(".pagination>ul");
    pagination.innerHTML = "";
    for (let i = 1; i <= total_page; i++) {
        pagination.innerHTML += `<li class="page-item ${page_number == i ? 'active' : ''}"><button onclick='paging(${i})'>${i}</button></li>`
    }
}


function renderProduct() {
    let tbProduct = document.querySelector('.table>tbody');
    let trs = products.map(function (product) {
        return `
        <tr>
        <td>${product.productId}</td> <br>
         <td>${product.name}</td>
        <td>${product.color}</td>
        <td>${product.quantity}</td>
        <td>${formatCurrency(product.price)}</td>
        <td>国际的 (aboard)</td>
        <td>
            <button class="btn btn-warning" onclick="handleEditItem(${product.productId})">Change</button>
            <button class="btn btn-danger" onclick="handleDelete(${product.productId})">Remove</button>
        </td>
    </tr>
    `;
    })
    tbProduct.innerHTML = trs.join("");
    document.querySelector("#totalprice").innerHTML = totalPrice();
}
function totalPrice() {
    let totalPrice = 0;
    for (let i = 0; i < products.length; i++) {
        totalPrice = totalPrice + products[i].price * products[i].quantity;
    }
    return formatCurrency(totalPrice);

}

function formatCurrency(number){
    return number.toLocaleString('zh-CN', {
        style: 'currency',
        currency: 'CNY'
      });
}
function addProduct() {

    let productName = document.querySelector("#name").value;
    if (!validation(productName)) {
        alert("Product name is required!")
        return;
    }
    let color = document.querySelector("#color").value;
    let price = Number(document.querySelector("#price").value);
    let quantity = Number(document.querySelector("#quantity").value);
    let image = document.querySelector("#image").value;
    let productId = getLastestId() + 1;
    let newProduct = new Product(productId, productName, image, color, price, quantity);

    console.log(newProduct);
    products.push(newProduct);
    setData(key_data, products);
    renderProduct();
    resetForm();
}

function searchByName() {
    let searchWord = document.getElementById('search').value;
    searchWord = searchWord.trim().toLowerCase();
    let resultSearch = [];
    for (let i = 0; i < products.length; i++) {
        if (products[i].name.toLowerCase().includes(searchWord)) {
            resultSearch.push(products[i].id);
        }
    }
    if (searchWord == null || searchWord == '') {
        renderTable();
        return;
    } else {
        renderSearchList(resultSearch);
        document.getElementById('search').value = '';
    }

}

function validation(field) {
    if (field == null) {
        return false;
    }
    if (field.trim() == '') {
        return false;
    }
    return true;
}
function getLastestId() {
    let max = products[0].productId;
    for (let i = 1; i < products.length; i++) {
        if (products[i].productId > max) {
            max = products[i].productId;
        }
    }
    return max;


}
function resetForm() {
    document.querySelector("#name").value = "";
    document.querySelector("#color").value = "";
    document.querySelector("#price").value = "";
    document.querySelector("#image").value = "";
    document.querySelector("#quantity").value = "";
}

function validation(field) {
    return field != null && field.trim() != '';
}

function handleDelete(productId) {
    let confirmed = window.confirm("Do you want to remove this product?");
    if (confirmed) {
        let position = products.findIndex(function (pdt) {
            return pdt.productId == productId;
        })
        products.splice(position, 1);
        setData(key_data, products);
        renderProduct();
    }
}
function handleEditItem(productId) {
    document.querySelector("#btnAdd").style.display = "none";
    document.querySelector("#btnUpdate").style.display = "block";
    document.querySelector("#btnCancel").style.display = "block";

    document.getElementById("idEdit").value = productId;
    

    let product = findProductById2(productId);

    if(product != null){

        document.getElementById("name").value = product.name;
        document.getElementById("color").value = product.color;
        document.getElementById("price").value = product.price;
        document.getElementById("image").value = product.image;
        document.getElementById("quantity").value = product.quantity;
        }
    else{
        alert(" không tìm thấy sản phẩm")
    }

}

function findProductById2(productId) {
    let productE = products.find((productE) => {
        if (productId == productE.productId) {
            return true;
        }
    })
    return productE;
}

// thiếu 1 dòng//
function handleUpdate() {
    let name = document.getElementById("name").value;
    let color = document.getElementById("color").value;
    let price = +document.getElementById("price").value;
    let image = document.getElementById("image").value;
    let quantity = +document.getElementById("quantity").value;

    let idProductUpdate = document.getElementById("idEdit").value;


    if (name == "" || color == "" || price == "" || image == "" || quantity == "") {
        alert("Thông tin không hợp lệ vui lòng nhập lại")
    } else {
        let p = new Product(idProductUpdate, name, image, color, price, quantity);
        updateProductById(idProductUpdate, p);

        renderProduct();

        document.getElementById("name").value = "";
        document.getElementById("color").value = "";
        document.getElementById("price").value = "";
        document.getElementById("image").value = "";
        document.getElementById("quantity").value = "";

        document.querySelector("#btnAdd").style.display = "block";
        document.querySelector("#btnUpdate").style.display = "none";
        document.querySelector("#btnCancel").style.display = "none";

        setData(key_data, products);

    }



}

function updateProductById(productId, product) {
    for (let i = 0; i < products.length; i++) {
        if (products[i].productId == productId) {
            products[i].name = product.name;
            products[i].color = product.color;
            products[i].price = product.price;
            products[i].image = product.image;
            products[i].quantity = product.quantity;
        }
    }
}
function resetForm() {
    document.getElementById("txtName").value = "";
    document.getElementById("txtColor").value = "";
    document.getElementById("txtPrice").value = "";
    document.getElementById("txtImage").value = "";
    document.getElementById("txtQuantity").value = "";
}

function handleCancel() {
    resetForm();
    displayHiddenFrmAddUpdate('Add')

}



function getProductById(pdtId) {
    return products.find(function (pdt) {
        return pdt.productId == pdtId;
    })
}

function ready() {
    init()
    renderProduct();
}
var products = [];
const key_data = "product_data";
ready();