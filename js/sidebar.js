import { createHiddenTextElement } from './utils.js';
import { renderAllContactsMode } from './allContactsMode.js';
import { renderNewContactsMode } from './newContactsMode.js';

export function initSidebarWindow() {
    const allContactsBtn = document.getElementById('all-cont-btn');
    const newContactsBtn = document.getElementById('new-cont-btn');

    const contactList = document.getElementById('contact-list');
    const hiddenElement = createHiddenTextElement('cont-hidden-text', '10px');
    contactList.insertAdjacentElement('beforebegin', hiddenElement);

    const activateAllContactsMode = () => {
        if (!allContactsBtn.classList.contains('selected-mode')) {
            allContactsBtn.classList.add('selected-mode');
        }
        newContactsBtn.classList.remove('selected-mode');
        renderAllContactsMode();
    }

    const activateNewContactsMode = () => {
        if (!newContactsBtn.classList.contains('selected-mode')) {
            newContactsBtn.classList.add('selected-mode');
        }
        allContactsBtn.classList.remove('selected-mode');
        renderNewContactsMode();
    }

    // Initial mode
    activateAllContactsMode();

    // Event handlers for buttons in the top bar
    allContactsBtn.addEventListener('click', activateAllContactsMode);
    newContactsBtn.addEventListener('click', activateNewContactsMode);
}

export function showSidebarWindow() {
    const contactWindow = document.querySelector('.contact-window');
    contactWindow.style.display = 'flex';
}

export function hideSidebarWindow() {
    const contactWindow = document.querySelector('.contact-window');
    contactWindow.style.display = 'none';
}
