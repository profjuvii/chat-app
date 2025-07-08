import { pseudoNewContactsFetch } from './pseudo.js';
import { createUsernameBlock } from './allContactsMode.js';

export function renderNewContactsMode() {
    const contactList = document.getElementById('contact-list');
    const hiddenElement = document.getElementById('cont-hidden-text');
    
    // Load user contacts and apply manual text overflow handling
    const newContacts = pseudoNewContactsFetch();
    if (!newContacts) return;

    const renderNewContacts = () => {
        contactList.innerHTML = '';
        newContacts.forEach(contact => loadNewUserContact(contactList, hiddenElement, contact));
    }

    // Event handler for buttons action
    contactList.addEventListener('click', (e) => {
        e.preventDefault();

        // * Pseudo code *
        const btn = e.target.closest('button');
        if (btn) {
            btn.closest('.new-contact').remove();
        }
    });
    
    renderNewContacts();
}

function loadNewUserContact(contactList, hiddenElement, contact) {
    const styles = {
        username: {
            fontSize: '16px',
            fontWeight: 700,
            right: '65px'
        }
    };

    const { user_id, username } = contact;

    // Parent div block
    const div = document.createElement('div');
    div.classList.add('new-contact');
    div.id = user_id;

    // Create username block
    const h4 = createUsernameBlock(hiddenElement, username, null, styles.username);
    div.appendChild(h4);

    // Create button container
    const btnContainer = document.createElement('div');
    btnContainer.classList.add('new-cont-btns');

    // Reject button
    const rejectBtn = document.createElement('button');
    rejectBtn.classList.add('reject-btn');
    const rejectIcon = document.createElement('i');
    rejectIcon.classList.add('fa-solid', 'fa-xmark');
    rejectBtn.appendChild(rejectIcon);

    // Accept button
    const acceptBtn = document.createElement('button');
    acceptBtn.classList.add('accept-btn');
    const acceptIcon = document.createElement('i');
    acceptIcon.classList.add('fa-solid', 'fa-check');
    acceptBtn.appendChild(acceptIcon);

    // Append buttons to container
    btnContainer.appendChild(rejectBtn);
    btnContainer.appendChild(acceptBtn);

    // Append button container to main div
    div.appendChild(btnContainer);

    // Append entire contact to the contact list
    contactList.appendChild(div);
}