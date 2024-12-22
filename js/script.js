var Delete= document.getElementById("Delete");
var Update= document.getElementById("Update")
var Show =document.getElementById("Show");
var Add= document.getElementById("Add")

function DisplayNode() {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", `http://localhost:3000/node`);
    xhr.send();
     xhr.addEventListener("readystatechange", function () {
       if (xhr.readyState == 4 ) {
         var data = JSON.parse(xhr.responseText);
          data.forEach(function(data) {
           var nodeElement = document.createElement('div');
          nodeElement.innerHTML = `
          
            <p><strong>Title:</strong> ${data.title}</p>
            <p><strong>Body:</strong> ${data.body}</p>
          
          `;
           nodeInfo.appendChild(nodeElement);
        });
       } else if (xhr.readyState == 4 && xhr.status !== 200) {
        console.error("Error fetching data");
      }
    });
  }
DisplayNode();

 
Update.addEventListener("click", function () {
    const inputIdUpdat = document.getElementById("inputIdUpdat").value.trim();
    const title = document.getElementById("title").value.trim();
    const body = document.getElementById("body").value.trim();
     if (!inputIdUpdat || !title || !body) {
        alert("Please enter a valid ID and valid both title and body  !!!!!!!!!");
        return;
    }
    const updatedBook = {
        title: title,
        body: body
    };
    const xhr = new XMLHttpRequest();
    xhr.open("PATCH", `http://localhost:3000/node/${inputIdUpdat}`, true);
    xhr.setRequestHeader("Content-Type", "application/json");

      xhr.onload = function() {
        if (xhr.status === 200) {
            alert("Book updated successfully!");
            displayNode();  
        } else {
            alert("Error updating book. Please check the ID.");
        }
    };
    xhr.send(JSON.stringify(updatedBook));
});

Delete.addEventListener("click", function() {
    const inputId = document.getElementById("inputId").value.trim();
     if (!inputId) {
      alert("Please enter Valid ID to delete.");
     }
  
    const xhr = new XMLHttpRequest();
    xhr.open("DELETE", `http://localhost:3000/node/${inputId}`);
 
   xhr.onload = function() {
    if (xhr.status === 200) {
       alert("Book deleted successfully!");
      DisplayNode(); 
    } else {
       alert("Error deleting book. Please check the ID.");
    }
  };

  xhr.send(); 
});
  


Add.addEventListener("click", function () {
    const titleAdd = document.getElementById("titleAdd").value.trim();
    const bodyAdd = document.getElementById("bodyAdd").value.trim();
    const regTitle = /^[a-zA-Z]{6,}/;
    if (titleAdd === '') {
        alert("Please enter the title.");
        return;
    }
    if (!regTitle.test(titleAdd)) {
        alert("Title must be at least 6 characters long.");
        return;
    }
    const regBody = /^[a-zA-Z0-9\s]{20,}$/;   
    if (bodyAdd === '') {
        alert("Please enter the body.");
        return;
    }
    if (!regBody.test(bodyAdd)) {
        alert("Body must be at least 20 characters long.");
        return;
    }
    const newBook = {
        title: bodyAdd,
        body: bodyAdd
    };
    const xhr = new XMLHttpRequest();
    xhr.open("POST", "http://localhost:3000/node");  
     xhr.onload = function () {
        if (xhr.status === 201) {
            alert("Book added successfully!");
        } else {
            alert("Error adding the book. Please try again.");
        }
    };
    xhr.send(JSON.stringify(newBook));
});
