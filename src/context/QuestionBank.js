export const getCountries = async () => {
  const API_URL = "https://restcountries.com/v3.1/all";
  const data = await fetch(API_URL);
  const countries = await data.json();

  const countriesList = countries.map((country) => {
    const capital = country.capital ? country.capital[0] : "none";
    return {
      name: country.name.common,
      capital: capital,
      flag: country.flag,
    };
  });

  const questionList = getQuestions(countriesList);

  return questionList;
};

const getQuestions = (countriesList) => {
  const questionList = [];

  countriesList.map((it, index) => {
    let question = "";
    let flag = "";
    if (index % 2 === 0) {
      // CAPITAL QUESTION
      question = `${it.capital} is the capital of`;
    } else {
      // FLAG QUESTION
      flag = it.flag;
      question = `Which country does this flag belong to ?`;
    }
    // FILTER THE LIST - TAKE AWAY THE COUNTRY TARGET
    const countriesFiltered = countriesList.filter(
      (itSecond) => itSecond.name !== it.name
    );

    // SET UP 3 RANDOM COUNTRY NAME + GET THE GOOD ANSWER
    const country1 =
      countriesFiltered[getRandomNumber(countriesFiltered.length)].name;
    const country2 =
      countriesFiltered[getRandomNumber(countriesFiltered.length)].name;
    const country3 =
      countriesFiltered[getRandomNumber(countriesFiltered.length)].name;
    const answer = it.name;

    // PUT ALL THE ANSWERS IN ONE ARRAY
    let answerList = [country1, country2, country3, answer];

    // SET UP THE OPTIONS - FILTER THE ARRAY AND TAKE AWAY THE ANSWER USED
    let random = getRandomNumber(answerList.length);
    const optionA = answerList[random];
    answerList.splice(random, 1);

    random = getRandomNumber(answerList.length);
    const optionB = answerList[random];
    answerList.splice(random, 1);

    random = getRandomNumber(answerList.length);
    const optionC = answerList[random];
    answerList.splice(random, 1);

    random = getRandomNumber(answerList.length);
    const optionD = answerList[random];
    answerList.splice(random, 1);

    // ADD TO QUESTION LIST
    questionList.push({
      flag: flag,
      question: question,
      optionA: optionA,
      optionB: optionB,
      optionC: optionC,
      optionD: optionD,
      answer: answer,
    });

    return questionList;
  });

  return questionList;
};

const getRandomNumber = (length) => {
  const random = Math.floor(Math.random() * length);
  return random;
};
