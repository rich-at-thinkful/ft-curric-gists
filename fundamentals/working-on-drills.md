# Working on Drills
Up until now, you have executed JavaScript entirely within a web browser, being read from a locally saved `index.html` file.

For the next few days of drills, you will create standalone JavaScript files and execute it from the command line.

## Executing JavaScript through NodeJS

### Why?

* Application logic and managing the view layer (i.e. in web development, the browser's DOM) are very **distinct concerns**

* By enforcing you execute logic outside of the browser, this encourages you to think like a developer and be mindful to [separate your concerns](https://en.wikipedia.org/wiki/Separation_of_concerns)

* Help increase your comfort with the command line

### How?

* When starting a new day, create a new project folder on your machine and initialize the git repo.

* Create a new JavaScript file with a related name for the exercise, e.g. `jedi-drill.js`

* Execute the file from the command line by typing:

```bash
$ node jedi-drill.js
-> "My Jedi name is GreRi Londo"
```

In the shell environment, the only output available to you will be via `console` methods, most commonly `console.log()`.

