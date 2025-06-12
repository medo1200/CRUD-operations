let title = document.getElementById("title");
let price = document.getElementById('price');
let taxes = document.getElementById('taxes');
let ads = document.getElementById("ads");
let discount = document.getElementById('discount');
let total = document.getElementById('total'); // small element
let count = document.getElementById('count'); // Loop based on its number
let category = document.getElementById('category');
let submit = document.getElementById('submit'); // Create Button
let deleteAllBtn = document.getElementById('deleteAll'); // deleteAll button
let myData;  // assigned array
let search = document.querySelector('.search'); // search input
let updateIndex = null; // Add this at the top


// get total
function getTotal() {
    if (price.value != "") {
        let result = (+price.value + +taxes.value + +ads.value) - +discount.value;
        total.style.background = "green";
        total.innerHTML = result;
    } else {
        total.style.background = "red";
        total.innerHTML = "";
    }
}


// If != null , show it
if (localStorage.getItem('product') != null) {
    // Assign localStorage.getItem('') to array[] using JSON.parse()
    myData = JSON.parse(localStorage.getItem('product'));
} else {
    myData = []; // if localStorage empty => assign an empty array[];
}


// On Create/Update Button
submit.onclick = function() {
    // Inputs validation for Title,Price,Category
    if (title.value == '' || price.value == '' || category.value == '') {
        alert("Please fill the required areas");
    } else if (count.value > 500) {
        alert("Tegar message: You can't add more than 500 count in one time");
    } else if (updateIndex !== null) {
        // Update Mode
        myData[updateIndex] = {
            title: title.value,
            price: price.value,
            taxes: taxes.value,
            ads: ads.value,
            discount: discount.value,
            total: total.innerHTML,
            count: 1,
            category: category.value,
        };

        localStorage.setItem('product', JSON.stringify(myData)); // Save after modification

        clearInputsData();
        readMyData();
        submit.innerText = "Create";
        count.readOnly = false;
        updateIndex = null;
        deleteAllData();

    } else {
        // Create Mode
        let myObject = {
            title: title.value,
            price: price.value,
            taxes: taxes.value,
            ads: ads.value,
            discount: discount.value,
            total: total.innerHTML,
            count: count.value,
            category: category.value,
        }
        // Loop for Count 
        if (count.value > 1) {
            for (let i = 0; i < count.value; i++)
                myData.push(myObject);
        } else {
            myData.push(myObject);
        }
        localStorage.setItem('product', JSON.stringify(myData));
        clearInputsData();
        readMyData();
        deleteAllData();
    }
};


// ( R )read data
function readMyData() {
    let table = document.getElementById('tbody');
    table.innerHTML = "";

    for (let i = 0; i < myData.length; i++) {

        table.innerHTML += `
        <tr>
                <th>${i + 1}</th>
                <th>${myData[i].title}</th>
                <th>${myData[i].price}</th>
                <th>${myData[i].taxes}</th>
                <th>${myData[i].ads}</th>
                <th>${myData[i].discount}</th>
                <th>${myData[i].total}</th>
                <th>${myData[i].category}</th>
                <th><button onclick="updateMyData(${i})">Update</button></th>
                <th><button onclick="deleteData(${i})">delete</button></th>
        </tr>`;
    }
};
readMyData();


// search data
let toggleChoice = "searchbytitle"; // default option

function searchMethod(toggleChoice) {

    document.querySelector('#searchTitle').onclick = () => {
        document.querySelector('#searchTitle').style.border = "3px solid pink";
        document.querySelector('#searchCategory').style.border = "none";
        toggleChoice = "searchbytitle";
        searchMethod(toggleChoice);
    };
    document.querySelector('#searchCategory').onclick = () => {
        document.querySelector('#searchCategory').style.border = "3px solid pink";
        document.querySelector('#searchTitle').style.border = "none";
        toggleChoice = "searchbycategory";
        searchMethod(toggleChoice);
    };



    if (toggleChoice === "searchbytitle") {
        search.onkeyup = function searchByTitle() {
            document.querySelector('#tbody').innerHTML = "";

            for (let i = 0; i < myData.length; i++) {
                if (myData[i].title.toLowerCase().includes((search.value).toLowerCase())) {
                    document.querySelector('#tbody').innerHTML += `
                <tr>
                        <th>${i + 1}</th>
                        <th>${myData[i].title}</th>
                        <th>${myData[i].price}</th>
                        <th>${myData[i].taxes}</th>
                        <th>${myData[i].ads}</th>
                        <th>${myData[i].discount}</th>
                        <th>${myData[i].total}</th>
                        <th>${myData[i].category}</th>
                        <th><button>Update</button></th>
                        <th><button onclick="deleteData(${i})">delete</button></th>
                </tr>`;

                } else {
                    console.log(myData[i].title + " Is not equal to what you typed");
                }
            }
        };


    } else if (toggleChoice === "searchbycategory") {
        search.onkeyup = function searchByCategory() {
            document.querySelector('#tbody').innerHTML = "";

            for (let i = 0; i < myData.length; i++) {
                if (myData[i].category.toLowerCase().includes((search.value).toLowerCase())) {
                    document.querySelector('#tbody').innerHTML += `
                <tr>
                        <th>${i + 1}</th>
                        <th>${myData[i].title}</th>
                        <th>${myData[i].price}</th>
                        <th>${myData[i].taxes}</th>
                        <th>${myData[i].ads}</th>
                        <th>${myData[i].discount}</th>
                        <th>${myData[i].total}</th>
                        <th>${myData[i].category}</th>
                        <th><button>Update</button></th>
                        <th><button onclick="deleteData(${i})">delete</button></th>
                </tr>`;

                } else {
                    console.log(myData[i].title + " Is not equal to what you typed");
                }
            }
        };

    } else {
        alert("You don't choose search by title or by category");
    }

}
searchMethod(toggleChoice);




function updateMyData(i){
    clearInputsData();
    title.value = `${myData[i].title}`;
    price.value = `${myData[i].price}`;
    taxes.value = `${myData[i].taxes}`;
    ads.value = `${myData[i].ads}`;
    discount.value = `${myData[i].discount}`;
    total.innerHTML = `${myData[i].total}`;
    count.value = 1;
    count.readOnly = true;
    category.value = `${myData[i].category}`;
    submit.innerText = "Update";
    updateIndex = i;
}




// delete data
function deleteData(i) {
    myData.splice(i, 1);
    localStorage.product = JSON.stringify(myData);
    readMyData();
    deleteAllData();
}


// delete all data
function deleteAllData() {
    deleteAllBtn.innerHTML = `Delete All ( ${myData.length} )`;

    if (myData.length > 0) {
        deleteAll.style.display = 'block';
    } else {
        deleteAll.style.display = 'none';
    }
    deleteAllBtn.onclick = function () {
        localStorage.clear(); // clear localStorage
        myData.splice(0); // Clear array
        location.reload();  // refresh page with new results
    }
}
deleteAllData();


// clear inputs 
function clearInputsData() {
    title.value = '';
    price.value = '';
    taxes.value = "";
    ads.value = "";
    discount.value = '';
    total.innerHTML = '';
    count.value = '';
    category.value = '';
};
