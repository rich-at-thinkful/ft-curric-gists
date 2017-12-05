### IMPORTANT: Do NOT complete drills inside the Repl.IT or JSBin examples. All drills should be completed per the [Working on Drills requirements](https://github.com/rich-at-thinkful/ft-curric-gists/blob/master/fundamentals/working-on-drills.md) in your local environment

# String, number, and logic drills

## Jedi name

Write a function called `jediName` which takes two arguments:

- `firstName` - a person's first name
- `lastName` - a person's last name

The function should return the person's Jedi name.  A Jedi name is formed from the first three letters of the last name, and the first two letters of the first name.  For example, `jediName('Beyonce', 'Knowles')` should return `'KnoBe'`.

## To infinity...

Write a function called `beyond` which takes a single argument, `num` and logs a different message depending on its value.

* If `num` is infinite (either positive or negative) it should log out 'And beyond'.
* If `num` is finite and positive it should log out 'To infinity'.
* If `num` is finite and negative it should log out 'To negative infinity'.
* If `num` is zero it should log out 'Staying home'.

## Cracking the code

A code has been invented which replaces each character in a sentence with a five letter word.  The first letter of each encoded word determines which of the remaining four characters contains the decoded character according to this table:

| First letter | Character number |
|--------------|------------------|
| a            | 2                |
| b            | 3                |
| c            | 4                |
| d            | 5                |

So for example, the encoded word 'cycle' would be decoded to the character 'l'.  This is because the first letter is a 'c', so you look for the fourth character, which is 'l'.

If the first letter of the encoded word isn't 'a', 'b', 'c', or 'd' (for example 'mouse') this should be decoded to a space.

Write a function called `decode` which takes an encoded word as an argument, and returns the correct decoded character.

Use your function to decode the following message: 'craft block argon meter bells brown croon droop'.

## How many days in a month

Write a function that takes the name of a month as an argument and use a switch statement to log out how many days there are in that month. For example if the argument provided is `'January'`, the function should display `"January has 31 days"`. 

## Rock Paper Scissors
In the game Rock Paper Scissors, two players simultaneously choose one of the three options: rock, paper, or scissors. If both players choose the same option, the result is a tie. Otherwise the winner is determined as follows:

- Rock beats scissors
- Scissors beats paper
- Paper beats rock

Create a game in which you are playing against the computer. The computer randomly chooses rock, paper, or scissors. Your function should take a number as an argument of `1`, `2`, or `3` to represent rock, paper, or scissors, respectively, and determine the winner. The code to generate a random number between 1 and 3 is - 
```js 
const randomNo = Math.floor(Math.random() * 3);
```
