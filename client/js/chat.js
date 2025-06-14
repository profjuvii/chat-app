import { pseudoChatFetch } from './pseudo.js';
import { createHiddenTextElement } from './utils.js';
import { createUsernameBlock, unselectChat } from './allContactsMode.js';
import { showSidebarWindow } from './sidebar.js';

export function initChatWindow() {
    const input = document.getElementById('new-msg');
    const sendBtn = document.getElementById('send-btn');
    const backBtn = document.getElementById('back-btn');

    // Create hidden element
    const hiddenElement = createHiddenTextElement('chat-hidden-text', '75px');
    const chatBar = document.querySelector('.chat-bar');
    chatBar.insertAdjacentElement('beforebegin', hiddenElement);

    // Event handler for dynamically resizing a input field
    input.addEventListener('input', dynamicResizeInputField);

    // Event handler for key Enter
    input.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            addNewMessage();
        }
    });
    
    // Event handler for send button
    sendBtn.addEventListener('click', addNewMessage);

    // Event handler for back button
    backBtn.addEventListener('click', () => {
        unselectChat();
        deactivateChat();

        // For mobile version
        if (window.innerWidth <= 640) {
            hideChatWindow();
            showSidebarWindow();
        }
    });
}

export function renderActiveChat(contactId) {
    if (!contactId) return;

    const chatWindow = document.querySelector('.chat-window');
    chatWindow.style.visibility = 'visible';

    // Get chat with selected contact from database
    const contact = pseudoChatFetch(contactId);

    // Create username block
    const hiddenElement = document.getElementById('chat-hidden-text');
    const chatBar = document.querySelector('.chat-bar');

    const { username, online, messages } = contact;
    const styles = { fontSize: '16px', fontWeight: 700, right: hiddenElement.style.left };

    const h4 = createUsernameBlock(hiddenElement, username, online, styles);
    chatBar.querySelector('h4')?.remove();
    chatBar.appendChild(h4);

    // Render chat messages
    const chat = document.getElementById('chat');
    chat.innerHTML = '';
    messages.forEach(({ from, content, timestamp }) => renderMessage(chat, from, content, timestamp));
}

export function showChatWindow() {
    const chatWindow = document.querySelector('.chat-window');
    chatWindow.style.display = 'flex';
}

export function hideChatWindow() {
    const chatWindow = document.querySelector('.chat-window');
    chatWindow.style.display = 'none';
}

function deactivateChat() {
    const chatWindow = document.querySelector('.chat-window');
    chatWindow.style.visibility = 'hidden';
    window.activeContactId = null;
}

function renderMessage(chat, from, message, date) {
    // Parent div block
    const div = document.createElement('div');
    div.classList.add('msg', from);

    // Message div block
    const msgDiv = document.createElement('div');
    msgDiv.classList.add('msg-content');
    msgDiv.textContent = message;
    div.appendChild(msgDiv);

    // Date div block
    const dateDiv = document.createElement('div');
    dateDiv.classList.add('chat-msg-date');

    const d = (date === 'now') ? new Date() : new Date(date);
    const dateStr = `${d.getHours()}:${String(d.getMinutes()).padStart(2, '0')}`
    dateDiv.textContent = dateStr;
    div.appendChild(dateDiv);

    // Append message based on typing row
    const typing = chat.querySelector('.typing');
    if (typing) {
        typing.insertAdjacentElement('beforebegin', div);
    } else {
        chat.appendChild(div);
    }

    chat.scrollTo({ top: chat.scrollHeight, behavior: 'smooth' });
}

function dynamicResizeInputField() {
    const input = document.getElementById('new-msg');

    const lineHeight = 16;
    const maxHeight = 200;
    const prevHeight = input.offsetHeight;

    // Get metrics from styles
    const styles = window.getComputedStyle(input);
    const padding = parseInt(styles.paddingTop) * 2;

    // Height auto
    input.style.height = '1px';
    const scrollHeight = input.scrollHeight;

    if (scrollHeight >= maxHeight) {
        input.style.height = prevHeight + 'px';
        input.scrollTop = input.scrollHeight;
        return;
    }

    // Compute line count
    const textHeight = scrollHeight - padding;
    const lineCount = Math.floor(textHeight / lineHeight);

    // Style changing
    if (lineCount === 1) {
        input.style.height = '38px';
        input.style.padding = '11px 10px';
    } else {
        const newHeight = lineCount * lineHeight + 6;
        input.style.height = newHeight + 'px';
        input.style.padding = '3px 10px';
    }
}

function addNewMessage() {
    const input = document.getElementById('new-msg');
    const chat = document.getElementById('chat');

    const resetInputField = () => {
        input.style.height = '38px';
        input.style.padding = '11px 10px';
        input.value = '';
    };

    let message = input.value.trim();
    if (!message) return;

    renderMessage(chat, 'me', message, 'now');
    resetInputField();
}