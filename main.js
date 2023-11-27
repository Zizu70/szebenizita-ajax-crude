import "./style.css";


const api_url = "https://retoolapi.dev/qJEfMm/Racehorses"

document.addEventListener("DOMContentLoaded", () => {
  const horseForm = document.getElementById("horseForm");
  const resetButton = document.getElementById("resetButton");
  resetButton.addEventListener("click", resetForm);
  horseForm.addEventListener("submit", handleFormSubmit);
  listHorse();
});

function handleFormSubmit(event) { 
  event.preventDefault();
  const id = document.getElementById("id").value;
  const Horse = document.getElementById("name").value;
  const Age = document.getElementById("age").value;
  const Gender = document.querySelector('input[name="gender"]:checked').value;
  const Competes = document.querySelector('input[name="race"]:checked').value;
  const Ranking = document.getElementById('rank').value;
  const horse = {
    Horse: Horse,
    Age: Age,
    Gender: Gender,
    Competes: Competes,
    Ranking: Ranking,
    Gender: Gender
  };
  if (id == "") {
    addHorse(horse);
  } else {
    updateHorse(id, horse);
  }
}

async function updateHorse(id, horse) {
  const response = await fetch(`${api_url}/${id}`, {
    method: "PATCH",
    body: JSON.stringify(horse),
    headers: {
      "Content-Type": "application/json"
    }
  });
  if (response.ok) {
    resetForm();
    listHorse();
  }
}

async function addHorse(horse) {
  console.log(horse);  // nem feltétlen kell
  console.log(JSON.stringify(horse)); // nem feltétlen kell
  
  const response = await fetch(api_url, {
    method: "POST",
    body: JSON.stringify(horse), 
    headers: {
      "Content-Type": "application/json"
    }
  });
  if (response.ok) {
    listHorse();
    resetForm();
  } 
}

function resetForm() {
  document.getElementById('id').value = "";
  document.getElementById('name').value = "";
  document.getElementById('age').value = "";
  document.querySelector('input[name="gender"]:checked').checked = false;
  document.querySelector('input[name="race"]:checked').checked = false;
  document.getElementById('rank').value = "";
  document.getElementById("updateButton").classList.add('hide');
  document.getElementById("submitButton").classList.remove('hide');


/*
  genderInputs.forEach(input => {
    input.checked = false;
  });

  raceInputs.forEach(input => {
    input.checked = false;
  });  */
  
  
}

function listHorse() {
  const horseTable = document.getElementById("horseTable");  
  fetch(api_url).then(httpResponse => httpResponse.json())
  
  .then(responseBody => {
    console.log(responseBody)  // nem feltétlen kell
    horseTable.innerHTML = "";
    responseBody.forEach(horse => {
      const tableRow = document.createElement("tr");
      const idTableData = document.createElement("td");
      const HorseTableData = document.createElement("td");
      const AgeTableData = document.createElement("td");
      const GenderTableData = document.createElement("td");
      const CompetesTableData = document.createElement("td");
      const RankingTableData = document.createElement("td");  

      const actionsTableData = document.createElement("td");

      const updateButton = document.createElement("button");
      updateButton.textContent = "Update";
      
      updateButton.addEventListener("click", () => updateForm(horse.id));  //Id volt
      actionsTableData.appendChild(updateButton)

      const deleteButton = document.createElement("button");
      deleteButton.textContent = "Delete";
    
      deleteButton.addEventListener("click", () => deleteHorse(horse.id));  //Id volt
      actionsTableData.appendChild(deleteButton)     
      
      idTableData.textContent = horse.id;
      HorseTableData.textContent = horse.Horse;
      AgeTableData.textContent = horse.Age;
      GenderTableData.textContent = horse.Gender;
      CompetesTableData.textContent = horse.Competes;
      RankingTableData.textContent = horse.Ranking;


      tableRow.appendChild(idTableData);
      tableRow.appendChild(HorseTableData);
      tableRow.appendChild(AgeTableData);
      tableRow.appendChild(GenderTableData);
      tableRow.appendChild(CompetesTableData);
      tableRow.appendChild(RankingTableData);

      tableRow.appendChild(actionsTableData);
      horseTable.appendChild(tableRow);
    });
  });
}

async function deleteHorse(id) {  
  console.log("Delete Horse - Horse ID:", id); // ell ként
  const response = await fetch(`${api_url}/${id}`, { method: "DELETE" });
  console.log(response);
  console.log(await response.text());
  if (response.ok) {
    listHorse();
  }
}

async function updateForm(id) {
  console.log("Update Form - Horse ID:", id);  // ellként
  const response = await fetch(`${api_url}/${id}`);
  if (!response.ok) {
    alert("Hiba az adatok lekérése során!");
    return;
  }
  const horse = await response.json();
  document.getElementById("id").value = horse.id;
  document.getElementById("name").value = horse.Horse;
  document.getElementById("age").value = horse.Age;
  document.getElementById("gender").value = horse.Gender;
  document.getElementById("race").value = horse.Competes;
  document.getElementById("rank").value = horse.Ranking;

  document.getElementById("submitButton").classList.add('hide'); // ('display-none')
  document.getElementById("updateButton").classList.remove('hide'); // ('display-none')
}


