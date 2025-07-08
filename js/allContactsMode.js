import { pseudoAllContactsFetch } from './pseudo.js'; 
import { hideSidebarWindow } from './sidebar.js'
import { renderActiveChat, showChatWindow } from './chat.js';
import { prepareText } from './utils.js';

export function renderAllContactsMode() {
    const contactList = document.getElementById('contact-list');
    const hiddenElement = document.getElementById('cont-hidden-text');

    // Load user contacts and apply manual text overflow handling
    const allContacts = pseudoAllContactsFetch();

    const renderAllContacts = () => {
        contactList.innerHTML = '';
        allContacts.forEach(contact => loadUserContact(contactList, hiddenElement, contact));
    }
    
    renderAllContacts();

    // Event handler for activation active chat
    contactList.addEventListener('click', (e) => {
        e.preventDefault();
        const contact = e.target.closest('.contact');

        if (contact && !contact.classList.contains('active')) {
            unselectChat();

            // For mobile version
            if (window.innerWidth <= 640) {
                hideSidebarWindow();
                showChatWindow();
            } else {
                contact.classList.add('active');
            }

            const contactId = Number(contact.id);
            window.activeContactId = contactId;

            renderActiveChat(contactId);
        }
    });
}

export function unselectChat() {
    const contactList = document.getElementById('contact-list');
    contactList.querySelector('.active')?.classList.remove('active');
}

export function createUsernameBlock(hiddenElement, username, online, styles) {
    // Username
    username = prepareText(hiddenElement, username, styles);
    const h4 = document.createElement('h4');
    h4.textContent = username;

    // Online state
    if (online !== null) {
        const span = document.createElement('span');
        span.classList.add(online ? 'online' : 'offline');
        span.textContent = '•';
        span.style.marginLeft = '6px';
        h4.appendChild(span);
    }

    return h4;
}

export function loadUserContact(contactList, hiddenElement, contact) {
    const styles = {
        username: {
            fontSize: '16px',
            fontWeight: 700,
            right: '55px'
        },
        content: {
            fontSize: '14px',
            fontWeight: 400,
            right: '55px'
        }
    }

    const { user_id, username, online, last_message } = contact;

    // Parent div block
    const div = document.createElement('div');
    div.classList.add('contact');
    if (contact.user_id === window.activeContactId) {
        div.classList.add('active');
    }
    div.id = user_id;

    // Create username block
    const h4 = createUsernameBlock(hiddenElement, username, online, styles.username);
    div.appendChild(h4);

    // Last message div block
    const content = prepareText(hiddenElement, last_message.content, styles.content);
    const msgDiv = document.createElement('div');
    msgDiv.textContent = content;
    div.appendChild(msgDiv);

    // Date div block
    const dateDiv = document.createElement('div');
    dateDiv.classList.add('contact-msg-date');

    const d = new Date(last_message.timestamp);
    let date = isToday(d) ? `${d.getHours()}:${String(d.getMinutes()).padStart(2, '0')}`
        : d.toLocaleDateString(undefined, { weekday: 'short' });
    dateDiv.textContent = date;
    div.appendChild(dateDiv);

    contactList.appendChild(div);
}

function isToday(date) {
    const today = new Date();
    return today.getFullYear() === date.getFullYear() &&
        today.getMonth() === date.getMonth() &&
        today.getDate() === date.getDate()
}