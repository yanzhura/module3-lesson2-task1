document.addEventListener('click', (event) => {
    if (event.target.dataset.type === 'remove') {
        const id = event.target.dataset.id;
        remove(id).then(() => {
            event.target.closest('li').remove();
        });
    }
});

const remove = async (id) => {
    await fetch(`/${id}`, {
        method: 'DELETE'
    });
};
