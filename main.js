// Background page
var log = console.log.bind(console);

chrome.app.runtime.onLaunched.addListener(function() {
  // Center window on screen.
  var screenWidth = screen.availWidth,
    screenHeight = screen.availHeight,
    width = 500,
    height = 300;

  chrome.app.window.create('html/index.html', {
    id: "helloWorldID",
    bounds: {
      width: width,
      height: height,
      left: Math.round((screenWidth-width)/2),
      top: Math.round((screenHeight-height)/2)
    }
  });


  chrome.runtime.onConnect.addListener(function(port) {
    console.assert(port.name == "register");
    port.onMessage.addListener(function(msg) {
      var actions = {
        scan: function(){
          chrome.bluetooth.startDiscovery(function(){
            port.postMessage({'update': "started scanning"});
          });

          window.stopDiscovery = function(){
            chrome.bluetooth.stopDiscovery(function(){
              log('Discovery stopped')
            })
          }

          chrome.bluetooth.onDeviceAdded.addListener(function(device){
            var response = {'update': "found device"}
            response.device = device
            port.postMessage(response);
          })
        }
      }
      actions[msg.action]()
    })
  });
});
