async function loadMedicines() {
  let medicines = document.querySelector("main .medicines");

  var response = await fetch("https://localhost:7266/api/Features/GetMedicinesWithDosages");
  var data = await response.json();

  if (data.length == 0) {
    medicines.innerHTML = `
    `;
  }
  else {
      for (let i = 0; i < data.length; i++) {
          medicines.innerHTML += `
            <div class="medicine">
              <div class="image">
                <img src= "../images/Aspirin-Regular-extra-strength-100ct-carton.avif" >
              </div>
              <div class="info">
                <div class="main">
                  <div class="name">${data[i].name.substring(0, 8)}</div>
                  <div class="dosage">${data[i].dosage}</div>
                  <div class="price">${data[i].unitPrice} <span>$</span></div>
                </div>
                <div class="main2">
                  <div class="expire">${new Date(data[i].expireDate).toLocaleDateString()}</div>
                  <div class="stockQuantity">Stock: ${data[i].stockQuantity} unit</div>
                </div>
              </div>
          </div>
      `;
      }
  }
}

loadMedicines();

var searchInput = document.getElementById("searchInput");
searchInput.addEventListener('input',function(event) {
  const searchQuery = event.target.value.trim();
  
  if (searchQuery != ' ') {
    searchMedicine(searchQuery);
  }
  else {
    clearResults();
  }
  
})


function searchMedicine(searchQuery) {
  const apiUrl = 'https://localhost:7266/api/Features/SearchMedicineBy';

  const requestData = {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json', 
      },
      body: JSON.stringify(searchQuery), // Convert data to JSON format
  };

  fetch(apiUrl, requestData)
      .then(response => {
          if (!response.ok) {
              throw new Error('Bad Request');
          }
          return response.json();
      })
      .then(data => {
          displayResults(data)
      })
      .catch(error => {
          console.error('There was a problem with the fetch operation:', error);
      });
}

const medicines = document.querySelector("main .medicines");

function displayResults(data) {
  medicines.innerHTML = ''; 

  if (data.length > 0) {
      data.forEach(medicine => {
        const medicineElement = document.createElement('div');
        medicineElement.classList.add('medicine');

        const imageDiv = document.createElement('div');
        imageDiv.classList.add('image');
        const image = document.createElement('img');
        image.src = "../images/Aspirin-Regular-extra-strength-100ct-carton.avif";
        imageDiv.appendChild(image);

        const infoDiv = document.createElement('div');
        infoDiv.classList.add('info');

        const mainDiv = document.createElement('div');
        mainDiv.classList.add('main');
        mainDiv.innerHTML = `
            <div class="name">${medicine.name.substring(0, 8)}</div>
            <div class="dosage">${medicine.dosage}</div>
            <div class="price">${medicine.unitPrice} <span>$</span></div>
        `;

        const main2Div = document.createElement('div');
        main2Div.classList.add('main2');
        main2Div.innerHTML = `
            <div class="expire">${new Date(medicine.expireDate).toLocaleDateString()}</div>
            <div class="stockQuantity">Stock: ${medicine.stockQuantity} unit</div>
        `;

        infoDiv.appendChild(mainDiv);
        infoDiv.appendChild(main2Div);

        medicineElement.appendChild(imageDiv);
        medicineElement.appendChild(infoDiv);

        medicines.appendChild(medicineElement);
      });
  } else {
      // medicines.textContent = 'No results found';
      medicines.innerHTML = `
      <div class="alert alert-warning" role="alert">
        No Medicines Found !!!
      </div>
    `;
  }
}

function clearResults() {
    medicines.innerHTML = ' ';
}