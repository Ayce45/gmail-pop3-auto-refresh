// background.js
import { DEFAULT_USER_ID, DEFAULT_REFRESH_INTERVAL, DEFAULT_SELECTOR } from './constants.js';

function execute(userId, selector) {
  const url = `https://mail.google.com/mail/u/${userId}/#settings/accounts`;
  chrome.tabs.query({}, (tabs) => {
    const chromeSettingTab = tabs.find((tab) => tab.url.includes(url));
    if (chromeSettingTab) {
      chrome.tabs.sendMessage(chromeSettingTab.id, { action: "clickButton", selector });
    } else {
      chrome.tabs.create({ url, pinned: true, active: false }, (tab) => {
        chrome.tabs.onUpdated.addListener(function listener(tabId, info) {
          if (tabId === tab.id && info.status === "complete") {
            chrome.tabs.sendMessage(tab.id, { action: "clickButton", selector });
            chrome.tabs.onUpdated.removeListener(listener);
          }
        });
      });
    }
  });
}

function init() {
  chrome.storage.sync.get(
      { userId: DEFAULT_USER_ID, refreshInterval: DEFAULT_REFRESH_INTERVAL, selector: DEFAULT_SELECTOR },
      (settings) => {
        chrome.alarms.create("GPARAlarm", { periodInMinutes: parseInt(settings.refreshInterval) });
        execute(settings.userId, settings.selector);
      }
  );
}

init();

chrome.alarms.onAlarm.addListener((alarm) => {
  if (alarm.name === "GPARAlarm") {
    chrome.storage.sync.get(
        { userId: DEFAULT_USER_ID, refreshInterval: DEFAULT_REFRESH_INTERVAL, selector: DEFAULT_SELECTOR },
        (settings) => {
          execute(settings.userId, settings.selector);
        }
    );
  }
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "optionsSaved") {
    init();
  }
});