chrome.alarms.create("GPARAlarm", { periodInMinutes: 1 });

chrome.alarms.onAlarm.addListener((alarm) => {
  if (alarm.name === "GPARAlarm") {
    execute()
  }
});

execute()

function execute() {
  const url = "https://mail.google.com/mail/u/0/#settings/accounts";
  chrome.tabs.query({}, (tabs) => {
    const chromeSettingTab = tabs.find((tab) => tab.url.includes(url));

    if (chromeSettingTab) {
      chrome.tabs.sendMessage(chromeSettingTab.id, { action: "clickButton" });
    } else {
      chrome.tabs.create({ url, pinned: true }, (tab) => {
        chrome.tabs.onUpdated.addListener(function listener(tabId, info) {
          if (tabId === tab.id && info.status === "complete") {
            chrome.tabs.sendMessage(tab.id, { action: "clickButton" });
            chrome.tabs.onUpdated.removeListener(listener);
          }
        });
      });
    }
  });
}