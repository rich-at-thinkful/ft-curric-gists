## Practice with Promises

We're going to use the Promise-supported HTTP request library [Axios](https://github.com/axios/axios) and the [Star Wars API](https://swapi.co) to practice async requests with Promises. We're making a small Node application in a single file for this exercise.

The objective is to be able to call the command below from the command line and get back the results in the example format. All items in `[brackets]` are DYNAMIC content and will need to be customized based on the API response.

#### Success Output (character found):
```
$ node starwars.js "jar jar"

[JAR JAR BINKS] has been found!
[He] has starred in the following films:

1. Star Wars: The Phantom Menace
2. Star Wars: Attack of the Clones
[INSTRUCTION: list should be sorted in order of release]

[He] has also been associated with a total of [#] vehicles and [#] starships.
```

#### Failure Output (character not found):
```
$ node starwars.js "darth foobar"

[DARTH FOOBAR] is not an entity we're looking for. Move along.
```

### Instructions

When retrieving this information, you must use serial AND parallel requests:

1) Initialize a new project folder with NPM and install the [Axios](https://github.com/axios/axios) library.  

2) We need to get the search term from the command line option passed in. Node lets us do this with the global `process` object's [`argv` property](https://nodejs.org/api/process.html#process_process_argv). This is an array, where the first two elements are reserved by Node, but the remaining are any additional options from the command line. Hence the following will get you the term you need:

```
const searchTerm = process.argv[2];
```

3) First, use the search parameter on the `/people` endpoint to find the searched character

4) In the resolved promise, utilize the `films` array of URLs to make a **parallel** set of requests (using `Promise.all`) for each film `title` and compile the data to use in your print out. 

5) You will need a count on the vehicles and spaceships, but do you need to make an additional API call for that information? 
