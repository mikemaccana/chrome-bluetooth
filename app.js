// UI

var query = document.querySelector.bind(document),
	queryAll = document.querySelectorAll.bind(document),
	log = console.log.bind(console)

log('hello')

query('button').addEventListener('click', function(ev){
	log('clicked')

	chrome.runtime.sendMessage({action: "scan"}, function(response) {
		log('scanning started');
	});
})

var addPara = function(text){
	var old = query('p')
	if ( old ) {
		old.remove();
	}
	var newParagraph = document.createElement('p');
	newParagraph.textContent = text;
	document.body.appendChild(newParagraph);
}

var port = chrome.runtime.connect({name: "register"});
query('button').addEventListener('click', function(ev){
	log('clicked')


	port.postMessage({action: "scan"});
	port.onMessage.addListener(function(message) {
		if (message.update == "started scanning") {
			addPara('scanning started');
		} else if (message.update == "found device") {
			log(message.device)
			addPara('found '+message.device.type+'! '+message.device.name+' ('+message.device.address+')');
		}
	});

})



