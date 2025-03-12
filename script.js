import { buildings } from './data/data.js';

const header = document.getElementById('header');
const mainHtml = document.getElementById('mainHtml');
const filteringOptions = document.getElementById('filtering-options');
const sortingOptions = document.getElementById('filtering-options');

// Create an array of unique countries present in the database and sort them Alphabetically
const uniqueCountries = [
  ...new Set(buildings.map((buildings) => buildings.country).sort()),
];

const uniqueArchitects = [
  ...new Set(buildings.map((buildings) => buildings.architect).sort()),
];

const createSelectInput = (options, label) => {
  const selectDiv = document.createElement('div');
  selectDiv.classList.add('select-input');
  const selectLabel = document.createElement('label');
  selectLabel.htmlFor = label.toLowerCase();
  selectLabel.textContent = `${label} :`;
  const select = document.createElement('select');
  select.id = label.toLowerCase();
  select.name = label;
  selectDiv.append(selectLabel, select);

  const defaultOption = document.createElement('option');
  defaultOption.value = '';
  defaultOption.textContent = `- Select ${label} -`;
  const optGroup = document.createElement('optgroup');
  optGroup.label = `${label}`;
  select.appendChild(defaultOption);

  options.forEach((option) => {
    const opt = document.createElement('option');
    opt.textContent = option;
    opt.value = option;
    optGroup.appendChild(opt);
  });

  // Append the select input to the header
  select.appendChild(optGroup);
  filteringOptions.appendChild(selectDiv);
  return select;
};

// Function that creates a card for each building in the database
const createBuildingCards = (array) => {
  mainHtml.innerHTML = '';
  const buildingsContainer = document.createElement('div');
  buildingsContainer.classList.add('container-buildings');
  buildingsContainer.innerHTML = '';
  mainHtml.appendChild(buildingsContainer);

  array.forEach((building) => {
    const card = document.createElement('div');
    card.classList.add('card');

    const imgWrapper = document.createElement('div');
    imgWrapper.classList.add('card-img-wrapper');
    const img = document.createElement('img');
    img.src = building.image;
    imgWrapper.appendChild(img);
    const dataWrapper = document.createElement('div');
    dataWrapper.classList.add('card-data-wrapper');

    const title = document.createElement('span');
    title.classList.add('building-title');
    title.textContent = building.title;

    const architect = document.createElement('span');
    architect.classList.add('building-architect');
    architect.textContent = building.architect;

    dataWrapper.append(title, architect);
    card.append(imgWrapper, dataWrapper);
    buildingsContainer.appendChild(card);
  });
};

// function that creates an error message
const createAlertCard = () => {
  mainHtml.innerHTML = '';
  const container = document.createElement('div');
  container.style.display = 'grid';
  container.style.placeContent = 'center';
  const card = document.createElement('div');
  card.classList.add('card', 'alert');
  card.textContent = 'No buildings found. Try another search';
  container.appendChild(card);
  mainHtml.appendChild(container);
};

document.addEventListener('DOMContentLoaded', () => {
  createBuildingCards(buildings);

  const selectCountry = createSelectInput(uniqueCountries, 'Country');
  const selectArchitect = createSelectInput(uniqueArchitects, 'Architect');

  function filterBuildings() {
    const selectedCountry = selectCountry.value;
    const selectedArchitect = selectArchitect.value;
    let filteredBuildings = buildings;

    if (selectedCountry !== '') {
      filteredBuildings = filteredBuildings.filter(
        (building) => building.country === selectedCountry
      );
    }
    if (selectedArchitect !== '') {
      filteredBuildings = filteredBuildings.filter(
        (building) => building.architect === selectedArchitect
      );
    }
    if (filteredBuildings.length === 0) {
      createAlertCard();
      return;
    }

    createBuildingCards(filteredBuildings);
  }

  selectCountry.addEventListener('change', filterBuildings);
  selectArchitect.addEventListener('change', filterBuildings);
});
