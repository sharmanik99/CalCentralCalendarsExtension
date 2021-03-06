chrome.runtime.onMessage.addListener(function(request, sender) {
    if (request.action == "getSource") {
        message.href = request.source;
        message.target = "_blank";
        link.innerText = request.source;
        //window.open(request.source, '_blank');
    }
});

function onWindowLoad() {

    var message = document.querySelector('#message');
    var link = document.querySelector('#link');
    chrome.tabs.executeScript(null, {
        file: "getPagesSource.js"
    }, function() {
        // If you try and inject into an extensions page or the webstore/NTP you'll get an error
        if (chrome.runtime.lastError) {
            message.innerText = 'There was an error injecting script : \n' + chrome.runtime.lastError.message;
        }
    });

}

window.onload = onWindowLoad;