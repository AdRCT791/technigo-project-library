import { buildings } from './data/data.js';

// const header = document.getElementById('header');
const mainHtml = document.getElementById('mainHtml');
const filteringOptions = document.getElementById('filtering-options');
const sortingOptions = document.getElementById('filtering-options');
const btnSortingByCountry = document.getElementById('sort-by-country');
const btnRandomBuilding = document.getElementById('random-building');
const btnResetGallery = document.getElementById('reset-gallery');

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
  select.classList.add('dropdown');
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

    // Destructuring the object for easier access to properties
    const { title, architect, builtYear, ...otherProps } = building;

    if (title) {
      const span = document.createElement('span');
      span.classList.add(`building-title`);
      span.textContent = building.title;
      dataWrapper.append(span);
    }

    if (architect) {
      const span = document.createElement('span');
      span.classList.add(`building-architect`);
      span.textContent = `${building.architect} - ${building.builtYear}`;
      dataWrapper.append(span);
    }

    // creating a tag wrapper for the card
    const tagsWrapper = document.createElement('div');
    tagsWrapper.classList.add('tags-wrapper');
    dataWrapper.appendChild(tagsWrapper);

    // Looping through the remaining properties
    Object.entries(otherProps).forEach(([key, value]) => {
      if (key !== 'image') {
        const span = document.createElement('span');
        span.classList.add(`tag`);
        span.textContent = value;
        tagsWrapper.append(span);
      }
    });

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

const getFilteredBuildings = (buildings, country, architect) => {
  let filteredBuildings = buildings;
  if (country !== '') {
    filteredBuildings = filteredBuildings.filter(
      (building) => building.country === country
    );
  }
  if (architect !== '') {
    filteredBuildings = filteredBuildings.filter(
      (building) => building.architect === architect
    );
  }
  return filteredBuildings;
};

// Retrieve a random index from a given array
const getRandomIndex = (array) => Math.floor(Math.random() * array.length);

const pickRandomBuilding = () => {
  const randomIndex = getRandomIndex(buildings);
  let randomBuilding = buildings;
  randomBuilding = [buildings[randomIndex]];
  createBuildingCards(randomBuilding);
};

const resetGallery = () => createBuildingCards(buildings);

document.addEventListener('DOMContentLoaded', () => {
  // Current state
  let currentBuildings = buildings;

  // Render the select input elements
  const selectCountryInput = createSelectInput(uniqueCountries, 'Country');
  const selectArchitectInput = createSelectInput(uniqueArchitects, 'Architect');

  const handleSort = () => {
    let sortOrder = 'asc';

    return () => {
      sortOrder = sortOrder === 'asc' ? 'desc' : 'asc';

      const sortedBuildings = [...currentBuildings].sort((a, b) => {
        const comparison = a.country.localeCompare(b.country);
        return sortOrder === `asc` ? comparison : -comparison;
      });

      currentBuildings = sortedBuildings;
      createBuildingCards(currentBuildings);
    };
  };

  function handleFilter() {
    // Filter
    const selectedCountry = selectCountryInput.value;
    const selectedArchitect = selectArchitectInput.value;
    const filteredBuildings = getFilteredBuildings(
      buildings,
      selectedCountry,
      selectedArchitect
    );

    if (filteredBuildings.length === 0) {
      createAlertCard();
      return;
    }

    // Update current state
    currentBuildings = filteredBuildings;
    createBuildingCards(currentBuildings);
    return currentBuildings;
  }

  // Event Listeners
  selectCountryInput.addEventListener('change', handleFilter);
  selectArchitectInput.addEventListener('change', handleFilter);
  btnSortingByCountry.addEventListener('click', handleSort());
  btnRandomBuilding.addEventListener('click', pickRandomBuilding);
  btnResetGallery.addEventListener('click', resetGallery);

  // Initial Display
  handleFilter();
});
