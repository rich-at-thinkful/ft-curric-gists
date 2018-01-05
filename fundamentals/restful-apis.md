# RESTful APIs

We've practiced fetching and displaying data with a few public APIs. As you've already noticed using Youtube and Github APIs, the endpoints can vary and require reviewing documentation to understand what responses you will get.

A dominant choice in attempts to standardize web APIs came with the architectural pattern known as REST (REpresentational State Transfer). You're going to dig much deeper into REST during the backend part of the course, but for right now, we're going to cover the basics to implement our Shopping List app to use a backend server for storing and retrieving our items.

### CRUD and Resources

A vast majority of applications built require persistent storage of data to be useful. Our Shopping List loses all the items you've added once you close/refresh your tab, for example. Using data in an application can very often be boiled down to four core operations: Create, Read, Update, and Delete, or CRUD. 

Think of the world's most popular web sites and applications. Social media, utility, or blog, every user action is either creating, reading, updating, or deleting data. Write a post, like a tweet, comment on a blog, you're *creating* a new record of that activity. Open your Instagram feed and you're *reading* from many datasets to populate the page. Edit a prior post and you're *updating*, and so on.

When building with REST, we identify our represented resources. In Twitter, this may be a 'tweet', a 'star', a 'user'. Think nouns. Then we create our endpoint hierarchy around the represented resources, mapping each CRUD operation to a standard endpoint structure. For our Shopping List, our main resource is the Item. When we want to interact with the resource, we access the endpoint representing it either as a singular "document" or plural "collection":

```
==============================================================
| HTTP Method | Endpoint      | Description                  | 
|-------------------------------------------------------------
| GET         | /items        | Fetch all items              |
| GET         | /items/[id]   | Fetch one item               |
| POST        | /items        | Create item                  |
| PATCH       | /items/[id]   | Update (modifies) one item   |
| PUT         | /items/[id]   | Updates (replaces) one item  |
| DELETE      | /items/[id]   | Delete one item              |
--------------------------------------------------------------
```

For example if our API lived at `http://api.example.com` and we wanted to fetch all shopping list items, we would run an ajax request against `http://api.example.com/items`.  If we want to fetch the single item with id `judhf69fs028`, we request against `http://api.example.com/items/judhf69fs028`.

### Verbs

Above, we list several [HTTP Methods](https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods). These are part of the web HTTP standards and are there to make the intentions clear of the requester.  Every AJAX request you make uses an HTTP method. Up until now, you've only been using the GET method, which is intended only for requests that READ information (no modifying). Notice that you can access the exact same endpoint (e.g. `/items`) with different HTTP methods and communicate an entirely different request.

### The Request Body

Since we've only used the GET request so far, we haven't needed to cover request bodies. HTTP requests are comprised of a request **header** and a request **body**.  Like an object, HTTP headers just contain a bunch of key-value pairs, but it's here where we send information like the HTTP method and what data type we accept and send (e.g. HTML, JSON, XML, etc.).  When we make requests that create or update data using methods like POST, PUT, and PATCH, we will typically send a **body** with the request that contains our data.  The body can be in many formats, but we're only using JSON in our Shopping List.

### Beyond getJSON

So far, we've used a single jQuery method to make AJAX requests with `getJSON()`. This method is really just a shorthand for the [jQuery .ajax() method](https://api.jquery.com/jquery.ajax/). The `.ajax()` method allows the full flexibility of making requests with other HTTP methods and varying our data types. Check out below how a `getJSON()` call looks compared to its full version in `.ajax()`:

```javascript
// With getJSON()
$.getJSON('http://example.api.com/videos?part=snippet', (data) => {
  console.log(data)
});

// With ajax()
$.ajax({
  url: 'http://example.api.com/videos',
  method: 'GET',
  dataType: 'json',
  data: { part: 'snippet' },
  success: (data) => {
    console.log(data)
  }
});
```

As you can see, there's more code to write with `.ajax()` but you can also customize the request.  Note, the `.ajax()` method accepts an object as its first argument, and this is where we set all our options. 

