var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
import { buildings } from './data';
import { shuffleArray, getFilteredBuildings, getRandomIndex } from './utils';
// DOM Elements
const mainHtml = document.getElementById('mainHtml');
const filteringOptions = document.getElementById('filtering-options');
const sortingOptions = document.getElementById('sorting-options');
const btnRandomBuilding = document.getElementById('random-building');
const btnResetGallery = document.getElementById('reset-gallery');
const searchInput = document.getElementById('search-input');
// Create an array of unique countries present in the database and sort them Alphabetically
const uniqueCountries = [
    ...new Set(buildings.map((buildings) => buildings.country).sort()),
];
const uniqueArchitects = [
    ...new Set(buildings.map((buildings) => buildings.architect).sort()),
];
const createSelectInput = (options, label, container) => {
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
    container.appendChild(selectDiv);
    return select;
};
// Function that creates a card for each building in the database
const createBuildingCards = (buildings) => {
    mainHtml.innerHTML = '';
    const buildingsContainer = document.createElement('div');
    buildingsContainer.classList.add('container-buildings');
    buildingsContainer.innerHTML = '';
    mainHtml.appendChild(buildingsContainer);
    buildings.forEach((building) => {
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
        const { title, architect, builtYear } = building, otherProps = __rest(building, ["title", "architect", "builtYear"]);
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
const pickRandomBuilding = () => {
    const randomIndex = getRandomIndex(buildings);
    let randomBuilding = buildings;
    randomBuilding = [buildings[randomIndex]];
    createBuildingCards(randomBuilding);
};
const resetGallery = () => createBuildingCards(buildings);
document.addEventListener('DOMContentLoaded', () => {
    // Current state
    let currentBuildings = shuffleArray(buildings);
    // Render the select input elements
    const selectCountryInput = createSelectInput(uniqueCountries, 'Country', filteringOptions);
    const selectArchitectInput = createSelectInput(uniqueArchitects, 'Architect', filteringOptions);
    const buildingProps = Object.keys(buildings[0]);
    buildingProps.pop();
    const selectPropsInput = createSelectInput(buildingProps, 'Property', sortingOptions);
    // Function that handles the sorting of buildings by country
    const handleSort = () => {
        const selectedProp = selectPropsInput.value;
        const sortedBuildings = [...currentBuildings].sort((a, b) => {
            const valueA = String(a[selectedProp] || '');
            const valueB = String(b[selectedProp] || '');
            return valueA.localeCompare(valueB);
        });
        // Update current state with sorted buildings and rerender cards
        currentBuildings = sortedBuildings;
        return currentBuildings;
    };
    function handleFilter() {
        // Filter
        const selectedCountry = selectCountryInput.value;
        const selectedArchitect = selectArchitectInput.value;
        const filteredBuildings = getFilteredBuildings(buildings, selectedCountry, selectedArchitect);
        if (filteredBuildings.length === 0) {
            createAlertCard();
            return;
        }
        // Update current state
        currentBuildings = filteredBuildings;
        return currentBuildings;
    }
    // Event Listeners
    selectCountryInput.addEventListener('change', () => {
        const filtered = handleFilter();
        if (filtered)
            createBuildingCards(filtered);
    });
    selectArchitectInput.addEventListener('change', () => {
        const filtered = handleFilter();
        if (filtered)
            createBuildingCards(filtered);
    });
    selectPropsInput.addEventListener('change', () => {
        const sorted = handleSort();
        if (sorted)
            createBuildingCards(sorted);
    });
    btnRandomBuilding.addEventListener('click', pickRandomBuilding);
    btnResetGallery.addEventListener('click', resetGallery);
    // Search
    searchInput.addEventListener('keyup', (e) => {
        if (e.target instanceof HTMLInputElement) {
            let currentSearch = e.target.value.toLowerCase();
            const searchBuildings = currentBuildings.filter((building) => building.architect.toLowerCase().includes(currentSearch) ||
                building.title.toLowerCase().includes(currentSearch));
            createBuildingCards(searchBuildings);
        }
    });
    // // Initial Display
    createBuildingCards(shuffleArray(currentBuildings));
});
