# First AJAX Project with Modules

Here's a rundown of the modules you'll want to put together for the Youtube Thinkful project:

- Store
  - Exposes a `videos` array
  - Exposes a `setVideos` function that simply receives videos and sets it to `this.videos`
- Api
  - Declare a `BASE_URL` constant
  - Expose an asyncronous `fetchVideos` function, which receives a `searchTerm` and `callback`
    - The function will retrieve Youtube data, filter out only the content it needs (video title, image and link), and send that array back in the callback
- VideoList
  - Declare a `generateListItem` function that builds out an HTML string comprised of one video item
  - Expose a `render` function that will look in `store.videos`, invoke `generateListItem` for every video, and put the results into the DOM
  - Declare a `handleFormSubmit` function which:
    1. Listens for form submit event
    2. Retrieves the search term input from DOM
    3. Calls the api module's method to make a request
    4. Inside the callback, send the received `videos` into your `store`'s method
    5. Call `render()` 
  - Expose a `bindEventListeners` function, which invokes your only event listener function
- Your `index.js` should be nothing more than a DOM Ready function which invokes event listener binding function on your `videoList`
