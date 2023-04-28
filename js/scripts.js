createSearchBar();

fetch('https://randomuser.me/api/?results=12&nat=au,ca,gb,us')
  .then(response => response.json())
  .then(data => displayCards(data.results));

/** Creates the search bar. */
function createSearchBar() {
  const searchContainer = document.getElementsByClassName('search-container');

  const form = document.createElement('FORM');
  const searchInput = document.createElement('INPUT');
  const submitButton = document.createElement('INPUT');

  form.action = '#';
  form.method = 'get';
  searchInput.type = 'search';
  searchInput.id = 'search-input';
  searchInput.className = 'search-input';
  searchInput.placeholder = 'Search...';
  submitButton.type = 'submit';
  submitButton.value = new DOMParser().parseFromString('&#x1F50D;', 'text/html').documentElement.textContent;
  submitButton.id = 'search-submit';
  submitButton.className = 'search-submit';

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

  searchContainer[0].append(form);
  form.append(searchInput, submitButton);
}

/**
 * Displays the employee cards.
 * @param {Array} data - An array containing the employee objects.
 */
function displayCards(data) {
  data.forEach(employee => {
    const card = createCard(employee);
    card.addEventListener('click', () => {
      displayModal(employee, data);
    });
    addCardToGallery(card);
  });
}

/**
 * Adds a card element to the gallery of cards to be displayed.
 * @param {Element} card - The card to be added to the gallery.
 */
function addCardToGallery(card) {
  const gallery = document.getElementById('gallery');

  gallery.insertAdjacentElement('beforeend', card);
}

/**
 * Creates a card element.
 * @param {Object} employee - Employee object
 * @returns {Element} - Employee card
 */
function createCard(employee) {
  const card = document.createElement('DIV');
  const cardImgContainer = document.createElement('DIV');
  const cardImg = document.createElement('IMG');
  const cardInfoContainer = document.createElement('DIV');
  const name = document.createElement('H3');
  const email = document.createElement('P');
  const location = document.createElement('P');

  card.className = 'card';
  cardImgContainer.className = 'card-img-container';
  cardImg.className = 'card-img';
  cardImg.src = employee.picture.large;
  cardImg.alt = `${employee.name.first} ${employee.name.last}`;
  cardInfoContainer.className = 'card-info-container';
  name.id = 'name';
  name.className = 'card-name cap';
  name.textContent = `${employee.name.first} ${employee.name.last}`;
  email.className = 'card-text';
  email.textContent = employee.email;
  location.className = 'card-text cap';
  location.textContent = `${employee.location.city}, ${employee.location.state}`;

  card.append(cardImgContainer, cardInfoContainer);
  cardImgContainer.append(cardImg);
  cardInfoContainer.append(name, email, location);

  return card;
}

/**
 * Creates the modal and inserts it into the DOM.
 * @param {Object} employee - Employee object
 * @param {Array} data - Array of employee objects
 */
function displayModal(employee, data) {
  const gallery = document.getElementById('gallery');

  const modalContainer = document.createElement('DIV');
  const modal = document.createElement('DIV');
  const modalCloseBtn = document.createElement('BUTTON');
  const strongTextElement = document.createElement('STRONG');
  const modalInfoContainer = document.createElement('DIV');
  const img = document.createElement('IMG');
  const name = document.createElement('H3');
  const email = document.createElement('P');
  const city = document.createElement('P');
  const horizontalLine = document.createElement('HR');
  const cell = document.createElement('P');
  const address = document.createElement('P');
  const birthday = document.createElement('P');
  const modalBtnContainer = document.createElement('DIV');
  const modalPrev = document.createElement('BUTTON');
  const modalNext = document.createElement('BUTTON');

  modalContainer.className = 'modal-container';
  modal.className = 'modal';
  modalCloseBtn.type = 'button';
  modalCloseBtn.id = 'modal-close-btn';
  modalCloseBtn.className = 'modal-close-btn btn';
  strongTextElement.textContent = 'X';
  modalInfoContainer.className = 'modal-info-container';
  img.className = 'modal-img';
  img.src = employee.picture.large;
  img.alt = `${employee.name.first} ${employee.name.last}`;
  name.id = 'name';
  name.className = 'modal-name cap';
  name.textContent = `${employee.name.first} ${employee.name.last}`;
  email.className = 'modal-text';
  email.textContent = employee.email;
  city.className = 'modal-text cap';
  city.textContent = employee.location.city;
  cell.className = 'modal-text';
  cell.textContent = employee.cell;
  address.className = 'modal-text';
  address.textContent = `${employee.location.street.number} ${employee.location.street.name}, ${employee.location.city}, ${employee.location.state}, ${employee.location.postcode}`;
  birthday.className = 'modal-text';
  birthday.textContent = `Birthday: ${new Date(employee.dob.date).toLocaleDateString()}`;
  modalBtnContainer.className = 'modal-btn-container';
  modalPrev.type = 'button';
  modalPrev.id = 'modal-prev';
  modalPrev.className = 'modal-prev btn';
  modalPrev.textContent = 'Prev';
  modalNext.type = 'button';
  modalNext.id = 'modal-next';
  modalNext.className = 'modal-next btn';
  modalNext.textContent = 'Next';

  modalContainer.addEventListener('click', removeModal);
  modalPrev.addEventListener('click', displayPreviousEmployee);
  modalNext.addEventListener('click', displayNextEmployee);
  
  /**
   * Removes the modal when clicking outside the modal or clicking the modal close button.
   * @param {Event} e - Event object
   */
  function removeModal(e) {
    if (e.target === modalContainer || e.target === modalCloseBtn || e.target === strongTextElement) {
      modalContainer.remove();
    }
  }

  /** Displays the previous employee of the employees array as a modal. If the current employee displayed is the first element in the array clicking the previous button will display the last emmployee in the array. */
  function displayPreviousEmployee() {
    modalContainer.remove();
    if (employee === data[0]) {
      displayModal(data[data.length - 1], data)
    } else {
      displayModal(data[data.indexOf(employee) - 1], data);
    }
  }

  /** Displays the next employee of the employees array as a modal. If the current employee displayed is the last element in the array clicking the next button will display the first employee in the array. */
  function displayNextEmployee() {
    modalContainer.remove();
    if (employee === data[data.length - 1]) {
      displayModal(data[0], data)
    } else {
      displayModal(data[data.indexOf(employee) + 1], data);
    }
  }

  gallery.after(modalContainer);
  modalContainer.append(modal, modalBtnContainer);
  modal.append(modalCloseBtn, modalInfoContainer);
  modalCloseBtn.append(strongTextElement);
  modalInfoContainer.append(img, name, email, city, horizontalLine, cell, address, birthday);
  modalBtnContainer.append(modalPrev, modalNext);
}