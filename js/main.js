var productNameInput = document.getElementById("ProductName");
var productPriceInput = document.getElementById("ProductPrice");
var productCatInput = document.getElementById("ProductCat");
var productDesInput = document.getElementById("ProductDes");
var inputs = document.getElementsByClassName("form-control");
var addBtn = document.getElementById("addBtn");
var currentIndex =0;
var products;
if (localStorage.getItem("dataLists") == null) {
    products = [];
}
else {
    products = JSON.parse(localStorage.getItem("dataLists"))
    displayData();
}
function addProduct() {
    var product = {
        name: productNameInput.value,
        price: productPriceInput.value,
        category: productCatInput.value,
        description: productDesInput.value
    }
    products.push(product);
    localStorage.setItem("dataLists", JSON.stringify(products));
}
function displayData() {
    var data = "";
    for (var i = 0; i < products.length; i++) {
        data +=
            `
        <tr>
        <td>${products[i].name}
        </td><td>${products[i].price}</td>
        <td>${products[i].category}</td>
        <td>${products[i].description}</td>
        <td><button onclick="deleteProduct(${i})" class="btn btn-danger">DELETE</button></td>
        <td><button onclick="gerProductInfo(${i})" class="btn btn-warning">UPDATE</button></td>
        </tr>
        `
    }
    document.getElementById("tableBody").innerHTML = data;
}
function clear() {
    for (var i = 0; i < inputs.length; i++) {
        inputs[i].value = "";
    }
}
function deleteProduct(index) {
    products.splice(index, 1);
    displayData();
    localStorage.setItem("dataLists", JSON.stringify(products));
}
addBtn.onclick = function () {
    if (addBtn.innerHTML == "ADD PRODUCT") {
        addProduct();
    }
    else {
        updateProduct();
    }
    displayData();
    clear();
}
function search(txtSearch) {
    var data = "";
    for (var i = 0; i < products.length; i++) {
        if (products[i].name.toLowerCase().includes(txtSearch.toLowerCase())) {
            data +=
                `
        <tr>
        <td>${products[i].name}
        </td><td>${products[i].price}</td>
        <td>${products[i].category}</td>
        <td>${products[i].description}</td>
        <td><button onclick="deleteProduct(${i})" class="btn btn-danger">DELETE</button></td>
        <td><button onclick="gerProductInfo(${i})" class="btn btn-warning">UPDATE</button></td>
        </tr>
        `
        }
    }
    document.getElementById("tableBody").innerHTML = data;
}

function gerProductInfo(index) {
    currentIndex =index;

    var Uproduct = products[index];
    productNameInput.value = Uproduct.name;
    productPriceInput.value = Uproduct.price;
    productCatInput.value = Uproduct.category;
    productDesInput.value = Uproduct.description;

    addBtn.innerHTML = "UPDATE PRODUCT"
}
function updateProduct() {
    var product = {
        name: productNameInput.value,
        price: productPriceInput.value,
        category: productCatInput.value,
        description: productDesInput.value
    }
    products[currentIndex].name = product.name;
    products[currentIndex].price = product.price;
    products[currentIndex].category = product.category;
    products[currentIndex].description = product.description;
    localStorage.setItem("dataLists", JSON.stringify(products));
    
}