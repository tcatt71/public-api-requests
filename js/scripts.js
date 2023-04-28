createSearchBar();

fetch('https://randomuser.me/api/?results=12&nat=au,ca,gb,us')
  .then(response => response.json())
  .then(data => displayCards(data.results));

/** Creates the search bar. */
function createSearchBar() {
  const searchContainer = document.getElementsByClassName('search-container');

  const form = `
    <form action="#" method="get">
      <input type="search" id="search-input" class="search-input" placeholder="Search...">
      <input type="submit" value="&#x1F50D;" id="search-submit" class="search-submit">
    </form>
  `;

  searchContainer[0].insertAdjacentHTML('afterbegin', form);

  const searchInput = document.getElementById('search-input');

  searchInput.addEventListener('keyup', displaySearchResults);

  /** Displays the results returned by the user's search query. */
  function displaySearchResults() {
    const gallery = document.getElementById('gallery');
    const cards = gallery.getElementsByClassName('card');
    const searchBox = document.getElementById('search-input');
    const searchInput = searchBox.value.toLowerCase();

    for (const card of cards) {
      const name = card.lastElementChild.firstElementChild.textContent.toLowerCase();

      if (name.includes(searchInput)) {
        card.style.display = 'flex';
      } else {
        card.style.display = 'none';
      }
    }
  }
}

/**
 * Displays the employee cards.
 * @param {Array} data - An array containing the employee objects.
 */
function displayCards(data) {
  data.forEach(employee => {
    const gallery = document.getElementById('gallery');
    const cards = gallery.getElementsByClassName('card');
    const cardStr = createCard(employee);

    addCardToGallery(cardStr);

    cards[cards.length - 1].addEventListener('click', () => {
      displayModal(employee, data);
    });
  });
}

/**
 * Adds a card element to the gallery of cards to be displayed.
 * @param {Element} card - The card to be added to the gallery.
 */
function addCardToGallery(card) {
  const gallery = document.getElementById('gallery');

  gallery.insertAdjacentHTML('beforeend', card);
}

/**
 * Creates a card element.
 * @param {Object} employee - Employee object
 * @returns {String} - HTML of the employee card
 */
function createCard(employee) {
  const card = `
    <div class="card">
      <div class="card-img-container">
        <img class="card-img" src="${employee.picture.large}" alt="${employee.name.first} ${employee.name.last}">
      </div>
      <div class="card-info-container">
        <h3 id="name" class="card-name cap">${employee.name.first} ${employee.name.last}</h3>
        <p class="card-text">${employee.email}</p>
        <p class="card-text cap">${employee.location.city}, ${employee.location.state}</p>
      </div>
    </div>
  `;

  return card;
}

/**
 * Creates the modal and inserts it into the DOM.
 * @param {Object} employee - Employee object
 * @param {Array} data - Array of employee objects
 */
function displayModal(employee, data) {
  const body = document.getElementsByTagName('body');

  const modalContainerStr = `
    <div class="modal-container">
      <div class="modal">
        <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
        <div class="modal-info-container">
          <img class="modal-img" src="${employee.picture.large}" alt="${employee.name.first} ${employee.name.last}">
          <h3 id="name" class="modal-name cap">${employee.name.first} ${employee.name.last}</h3>
          <p class="modal-text">${employee.email}</p>
          <p class="modal-text cap">${employee.location.city}</p>
          <hr>
          <p class="modal-text">${employee.cell}</p>
          <p class="modal-text">${employee.location.street.number} ${employee.location.street.name}, ${employee.location.city}, ${employee.location.state}, ${employee.location.postcode}</p>
          <p class="modal-text">Birthday: ${new Date(employee.dob.date).toLocaleDateString()}</p>
        </div>
      </div>
      <div class="modal-btn-container">
        <button type="button" id="modal-prev" class="modal-prev btn">Prev</button>
        <button type="button" id="modal-next" class="modal-next btn">Next</button>
      </div>
    </div>
  `;

  body[0].insertAdjacentHTML('beforeend', modalContainerStr);

  const modalContainer = document.getElementsByClassName('modal-container');
  const modalPrev = document.getElementById('modal-prev');
  const modalNext = document.getElementById('modal-next');

  modalContainer[0].addEventListener('click', removeModal);
  modalPrev.addEventListener('click', displayPreviousEmployee);
  modalNext.addEventListener('click', displayNextEmployee);

  /**
   * Removes the modal when clicking outside the modal or clicking the modal close button.
   * @param {Event} e - Event object
   */
  function removeModal(e) {
    const modalCloseBtn = document.getElementById('modal-close-btn');
    const strongTextElements = document.getElementsByTagName('strong');

    if (e.target === modalContainer[0] || e.target === modalCloseBtn || e.target === strongTextElements[0]) {
      modalContainer[0].remove();
    }
  }

  /** Displays the previous employee of the employees array as a modal. If the current employee displayed is the first element in the array clicking the previous button will display the last emmployee in the array. */
  function displayPreviousEmployee() {
    const firstEmployee = data[0];
    const lastEmployee = data[data.length - 1];
    const previousEmployee = data[data.indexOf(employee) - 1];

    modalContainer[0].remove();

    if (employee === firstEmployee) {
      displayModal(lastEmployee, data)
    } else {
      displayModal(previousEmployee, data);
    }
  }

  /** Displays the next employee of the employees array as a modal. If the current employee displayed is the last element in the array clicking the next button will display the first employee in the array. */
  function displayNextEmployee() {
    const lastEmployee = data[data.length - 1];
    const firstEmployee = data[0];
    const nextEmployee = data[data.indexOf(employee) + 1];

    modalContainer[0].remove();

    if (employee === lastEmployee) {
      displayModal(firstEmployee, data)
    } else {
      displayModal(nextEmployee, data);
    }
  }
}