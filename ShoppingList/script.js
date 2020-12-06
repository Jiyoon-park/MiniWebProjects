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

function createItem(text) {
    const itemRow = document.createElement('li');
    itemRow.setAttribute('class', 'item__row');

    const item = document.createElement('div');
    item.setAttribute('class', 'item');
    
    const itemName = document.createElement('span');
    itemName.textContent = text

    const deleteBtn = document.createElement('button');
    deleteBtn.setAttribute('class', 'item__delete');
    deleteBtn.innerHTML = '<i class="far fa-trash-alt fa-lg"></i>'
    deleteBtn.addEventListener('click', () => {
        items.removeChild(itemRow)
    })

    const divider = document.createElement('div');
    divider.setAttribute('class', 'item__divider');

    item.appendChild(itemName);
    item.appendChild(deleteBtn);
    itemRow.appendChild(item);
    itemRow.appendChild(divider);

    return itemRow;
} 

addButton.addEventListener('click', addItem)
input.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        addItem();
    }
});