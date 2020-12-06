const items = document.querySelector('.items');
const input = document.querySelector('.footer__input');
const addButton = document.querySelector('.footer__button');

// add new item to list
function addItem(e) {
    let inputText = input.value;

    if (!inputText) {
        alert('아무 상품도 입력하지 않았어요!')
        input.focus()
        return;
    } else {
        const newItem = createItem(inputText);
        items.appendChild(newItem);
        newItem.scrollIntoView({block: 'center'});
        input.value = '';
        input.focus();
    }
}

// create new Item
let id = 0;
function createItem(text) {
    const itemRow = document.createElement('li');
    itemRow.setAttribute('class', 'item__row');
    itemRow.setAttribute('data-id', id)
    itemRow.innerHTML = `
        <div class="item">
            <span class="item__name">${text}</span>
            <button class="item__delete">
                <i class="far fa-trash-alt fa-lg" data-id=${id}></i>
            </button>
        </div>
        <div class="item__divider"></div>
    `
    id++;
    return itemRow;
} 

addButton.addEventListener('click', addItem)
input.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        addItem();
    }
});

items.addEventListener('click', event => {
    const id = event.target.dataset.id;
    if (id) {
        const deleteTarget = document.querySelector(`.item__row[data-id="${id}"]`);
        deleteTarget.remove();
    }
})