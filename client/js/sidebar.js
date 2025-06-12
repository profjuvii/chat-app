import { pseudoContactsFetch } from './pseudo.js';
import { createHiddenTextElement } from './utils.js';
import { loadUserContact, unselectChat } from './modeAll.js';
import { renderActiveChat, showChatWindow } from './chat.js';

export function initSidebarWindow() {
    const contactList = document.getElementById('contact-list');

    // Load user contacts and apply manual text overflow handling
    const contacts = pseudoContactsFetch();
    const hiddenElement = createHiddenTextElement('cont-hidden-text', '10px');
    contactList.insertAdjacentElement('beforebegin', hiddenElement);

    const renderContacts = () => {
        contactList.innerHTML = '';
        contacts.forEach(contact => loadUserContact(contactList, hiddenElement, contact));
    }
    
    renderContacts();

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

export function showSidebarWindow() {
    const contactWindow = document.querySelector('.contact-window');
    contactWindow.style.display = 'flex';
}

export function hideSidebarWindow() {
    const contactWindow = document.querySelector('.contact-window');
    contactWindow.style.display = 'none';
}