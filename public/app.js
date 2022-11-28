let savedNotes = [];

document.addEventListener('click', (event) => {
    if (event.target.dataset.type === 'remove') {
        const id = event.target.dataset.id;
        remove(id).then(() => {
            event.target.closest('li').remove();
        });
    } else if (event.target.dataset.type === 'edit') {
        const id = event.target.dataset.id;
        const listItemElement = event.target.closest('li');
        const title = listItemElement.childNodes[0].nodeValue.trim();
        listItemElement.innerHTML = getEditForm(id, title);
        savedNotes.push({ id, title });
    } else if (event.target.dataset.type === 'submit') {
        const id = event.target.dataset.id;
        const listItemElement = event.target.closest('li');
        const inputElement = document.querySelector(`input[data-id="${id}"]`);
        const title = inputElement.value;
        if (title) {
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
        const note = savedNotes.find((item) => item.id === id);
        savedNotes = savedNotes.filter((item) => item.id !== id);
        const listItemElement = event.target.closest('li');
        listItemElement.innerHTML = getNoteElement(note);
    }
});

const getEditForm = (id, title) =>
    `
<input type="text" id="title" data-id="${id}" value="${title}"/>
<div>
    <button class="btn btn-success" data-type="submit" data-id="${id}">Save</button>
    <button class="btn btn-danger" data-type="cancel" data-id="${id}">Cancel</button>
</div>`;

const getNoteElement = ({ id, title }) =>
    `
${title}
<div class="buttons">
    <button class="btn btn-primary" data-type="edit" data-id="${id}">
        Edit
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
