## Jedi name
```js
function jediName(firstName, lastName) {
  return `${lastName.slice(0, 3) ${firstName.slice(0, 2)}}`;
}
```

## To infinity...

```js
function beyond(num) {
  if (num === Infinity || num === -Infinity) {
    console.log('And beyond');
  } else if (num === 0) {
    console.log('Staying home');
  } else if (num > 0) {
    console.log('To infinity');
  } else {
    console.log('To negative infinity');
  }
}
```

## Cracking the code

Here is the function that decodes a single word (per the challenge). You would then call `decode` multiple times and concatenate the results to print out the final string.

```js
function decode(word) {
  switch(word[0]) {
    case 'a':
      return word[1];
    case 'b':
      return word[2];
    case 'c':
      return word[3];
    case 'd':
      return word[4];
    default:
      return ' ';
  }
}
```

This solution to automate decoding all the words requires we iterate through each letter -- we cover loops/arrays in tomorrow's lessons but here's one solution to review.

```js
function decodeWords(words) {
  return words
    .split(' ')
    .map(word => decode(word))
    .join('');
}
```

## Days in a month

```js
function daysOfMonth(month, leapYear) {
  let numOfDays;

  switch(month) {
    case 'January':
    case 'March':
    case 'May':
    case 'July':
    case 'August':
    case 'October':
    case 'December':
      numOfDays = 31;
      break;

    case 'September':
    case 'April':
    case 'June':
    case 'November':
      numOfDays = 30;
      break;
    
    case 'February':
      numOfDays = leapYear ? 29 : 28;
      break;

    default:
      throw new Error('Must provide a valid month.');
  }

  return `${month} has ${numOfDays} days.`;
}
```

## Rock Paper Scissors

The challenge is for your function to simply declare the winner, but this solution provides "prettier" feedback.

```js
function playRPS(playerGuess) {
  
  // Helper function to return the word that matches the numeric guess. It also does 
  // necessary input validation, throwing an error if input is invalid.
  function numToWord(num) {
    switch(num) {
      case 1:
        return 'rock';
      case 2:
        return 'scissors';
      case 3:
        return 'paper';
      default:
        throw new Error('Must pick number between 1-3');
    }
  }

  // Get the random AI guess
  const aiGuess = Math.floor(Math.random() * 3) + 1;

  // Create some variables to hold the word format of the numeric guess
  const playerWord = numToWord(playerGuess);
  const aiWord = numToWord(aiGuess);

  // Check for tie first
  if (playerGuess === aiGuess) {
    return `It's a tie! Both players guessed ${playerWord}.`;

  // Check the three win cases for Player
  } else if (
    (playerGuess === 1 && aiGuess === 2) ||
    (playerGuess === 2 && aiGuess === 3) ||
    (playerGuess === 3 && aiGuess === 1)
  ) {
    return `Player wins! Player had ${playerWord} against ${aiWord}`;

  // Otherwise, AI wins
  } else {
    return `AI wins! AI had ${aiWord} against ${playerWord}.`;
  }
}
```