Let's look at making a POST request, where we're going to send data for the creation of an imaginary new blog:

```javascript
const blogData = JSON.stringify({
  title: "Because I'm Batman",
  author: 'Bruce Wayne',
  content: 'No one will ever guess my secret identity. Haha!'  
});

$.ajax({
  url: 'http://example.api.com/blogs',
  method: 'POST',
  dataType: 'json',
  contentType: 'application/json',
  data: blogData,
  success: (response) => {
    console.log(response);
  } 
}) 
```

First, we build our blob of data to include in our **request body**, and manually convert from an object to JSON string using `JSON.stringify()`. Then we make our AJAX request. We must include `contentType: 'application/json'` (based on [MIME Media Type standards](https://www.ietf.org/rfc/rfc4627.txt) to indicate in our request that we're **sending** JSON data.  The `dataType: 'json'` is only an indicator that we accept receipt of JSON. 

Our `data` key contains the stringified JSON. **IMPORTANT!** Notice that `data` is used differently to our GET request. In the GET request, data is converted into the query string in our request's url. In the POST request, the content in `data` is going into the request body. This may seem strange, but it's a choice made by the jQuery library because GET requests cannot contain request bodies and POST requests often don't use query strings. 

### Friendly neighborhood POSTMAN

Download the [Postman Chrome Extension](https://chrome.google.com/webstore/detail/postman/fhbjgbiflinjbdggehcddcbncdddomop?hl=en). We could get along without it yesterday because you were only making GET requests, which is all you can do when typing urls into your browser's address bar. With Postman, we can send practice requests with all the other HTTP methods.

Open Postman, and try making a GET request to `https://thinkful-list-api.herokuapp.com/ei-student/items`. You should receive a [200 OK response](https://httpstatuses.com/200) and probably an empty array, but if other students today have practiced creating data, you may see some data already.  Now try changing the method to POST in the dropdown in the top-left.  You should receive a [400 Bad Request response](https://httpstatuses.com/400) with a message on why your request wasn't accepted. 

You need to send a request body in JSON format that contains a "name" key and some value.  Click on the "Body" tab, the "raw" radio button, then "application/json" in the dropdown.  In the editor, type in the JSON object below.  (Remember, JSON *requires* that the object key be enclosed in double quotation marks.)

```json
{
  "name": "apples"
}
```

Resending the request should give you a [201 Created response](https://httpstatuses.com/201) and the response body will contain the full shopping list item object, complete with a newly generated unique id.

This walkthrough was to demonstrate the usefulness of an API debugging tool like Postman when you're building requests and examining responses.  A forewarning: It's important to always test an API inside your app first making an AJAX request and not rely entirely on Postman.  Many API servers treat browser requests with special security scrutiny. 

### Exercise

Let's take what we've learned in our practice with APIs and today's reading to convert our Shopping List to use a backend API and persistently store our data. 

Carefully review the docs for our [Thinkful List JSON API](https://thinkful-list-api.herokuapp.com).

#### 1. Create an API module
- Create a new `api.js` file and as before, make an IIFE that is captured by a global `api` variable. 
- In your `index.html`, link in the `api.js` script, making sure to do it before your `index.js`
- Inside the IIFE, make a `createItem` function that receives `name` and `callback` parameters
- Inside `createItem`, let's just send a test string back to the `callback` as if it had received some data: `callback('success!');`
- Return an object from your IIFE, and expose your `createItem` function so it's available in your global `api` object
- Test it!
  - Inside `index.js`, add the following:
  ```
  api.createItem('apples', function(data) {
    console.log(data);
  });
  ```
  - Run your app and look in the console... if you wrote the module correctly, you should see your test message.

#### 2. Write our first AJAX method
- Before we begin, let's make sure we can get a response from the API using an AJAX request.
- Let's declare a `BASE_URL` constant at the top of our API module containing `https://thinkful-list-api.herokuapp.com/[yourname]`. (Replace [yourname] with your own -- our API will keep all items under this name separate from others.) 
- Inside `createItem` make an `.ajax()` call with the following information:
  - 
