export function deleteCard(select, select2) {
    const btnEdit = document.createElement('button');
    btnEdit.classList.add('btn-edit');

    const btnImg = document.createElement('img');
    btnImg.setAttribute('src', 'images/icon-delete.png');
    btnImg.classList.add('btn-img');

    btnEdit.addEventListener('click', () => {
        const dataGet = select.getAttribute('data');

        if (dataGet) {
            fetch(`https://ajax.test-danit.com/api/v2/cards/${dataGet}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
            })
                .then(response => {
                    if (!response.ok) {
                        console.error('Failed to delete card:', response.status, response.statusText);
                    }
                })
                .catch(error => console.error('Error deleting card:', error));
            select.remove();
        } else {
            console.error('Data attribute is undefined.');
        }
    });

    btnEdit.appendChild(btnImg);
    select2.append(btnEdit);
}

