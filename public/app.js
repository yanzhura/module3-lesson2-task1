document.addEventListener('click', (event) => {
    if (event.target.dataset.type === 'remove') {
        const id = event.target.dataset.id;
        remove(id).then(() => {
            event.target.closest('li').remove();
        });
    } else if (event.target.dataset.type === 'edit') {
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
    }
});

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
