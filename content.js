chrome.runtime.onMessage.addListener((message) => {
    if (message.action === "clickButton") {
        const className = message.selector || "rP sA";
        const elements = document.getElementsByClassName(className);
        console.debug('[GPAR] Find elements', elements);
        for (let el of elements) {
            el.click();
            console.debug('[GPAR] Click element', el);
        }

        console.log('[GPAR] Refresh Pop');
    }
});