export function createHiddenTextElement(id, left) {
    const div = document.createElement('div');
    div.id = id;
    div.style.position = 'absolute';
    div.style.visibility = 'hidden';
    div.style.whiteSpace = 'nowrap';
    div.style.top = 0;
    div.style.left = left;
    return div;
}

export function prepareText(hiddenElement, text, { fontSize, fontWeight, right }) {
    hiddenElement.style.fontSize = fontSize;
    hiddenElement.style.fontWeight = fontWeight;
    hiddenElement.style.right = right;

    let currentText = text;
    hiddenElement.textContent = currentText;

    while (hiddenElement.scrollWidth > hiddenElement.clientWidth) {
        currentText = [...currentText].slice(0, -1).join('');
        hiddenElement.textContent = currentText.trim() + '...';
    }

    return hiddenElement.textContent;
}