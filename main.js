function onlyLetters(str) {
  return /^[a-zA-Z]+$/.test(str);
}

function parseWord(word) {
  if (!onlyLetters(word))
    throw new Error(`Format error: the word must contains only letters`);
}

function getDecomposition(vowels, consonants, word) {
  const vowelsLetter = "AEIOU";

  for (let i = 0; i < word.length; i++) {
    if (vowelsLetter.includes(word[i])) {
      if (!vowels.decomposition[word[i]]) vowels.decomposition[word[i]] = 1;
      else vowels.decomposition[word[i]]++;
    } else {
      if (!consonants.decomposition[word[i]])
        consonants.decomposition[word[i]] = 1;
      else consonants.decomposition[word[i]]++;
    }
  }
}

function getMostPresentLetter(obj) {
  Object.entries(obj.decomposition).forEach(([vowel, occurence]) => {
    if (occurence > obj.mostPresentLetter.occurence) {
      obj.numberOfLetterToChange += obj.mostPresentLetter.occurence;
      obj.mostPresentLetter.occurence = occurence;
      obj.mostPresentLetter.letter = vowel;
    } else {
      obj.numberOfLetterToChange += occurence;
    }
  });
}

function getTotalMovment(objA, objB) {
  objA.totalMovment =
    objA.numberOfLetterToChange * 2 +
    objB.numberOfLetterToChange +
    objB.mostPresentLetter.occurence;
}

function solver(word) {
  word = word.toUpperCase();
  parseWord(word);
  if (word.length === 1) return `${word}:0s`;
  let vowels = {
    decomposition: {},
    mostPresentLetter: {
      occurence: 0,
      letter: "A",
    },
    numberOfLetterToChange: 0,
    totalMovment: 0,
  };
  let consonants = {
    decomposition: {},
    mostPresentLetter: {
      occurence: 0,
      letter: "B",
    },
    numberOfLetterToChange: 0,
    totalMovment: 0,
  };

  getDecomposition(vowels, consonants, word);
  getMostPresentLetter(vowels);
  getMostPresentLetter(consonants);
  getTotalMovment(vowels, consonants);
  getTotalMovment(consonants, vowels);

  const finalLetter =
    consonants.totalMovment > vowels.totalMovment
      ? vowels.mostPresentLetter.letter
      : consonants.mostPresentLetter.letter;

  const finalWord = finalLetter.repeat(word.length);

  return `${finalWord}:${
    consonants.totalMovment > vowels.totalMovment
      ? vowels.totalMovment
      : consonants.totalMovment
  }s`;
}

function main() {
  try {
    const myArgs = process.argv.slice(2);
    if (myArgs.length != 1)
      throw new Error(`Format error: one argument is required`);
    const response = solver(myArgs[0]);
    console.log(response);
    return;
  } catch (err) {
    return console.error(err.message);
  }
}
if (require.main === module) {
  main();
}

module.exports = { solver };
