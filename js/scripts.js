fetch('https://randomuser.me/api/?results=12')
  .then(response => response.json())
  .then(data => displayCards(data.results));

function displayCards(data) {
  data.forEach(employee => {
    const card = createCard(employee);
    addCardToGallery(card);
  });
}

function addCardToGallery(card) {
  const gallery = document.getElementById('gallery');

  gallery.insertAdjacentElement('beforeend', card);
}

function createCard(employee) {
  const cardDiv = document.createElement('DIV');
  const cardImageDiv = document.createElement('DIV');
  const img = document.createElement('IMG');
  const cardInfoDiv = document.createElement('DIV');
  const nameH3 = document.createElement('H3');
  const emailP = document.createElement('P');
  const locationP = document.createElement('P');

  cardDiv.className = 'card';
  cardImageDiv.className = 'card-img-container';
  img.className = 'card-img';
  img.src = employee.picture.large;
  img.alt = `${employee.name.first} ${employee.name.last}`;
  cardInfoDiv.className = 'card-info-container';
  nameH3.id = 'name';
  nameH3.className = 'card-name cap';
  nameH3.textContent = `${employee.name.first} ${employee.name.last}`;
  emailP.className = 'card-text';
  emailP.textContent = employee.email;
  locationP.className = 'card-text cap';
  locationP.textContent = `${employee.location.city}, ${employee.location.state}`;

  cardDiv.insertAdjacentElement('afterbegin', cardImageDiv);
  cardDiv.insertAdjacentElement('beforeend', cardInfoDiv);
  cardImageDiv.insertAdjacentElement('afterbegin', img);
  cardInfoDiv.insertAdjacentElement('afterbegin', nameH3);
  cardInfoDiv.insertAdjacentElement('beforeend', emailP);
  cardInfoDiv.insertAdjacentElement('beforeend', locationP);

  cardDiv.addEventListener('click', e => displayModal(e, employee));

  return cardDiv;
}

function displayModal(e, employee) {
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

  modalContainer.className = 'modal-container';

  modal.className = 'modal';

  modalCloseBtn.type = 'button';
  modalCloseBtn.id = 'modal-close-btn';
  modalCloseBtn.className = 'modal-close-btn';

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

  modalContainer.append(modal);
  modal.append(modalCloseBtn, modalInfoContainer);
  modalCloseBtn.append(strongTextElement);
  modalInfoContainer.append(img, name, email, city, horizontalLine, cell, address, birthday);

  const body = document.getElementsByTagName('body');
  body[0].insertAdjacentElement('beforeend',modalContainer );

  modalContainer.addEventListener('click', (e) => {
    if (e.target === modalContainer || e.target === modalCloseBtn || e.target === strongTextElement) {
      modalContainer.hidden = true;
    }
  });
}