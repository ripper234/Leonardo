import {leoConfiguration} from './configuration.srv';
import {Storage} from './storage.srv';
import {polifylls} from './polyfills';
import {Sinon} from './sinon.srv';
import UIRoot from './ui/ui-root';

declare const window;
declare const Object;

polifylls();

//Init Configuration
window.Leonardo = window.Leonardo || {};
const configuration = leoConfiguration();
const storage = new Storage();
Object.assign(window.Leonardo || {}, configuration, { storage });
Leonardo.loadSavedStates();

// Init Sinon
new Sinon();  

//Init UI
new UIRoot();

if (chrome) {
    try {
    chrome.runtime.onMessage.addListener(
        function(request, sender, sendResponse) {
        if (request.message == "toggleEnabled") {
            var enabled = toggleEnabled();
            sendResponse({status: "ok", enabled: enabled});
            return;
        }
        if (request.message == 'isLeoEnabled') {
            sendResponse({status: "ok", enabled: isEnabled()});
            return;
        }
    });
}
    catch (e) {
        console.log("Leonardo Exception: " + e);
    }
}