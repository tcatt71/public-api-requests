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

  return cardDiv;
}