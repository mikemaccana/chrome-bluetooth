// UI
define(['ractive', 'text!../views/uitemplate.mustache'], function(Ractive, uiTemplate){

	var query = document.querySelector.bind(document),
		queryAll = document.querySelectorAll.bind(document),
		log = console.log.bind(console)

	var port = chrome.runtime.connect({name: "register"});

	var knownDevices = {
		// '68:76:4F:AE:54:84':{
		// 	name: 'Mike'
		// }
	}

	var UI = new Ractive({
		el: query('.ui'),
		data: {
			currentStatus: 0,
			statuses: [{
				name: 'waiting',
				description: 'Turn on Bluetooth visibility on your smartphone to log in or register'
			},{
				name: 'existing',
				description: 'Welcome back'
			},{
				name: 'registering',
				description: 'Looks like you\'re new! Add your details below.'
			}],
			device: {
				address: null,
				name: null,
				type: null
			},
			user: {
				name: null
			}
		},
		template: uiTemplate,
		showRegisterUI: false // Duplicates currentStatus, but we can't use evail in Chrome apps.
	})

	port.postMessage({action: "scan"});
	port.onMessage.addListener(function(message) {
		if (message.update == "started scanning") {
			log('scanning started');
		} else if (message.update == "found device") {
			log('found '+message.device.type+'! '+message.device.name+' ('+message.device.address+')');
			// We're a known device
			UI.set('device', {
				type: message.device.type,
				name: message.device.name,
				address: message.device.address
			})
			var knownDevice = knownDevices[message.device.address]
			if ( knownDevice ) {
				UI.set('user.name', knownDevice.name)
				UI.set('currentStatus', 1)
				UI.set('showRegisterUI', false)
			} else {
				UI.set('currentStatus', 2)
				UI.set('showRegisterUI', true)
				// We're an unknown device, show registration UI
			}
		}
		// setTimeout
	});

	// query('button').addEventListener('click', function(ev){
	// 	log('clicked')
	// })

})


