# RESTful APIs

We've practiced fetching and displaying data with a few public APIs. As you've already noticed using Youtube and Github APIs, the endpoints can vary and require reviewing documentation to understand what responses you will get.

A dominant choice in attempts to standardize web APIs came with the architectural pattern known as REST (REpresentational State Transfer). You're going to dig much deeper into REST during the backend part of the course, but for right now, we're going to cover the basics to implement our Shopping List app to use a backend server for storing and retrieving our items.

### CRUD and Resources

A vast majority of applications built require persistent storage of data to be useful. Otherwise, everything performed in the application will be lost when a session ends. Using data in an application can very often be boiled down to four core operations: Create, Read, Update, and Delete, or CRUD. 

Think of the world's most popular web sites and applications. Social media, utility, or blog, every user action is either creating, reading, updating, or deleting data. Write a post, like a tweet, comment on a blog, you're *creating* a new record of that activity. Open your Instagram feed and you're *reading* from many datasets to populate the page. Edit a prior post and you're *updating*, and so on.

One of the core concepts of building with REST, is basing your endpoint hierarchy around the represented resources in your application and using a standard endpoint mapping for each CRUD operation. For our Shopping List, one of our resources is the Item. When we want to interact with the resource, we can access the endpoint representing a "document" or "collection" via these standard methods.

```
==============================================================
| HTTP Verb   | Endpoint      | Description                  | 
|-------------------------------------------------------------
| GET         | /items        | Fetch all items              |
| GET         | /items/[id]   | Fetch one item               |
| POST        | /items        | Create item                  |
| PATCH       | /items/[id]   | Update (modifies) one item   |
| PUT         | /items/[id]   | Updates (replaces) one item  |
| DELETE      | /items/[id]   | Delete one item              |
--------------------------------------------------------------
```

[more to come]

### Exercise
