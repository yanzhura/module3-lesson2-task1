const savedNotes = [];

document.addEventListener('click', (event) => {
    if (event.target.dataset.type === 'remove') {
        const id = event.target.dataset.id;
        remove(id).then(() => {
            event.target.closest('li').remove();
        });
    } else if (event.target.dataset.type === 'edit') {
        const id = event.target.dataset.id;
        listItemElement = event.target.closest('li');
        const listItemNode = listItemElement.childNodes[0];
        console.log('listItemNode', listItemNode.innerText);
        listItemElement.innerHTML = getEditForm(id);
    } else if (event.target.dataset.type === 'submit') {
        const id = event.target.dataset.id;
        listItemElement = event.target.closest('li');
        const inputElement = document.querySelector(`input[data-id="${id}"]`);
        const title = inputElement.value;
        if (newTitle) {
            const newNote = {
                id,
                title
            };
            update(newNote).then(() => {
                listItemElement.innerHTML = getNoteElement(newNote);
            });
        }
    } else if (event.target.dataset.type === 'cancel') {
        const id = event.target.dataset.id;
        console.log('id :>> ', id);
    }
});

const getEditForm = (id) =>
    `
<input type="text" id="title" data-id="${id}"/>
<div>
    <button class="btn btn-success" data-type="submit" data-id="${id}">Save</button>
    <button class="btn btn-danger" data-type="cancel" data-id="${id}">Cancel</button>
</div>`;

const getNoteElement = ({ id, title }) =>
    `
${title}
<div class="buttons">
    <button class="btn btn-primary" data-type="edit" data-id="${id}">
        Update
    </button>
    <button class="btn btn-danger" data-type="remove" data-id="${id}">
        &times;
    </button>
</div>
`;

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
