/**
 * Listens for the app launching then creates the window
 *
 * @see http://developer.chrome.com/apps/app.runtime.html
 * @see http://developer.chrome.com/apps/app.window.html
 */
chrome.app.runtime.onLaunched.addListener(function() {
  // Center window on screen.
  var screenWidth = screen.availWidth,
    screenHeight = screen.availHeight,
    width = 500,
    height = 300;

  chrome.app.window.create('index.html', {
    id: "helloWorldID",
    bounds: {
      width: width,
      height: height,
      left: Math.round((screenWidth-width)/2),
      top: Math.round((screenHeight-height)/2)
    }
  });

  var log = console.log.bind(console);

  log('Hello');

  chrome.bluetooth.onDeviceAdded.addListener(function(device){
    log('Discovered device!', device)
  })

  chrome.bluetooth.startDiscovery(function(){
    log('Started discovery');
  });
});
