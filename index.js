$container = document.querySelector('.container');
$deleteBtn = document.querySelector('.btn-danger');
const HIDDEN_CLASS = 'hidden';
username = 'arsexan';

const generateAllMice = (mouse) => {
    return (
      `<div data-card_id=${mouse.id} class="card mx-2" style="width: 18rem">
          <img
            src="${mouse.image}"
            class="card-img-top"
            alt="Mouse pic"
          />
          <div class="card-body">
            <h5 class="card-title">${mouse.name}</h5>
            <p class="card-text">${mouse.description}</p>
            <button type="button" data-action="open" class="btn-primary">Open</button>
            <button type="button" data-action="edit" class="btn-warning">Edit</button>
            <button type="button" data-action="delete" class="btn-danger">Delete</button>
          </div>
        </div>
        `)
  }

fetch(`https://cats.petiteweb.dev/api/single/${username}/show`)
.then(res => {
    return res.json()
})
.then(allMice => {
    allMice.forEach(mouse => {
        $container.insertAdjacentHTML('afterbegin', generateAllMice(mouse))
    });
})

/* $deleteBtn.click = await fetch('https://cats.petiteweb.dev/api/single/arsexan/delete/', {
    method: 'DELETE'
  })
  */

// $deleteBtn.addEventListener('click', api.deleteCat) /// Повесить листенер на кнопку delete, чтобы удалял текущую карточку

/*
$container.addEventListener('click', async (event) => {
  const action = event.target.dataset.action;

  switch (action) {
    case 'delete': 
    const $currentCard = event.target.closest('[data-card_id]');
    const mouseId = $currentCard.dataset.card_id;
    try {
      const res = await api.deleteCat(catId)
    }
  }
})
*/


/*
function deleteMouse(mouse) {
  const thisMouse = mouse.target.closest('[data-card_id]');
  const mouseId = thisMouse.dataset.card_id;
  fetch(`https://cats.petiteweb.dev/api/single/${username}/delete/${mouseId}`)
}

$deleteBtn.addEventListener('click', deleteMouse);  // функция для удаления карточки по кнопке delete
*/

$container.addEventListener('click', async (event) => {
  const action = event.target.dataset.action;

  switch (action) {
    case 'delete':
      const $currentCard = event.target.closest('[data-card_id]');
      const catId = $currentCard.dataset.card_id;
      try {
        const res = await api.deleteCat(catId);
        const responce = await res.json();
        if (!res.ok) throw Error(responce.message)
        $currentCard.remove()
      } catch (error) {
        console.log(error);
      }
      break;
}
})