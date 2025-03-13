// return a shuffle array based on an input array
export const shuffleArray = (array) => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const random = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[random]] = [shuffled[random], shuffled[i]];
  }
  return shuffled;
};

// filter buildings based on properties country and architect
export const getFilteredBuildings = (buildings, country, architect) => {
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
export const getRandomIndex = (array) =>
  Math.floor(Math.random() * array.length);
