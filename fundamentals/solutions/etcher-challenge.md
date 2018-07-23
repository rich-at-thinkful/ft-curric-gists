# Etcher Challenge - Solutions

These are solutons for the [Etcher Challenge](https://github.com/rich-at-thinkful/etcher-challenge)

### Approach 1

The first approach teaches the pitfalls of applying events directly on children elements that may be later removed from the DOM. It requires that when the elements are cleared and redrawn, the event listeners need to be bound again. 

```javascript
// Add Event Listeners here:
function handleHover(e) {
  $(this).addClass('active');
}

function handleClickClear() {
  createAndPlaceRows(8);
}

// When DOM is ready:
$(() => {
  createAndPlaceRows(8);

  // Bind your event listeners here:
  $('.cell').hover(handleHover);

  $('.controls').find('button').click(() => {
    handleClickClear();
    $('.cell').hover(handleHover);
  });
});
```

### Approach 2

This approach utilizes event delegation. Note that this solution requires listening for the 'mousemove' event instead of the 'hover' event, since we can no longer detect an individual hover trigger when listening on the parent grid. It also means when the grid is redrawn, we no longer need to rebind the hover listener.

```javascript
// Add Event Listeners here:
function handleMove(e) {
  $(e.target).addClass('active');
}

function handleClickClear() {
  createAndPlaceRows(8);
}

// When DOM is ready:
$(() => {
  createAndPlaceRows(8);

  // Bind your event listeners here:
  $('.grid').on('mousemove', '.cell', handleMove);

  $('.controls').find('button').click(() => createAndPlaceRows(8));
});
```
