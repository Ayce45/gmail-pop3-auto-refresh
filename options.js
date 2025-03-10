import { DEFAULT_USER_ID, DEFAULT_REFRESH_INTERVAL, DEFAULT_SELECTOR } from './constants.js';

document.addEventListener('DOMContentLoaded', function () {
    chrome.storage.sync.get(
        { userId: DEFAULT_USER_ID, refreshInterval: DEFAULT_REFRESH_INTERVAL, selector: DEFAULT_SELECTOR },
        function (settings) {
            document.getElementById('userId').value = settings.userId;
            document.getElementById('refreshInterval').value = settings.refreshInterval;
            document.getElementById('selector').value = settings.selector;
        }
    );
});

document.getElementById('optionsForm').addEventListener('submit', function (e) {
    e.preventDefault();
    const userId = document.getElementById('userId').value;
    const refreshInterval = parseInt(document.getElementById('refreshInterval').value);
    const selector = document.getElementById('selector').value;

    chrome.storage.sync.set({ userId, refreshInterval, selector }, function () {
        chrome.runtime.sendMessage({ action: "optionsSaved" });

        alert('Options saved');
    });
});