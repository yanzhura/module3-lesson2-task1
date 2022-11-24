let listItemElement = '';
let listItemHTML = '';

document.addEventListener('click', (event) => {
    if (event.target.dataset.type === 'remove') {
        const id = event.target.dataset.id;
        remove(id).then(() => {
            event.target.closest('li').remove();
        });
    } else if (event.target.dataset.type === 'edit') {
        const id = event.target.dataset.id;
        listItemElement = event.target.closest('li');
        listItemHTML = listItemElement.innerHTML;
        listItemElement.innerHTML = getEditForm(id);
    } else if (event.target.dataset.type === 'submit') {
        const id = event.target.dataset.id;
        const el = document.querySelector(`input[data-id="${id}"]`);
    } else if (event.target.dataset.type === 'cancel') {
        listItemElement.innerHTML = listItemHTML;
    }
});

const getEditForm = (id) =>
    `
<input type="text" id="title" data-id="${id}"/>
<div>
    <button class="btn btn-success" data-type="submit" data-id="${id}">Save</button>
    <button class="btn btn-danger" data-type="cancel">Cancel</button>
</div>`;

const remove = async (id) => {
    await fetch(`/${id}`, {
        method: 'DELETE'
    });
};

const update = async (payload) => {
    await fetch(`/${JSON.stringify(payload)}`, {
        method: 'PUT'
    });
};

//! Оставлено для примера
const oldEdit = (params) => {
    const newTitle = prompt('Введите новое название');
    if (newTitle) {
        const newNote = {
            id: event.target.dataset.id,
            title: newTitle
        };
        update(newNote).then(() => {
            const node = event.target.closest('li').childNodes[0];
            node.nodeValue = newTitle;
        });
    }
};
//! Оставлено для примера
