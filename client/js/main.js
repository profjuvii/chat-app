import { initSidebarWindow, showSidebarWindow, hideSidebarWindow } from './sidebar.js';
import { initChatWindow, showChatWindow, hideChatWindow } from './chat.js';

document.addEventListener('DOMContentLoaded', main);

function main() {
    initSidebarWindow();
    initChatWindow();

    // Event handler for resizing window
    let resizeTimer = null;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);

        // For mobile version
        resizeTimer = setTimeout(() => {
            if (window.innerWidth <= 640) {
                if (window.activeContactId) {
                    hideSidebarWindow();
                    showChatWindow();
                } else {
                    hideChatWindow();
                    showSidebarWindow();
                }
            } else {
                showSidebarWindow();
                showChatWindow();
            }
        }, 150);
    });
}