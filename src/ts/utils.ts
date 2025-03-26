import { Building } from './data';

export const shuffleArray = <T>(array: T[]): T[] => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const random = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[random]] = [shuffled[random], shuffled[i]];
  }
  return shuffled;
};

export const getFilteredBuildings = (
  buildings: Building[],
  country: string,
  architect: string
): Building[] => {
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
