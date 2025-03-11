import { buildings } from './data/data.js';

const mainContainer = document.getElementById('container-buildings');

// Create an array of unique countries present in the database and sort them Alphabetically
const uniqueCountries = [
  ...new Set(buildings.map((buildings) => buildings.country).sort()),
];

const uniqueArchitects = [
  ...new Set(buildings.map((buildings) => buildings.architect).sort()),
];

const createSelectInput = (uniqueProperties, propName) => {
  const selectPropertyLabel = document.createElement('label');
  const selectPropertySelect = document.createElement('select');

  uniqueProperties.forEach((property) => {
    const option = document.createElement('option');
    option.innerText = property;
    option.value = property;
    selectPropertySelect.appendChild(option);
  });

  // Append the select input to the header
  const header = document.getElementById('header');
  header.append(selectPropertyLabel, selectPropertySelect);

  // Add Event Listener to the select input
  let arrayFilteredByProperty = [];

  selectPropertySelect.addEventListener('change', (event) => {
    const selectedValue = event.target.value;

    // filter the buildings array based on the selected value
    arrayFilteredByProperty = buildings.filter(
      (building) => building[propName] === selectedValue
    );
    console.log(arrayFilteredByProperty);
  });
};

// Function that creates a card for each building in the database
const createBuildingCards = () => {
  buildings.forEach((building) => {
    const buildingElement = document.createElement('div');
    buildingElement.classList.add('card');
    buildingElement.textContent = `${building.title} - ${building.architect}`;
    mainContainer.appendChild(buildingElement);
  });
};

document.addEventListener('DOMContentLoaded', () => {
  createSelectInput(uniqueCountries, 'country');
  createSelectInput(uniqueArchitects, 'architect');
  createBuildingCards();
});
