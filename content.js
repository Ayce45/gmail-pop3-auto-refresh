chrome.runtime.onMessage.addListener((message) => {
    if (message.action === "clickButton") {
        let e = document.getElementsByClassName("rP sA")
        for (let o of e) {
            o.click()
        }
        console.log('[GPAR] Refresh Pop')
    }
});
