var productNameInput=document.getElementById("productName");
var productPriceInput=document.getElementById("productPrice");
var productCategoryInput=document.getElementById("productCategory");
var productDescInput=document.getElementById("productDesc");
var inputs=document.querySelectorAll(".form-control");
var productsContainer ;
if (localStorage.getItem("productList") == null)
{
    productsContainer=[];
}
else
{
    productsContainer = JSON.parse(localStorage.getItem("productList"));
    displayProduct()

}
function addProudct(){
    var product ={
        name:productNameInput.value,
        price:productPriceInput.value,
        category:productCategoryInput.value,
        descr:productDescInput.value
    }
    productsContainer.push(product);
    localStorage.setItem("productList" , JSON.stringify(productsContainer));
    
    clearForm()
    displayProduct()
  
}
function clearForm(){
    for(i=0;i<inputs.length;i++){
        inputs[i].value="";
    }
}

function displayProduct(){
    var productLis=``;
    var tbody =document.querySelector(".tableBody");
    for(var i=0 ; i<productsContainer.length;i++){
        productLis+=` <tr class="mt-4">

        <td>${i}</td>
        <td>${productsContainer[i].name}</td>
        <td>${productsContainer[i].price}</td>
        <td>${productsContainer[i].category}</td>
        <td>${productsContainer[i].descr}</td>
        <td><button onclick="updateProduct(${i})" class="btn btn-outline-warning">Update</button></td>
        <td><button onclick="deleteProduct(${i})" class="btn btn-outline-Danger">Delete</button></td>

    </tr>
        `
    }
    tbody.innerHTML=productLis;

}

function searchProduct(term){   
    var productList =``;
    for (var i=0 ;i<productsContainer.length;i++){
        if(productsContainer[i].name.toLowerCase().includes(term.toLowerCase()) == true){
            productList += `<tr>
            <td>${i}</td>
            <td>${productsContainer[i].name}</td>
            <td>${productsContainer[i].price}</td>
            <td>${productsContainer[i].category}</td>
            <td>${productsContainer[i].descr}</td>
            <td><button onclick="updateProduct(${i})" class="btn btn-outline-warning">Update</button></td>
            <td><button onclick="deleteProduct(${i})" class="btn btn-outline-Danger">Delete</button></td>
        </tr>`
        }
    }
    document.querySelector(".tableBody").innerHTML = productList;
}

function deleteProduct(index){
    productsContainer.splice(index , 1);
    localStorage.setItem("productList" , JSON.stringify(productsContainer));
    displayProduct();

}

function updateProduct(index){

     productNameInput.value = productsContainer[index].name;
     productPriceInput.value = productsContainer[index].price;
     productCategoryInput.value = productsContainer[index].category;
     productDescInput.value = productsContainer[index].descr;
     updateIndex=index;
     document.getElementById("saveProduct").style.display="inline"
}

function saveEdit(){
    var saveEditProduct={
        name:productNameInput.value,
        price:productPriceInput.value,
        category:productCategoryInput.value,
        descr:productDescInput.value
    }
    productsContainer.splice(updateIndex,1,saveEditProduct);
    localStorage.setItem("productList" , JSON.stringify(productsContainer));
    clearForm()
    displayProduct()
    document.getElementById("saveProduct").style.display="none"

}