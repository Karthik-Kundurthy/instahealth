const instacart_product_page_regex = /(http|https):\/\/www.instacart.com\/store\/[^\/]+\/products\/[^\/]+/;
var percent_data = {};

chrome.tabs.onUpdated.addListener(
    function(tabId, changeInfo, tab) {
        console.log(tabId)
        if (changeInfo.url) {
            percent_data[tabId] = null;
            chrome.action.setBadgeText({tabId: tabId, text: ""});
            if (instacart_product_page_regex.test(changeInfo.url)) {
                chrome.tabs.sendMessage(tabId, {
                    message: 'instacart_product_page',
                    url: changeInfo.url
                });
            }
        }
    }
);

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.message === 'new_percent_data') {
        percent_data[sender.tab.id] = request.data;
        chrome.action.setBadgeText({tabId: sender.tab.id, text: "1"});
    } else if (request.message == 'request_percent_data') {
        sendResponse({
            data: percent_data[request.tabId]
        });        
    }
});