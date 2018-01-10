# Fundamentals Final Project
## Build a Bookmarks App

### Project Overview
Using everything you've learned over the Fundamentals section of the course, you will build an API-powered Bookmarks application that lets the user store and rate their custom web bookmarks.

### User Stories

As a user:
* I can add bookmarks to my bookmark list. Bookmarks contain:
  * title
  * link
  * description
  * rating (1-5)

* I can see a list of my bookmarks when I first open the app
  * All bookmarks in the list default to a "condensed" view showing only title and rating

* I can click on a bookmark to display the "detailed" view
  * Detailed view expands to additionally display description and a "Visit Site" link

* I can remove bookmarks from my bookmark list

* I can edit the rating and description of a bookmark in my list

* I can select from a dropdown a "minimum rating" to filter the list by all bookmarks rated above the chosen selection

### Process

1) Before coding anything, think about your user flow. What does the initial loaded page look like?  What is each action a user can take and the corresponding DOM event?

2) Draw up [gray box wireframes](http://bradfrost.com/blog/post/html-wireframes/) using [MockFlow](http://mockflow.com), a free wireframing tool of your choice, or on a napkin!

3) For every wireframed application state, include a populated `store` object as an example next to it

4) Set up your project.  Create your Git repo, build your boilerplate file structure, connect jQuery and confirm your linked JavaScript/CSS files are being read by your HTML.

5) Build an HTML version of all the different states of your application. Use multiple HTML files if you wish - these will be deleted later, but useful for establishing the HTML strings your template generator functions will need to build.

6) Review the [API Documention](https://thinkful-list-api.herokuapp.com/endpoints/bookmarks). Perform some test requests with [Postman](https://chrome.google.com/webstore/detail/postman/fhbjgbiflinjbdggehcddcbncdddomop?hl=en). 

7) Construct your modules and **test every new function** as you build it.

### Technical Requirements

* Use jQuery for AJAX and DOM manipulation

* Use namespacing to adhere to good architecture practices
  * Minimal global variables!
  * Logically group your functions

* Use semantic HTML

* Use [responsive design](https://courses.thinkful.com/web-dev-001v1/lesson/1.6)

* Follow a11y best practices
  * Refer back to the lessons on [accessibility](https://courses.thinkful.com/web-dev-001v1/assignment/1.2.5), [forms](https://courses.thinkful.com/web-dev-001v1/assignment/1.5.1), and [AJAX and Aria Live](https://courses.thinkful.com/web-dev-002v1/assignment/1.2.3) for help
