const ONE_HANGED_PERCENT = 100;
const MAX_STAR_QUANTITY = 5;

const convertRatingToPercent = (rating) => {
  const integer = Math.round(rating);
  return integer * ONE_HANGED_PERCENT / MAX_STAR_QUANTITY + `%`;
};

const getRandomNumber = (min, max) => Math.floor(Math.random() * (max - min) + min);

const generateRandomArray = (array) => {
  const mixedArray = [...array].sort(() => Math.random() - 0.5);
  const randomArray = [];
  const randomNumber = getRandomNumber(1, mixedArray.length);
  for (let i = 0; i < randomNumber; i++) {
    const element = mixedArray[i];
    randomArray.push(element);
  }
  return randomArray;
};

export {convertRatingToPercent, getRandomNumber, generateRandomArray};