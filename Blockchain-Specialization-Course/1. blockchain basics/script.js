var currentlyMining = false;
$(document).ready(function(){
	
	var page1Buttons = [$("#createNewAccount button"), $("#customGenesis button"), $("#initializeEthereum button"), $("#startNode button")];
	var page2Buttons = [$("#connectToPeer button"), $("#checkPeer button"), $("#checkPeer2 button"), $("#checkPeersForm button"), $("#checkPeersForm2 button"), $("#accountForm button"), $("#accountForm2 button"), $("#checkBalanceForm button"), $("#checkBalanceForm2 button"), $("#unlockAccountForm button"), $("#unlockAccountForm2 button"), $("#startMiner"), $("#stopMiner"), $("#sendTransactionForm button"), $("#sendTransactionForm2 button"), $("#checkTransactionForm button"), $("#submitProject"), $("#copyScore")];
	//Getting Started with Ethereum Functions
	$("#createNewAccount").on('submit', function(e){
		e.preventDefault();
		var password = $("#passwordNode1").val();
		var password2 = $("#passwordNode2").val();
		if(!password || !password2){
			alert("Please provide both the passwords!");
			enableButtons(page1Buttons);
			return
		}
		disableButtons(page1Buttons,$("#accountAddressNode1"), "Account creation in progress...");
		$.ajax({
		    url: '/api/configureEthereum:account', 
		    type: 'POST', 
		    contentType: 'application/json', 
		    data: JSON.stringify({"password1":password,"password2":password2})}
		).done(function(resp){
			if(resp.status == "error"){
				alert(resp.errorDetails);
				enableButtons(page1Buttons);
			}else if(resp.status == "complete"){
				$("#accountAddressNode1").val(resp.accountAddress1);
				$("#accountAddressNode2").val(resp.accountAddress2);				
				enableButtons(page1Buttons);
				disableButton($("#createNewAccount button"));
			}
		});
	});

	$("#customGenesis").on('submit', function(e){
		e.preventDefault();
		var genesisData = $("#genesisContent").val()
		if(!genesisData){
			alert("Please enter the data of the Genesis file.");
			enableButtons(page1Buttons);
			return
		}
		disableButtons(page1Buttons,$("#genesisFileStatus"), "Creating Genesis File...");
		$.ajax({
		    url: '/api/configureEthereum:genesis', 
		    type: 'POST', 
		    contentType: 'application/json', 
		    data: JSON.stringify({"genesisData":genesisData})}
		).done(function(resp){
			if(resp.status == "error"){
				alert(resp.errorDetails);
				enableButtons(page1Buttons);
				$("#genesisFileStatus").val(resp.errorDetails);
			}else if(resp.status == "complete"){
				$("#genesisFileStatus").val(resp.message);
				enableButtons(page1Buttons);
				disableButton($("#customGenesis button"));
			}
		});
	});

	$("#initializeEthereum").on('submit', function(e){
		e.preventDefault();
		disableButtons(page1Buttons,$("#ethereumInitStatus"), "Initializing Genesis Blocks...");
		$.ajax({
		    url: '/api/configureEthereum:init', 
		    type: 'POST', 
		    contentType: 'application/json'}
		).done(function(resp){
			if(resp.status == "error"){
				alert(resp.errorDetails);
				enableButtons(page1Buttons);
				$("#ethereumInitStatus").val(resp.errorDetails);
			}else if(resp.status == "complete"){
				$("#ethereumInitStatus").val(resp.message);
				enableButtons(page1Buttons);
				disableButton($("#initializeEthereum button"));
			}
		});
	});

	$("#startNode").on('submit', function(e){
		e.preventDefault();
		disableButtons(page1Buttons,$("#ethereumNodeStatus"), "Starting Ethereum...");
		var timeout = setTimeout(function(){
					$("#ethereumNodeStatus").val("Ethereum started successfully. Move to Step 2 now.");
					$("#nextStep").prop("disabled", false);
					$("#nextStep").removeClass("btn-dark");
					$("#nextStep").addClass("btn-primary");
				},5000);	
		$.ajax({
		    url: '/api/configureEthereum:start', 
		    type: 'POST', 
		    contentType: 'application/json'}
		).done(function(resp){
			if(resp.status == "error"){
				alert(resp.errorDetails);
				enableButtons(page1Buttons);
				$("#ethereumNodeStatus").val(resp.errorDetails);
				clearInterval(timeout)
			}else if(resp.status == "complete"){
				setTimeout(function(){
					$("#ethereumNodeStatus").val(resp.message);
				},4000);
			}
		});
	});

	$("#nextStep").on('click', function(e){
		window.location.href = './ethereum.html';
	});


	//Performing Ethereum Functions
	$("#connectToPeer").on('submit', function(e){
		e.preventDefault();		
		disableButtons(page2Buttons,$("#peerStatus"), "Connecting to peer...");
		$.ajax({
		    url: '/api/ethereum:addPeer', 
		    type: 'POST', 
		    contentType: 'application/json'
		}).done(function(resp){
			if(resp.status == "error"){
				alert(resp.errorDetails);
				enableButtons(page2Buttons);
			}else if(resp.status == "complete"){
				$("#peerStatus").val(resp.addStatus);
				showShortModal();
				setTimeout(function(){
					enableButtons(page2Buttons);
					hideShortModal();
				},6000);
			}
		});
	});

	$("#checkPeer").on('submit', function(e){
		e.preventDefault();		
		disableButtons(page2Buttons,$("#peerCount"), "Fetching peer count...");
		$.ajax({
		    url: '/api/ethereum:peerCount', 
		    type: 'POST', 
		    contentType: 'application/json',
		    data:JSON.stringify({"node":1})
		}).done(function(resp){
			if(resp.status == "error"){
				alert(resp.errorDetails);
				enableButtons(page2Buttons);
			}else if(resp.status == "complete"){
				$("#peerCount").val(resp.count);
				showShortModal();
				setTimeout(function(){
					enableButtons(page2Buttons);
					hideShortModal();
				},6000);
			}
		});
	});

	$("#checkPeer2").on('submit', function(e){
		e.preventDefault();		
		disableButtons(page2Buttons,$("#peerCount2"), "Fetching peer count...");
		$.ajax({
		    url: '/api/ethereum:peerCount', 
		    type: 'POST', 
		    contentType: 'application/json',
		    data:JSON.stringify({"node":2})
		}).done(function(resp){
			if(resp.status == "error"){
				alert(resp.errorDetails);
				enableButtons(page2Buttons);
			}else if(resp.status == "complete"){
				$("#peerCount2").val(resp.count);
				showShortModal();
				setTimeout(function(){
					enableButtons(page2Buttons);
					hideShortModal();
				},6000);
			}
		});
	});

	$("#checkPeersForm").on('submit', function(e){
		e.preventDefault();		
		disableButtons(page2Buttons,$("#peerDetails"), "Fetching peer information...");
		$.ajax({
		    url: '/api/ethereum:peers', 
		    type: 'POST', 
		    contentType: 'application/json',
		    data:JSON.stringify({"node":1})
		}).done(function(resp){
			if(resp.status == "error"){
				alert(resp.errorDetails);
				enableButtons(page2Buttons);
			}else if(resp.status == "complete"){
				$("#peerDetails").val(resp.peers);
				showShortModal();
				setTimeout(function(){
					enableButtons(page2Buttons);
					hideShortModal();
				},6000);
			}
		});
	});

	$("#checkPeersForm2").on('submit', function(e){
		e.preventDefault();		
		disableButtons(page2Buttons,$("#peerDetails2"), "Fetching peer information...");
		$.ajax({
		    url: '/api/ethereum:peers', 
		    type: 'POST', 
		    contentType: 'application/json',
		    data:JSON.stringify({"node":2})
		}).done(function(resp){
			if(resp.status == "error"){
				alert(resp.errorDetails);
				enableButtons(page2Buttons);
			}else if(resp.status == "complete"){
				$("#peerDetails2").val(resp.peers);
				showShortModal();
				setTimeout(function(){
					enableButtons(page2Buttons);
					hideShortModal();
				},6000);
			}
		});
	});

	$("#accountForm").on('submit', function(e){
		e.preventDefault();
		var password = $("#accountPassword").val();
		if(!password){
			alert("Please enter a password!");
			return;
		}
		disableButtons(page2Buttons,$("#createAccountStatus"), "Account creation in progress...");
		$.ajax({
			url: '/api/ethereum:newAccounts', 
		    type: 'POST', 
		    contentType: 'application/json',
		    data:JSON.stringify({"node":1,"password":password})
		}).done(function(resp){
			if(resp.status == "error"){
				alert(resp.errorDetails);
				enableButtons(page2Buttons);
			}else if(resp.status == "complete"){
				$("#createAccountStatus").val(resp.message);
				showShortModal();
				setTimeout(function(){
					enableButtons(page2Buttons);
					hideShortModal();
				},6000);
			}
		});
	});
	$("#accountForm2").on('submit', function(e){
		e.preventDefault();
		var password = $("#accountPassword2").val();
		if(!password){
			alert("Please enter a password!");
			return;
		}
		disableButtons(page2Buttons,$("#createAccountStatus2"), "Account creation in progress...");
		$.ajax({
			url: '/api/ethereum:newAccounts', 
		    type: 'POST', 
		    contentType: 'application/json',
		    data:JSON.stringify({"node":2,"password":password})
		}).done(function(resp){
			if(resp.status == "error"){
				alert(resp.errorDetails);
				enableButtons(page2Buttons);
			}else if(resp.status == "complete"){
				$("#createAccountStatus2").val(resp.message);
				showShortModal();
				setTimeout(function(){
					enableButtons(page2Buttons);
					hideShortModal();
				},6000);
			}
		});
	});

	$("#checkBalanceForm").on('submit', function(e){
		e.preventDefault();		
		disableButtons(page2Buttons,$("#balanceStatus"), "Fetching accounts and balances...");
		$.ajax({
		    url: '/api/ethereum:balance', 
		    type: 'POST', 
		    contentType: 'application/json',
		    data:JSON.stringify({"node":1})
		}).done(function(resp){
			if(resp.status == "error"){
				alert(resp.errorDetails);
				$("#balanceStatus").val(resp.errorDetails);
				enableButtons(page2Buttons);
			}else if(resp.status == "complete"){
				addListAndBalance($("#accountList"),resp);
				$("#balanceStatus").val("Account and balances fetched.");
				showShortModal();
				setTimeout(function(){
					enableButtons(page2Buttons);
					hideShortModal();
				},6000);
			}
		});
	});

	$("#checkBalanceForm2").on('submit', function(e){
		e.preventDefault();		
		disableButtons(page2Buttons,$("#balanceStatus2"), "Fetching accounts and balances...");
		$.ajax({
		    url: '/api/ethereum:balance', 
		    type: 'POST', 
		    contentType: 'application/json',
		    data:JSON.stringify({"node":2})
		}).done(function(resp){
			if(resp.status == "error"){
				alert(resp.errorDetails);
				$("#balanceStatus2").val(resp.errorDetails);
				enableButtons(page2Buttons);
			}else if(resp.status == "complete"){
				addListAndBalance($("#accountList2"),resp);
				$("#balanceStatus2").val("Account and balances fetched.");
				showShortModal();
				setTimeout(function(){
					enableButtons(page2Buttons);
					hideShortModal();
				},6000);
			}
		});
	});

	$("#unlockAccountForm").on('submit', function(e){
		e.preventDefault();		
		var account = $("#unlockAccountID").val();
		var password = $("#password").val();
		if(!password || !account){
			alert("Please enter your account address and password!");
			$("#unlockStatus").val("Please enter both the account address and password");
			return;
		}
		disableButtons(page2Buttons,$("#unlockStatus"), "Unlocking Account...");
		$.ajax({
		    url: '/api/ethereum:unlockAccount', 
		    type: 'POST', 
		    contentType: 'application/json',
		    data: JSON.stringify({"account":account, "password":password, "node":1})
		}).done(function(resp){
			if(resp.status == "error"){
				alert(resp.errorDetails);
				$("#unlockStatus").val(resp.errorDetails);
				enableButtons(page2Buttons);
			}else if(resp.status == "complete"){
				$("#unlockStatus").val(resp.unlock);
				showShortModal();
				setTimeout(function(){
					enableButtons(page2Buttons);
					hideShortModal();
				},6000);
			}
		});
	});

	$("#unlockAccountForm2").on('submit', function(e){
		e.preventDefault();		
		var account = $("#unlockAccountID2").val();
		var password = $("#password2").val();
		if(!password || !account){
			alert("Please enter your account address and password!");
			$("#unlockStatus2").val("Please enter both the account address and password");
			return;
		}
		disableButtons(page2Buttons,$("#unlockStatus2"), "Unlocking account...");
		$.ajax({
		    url: '/api/ethereum:unlockAccount', 
		    type: 'POST', 
		    contentType: 'application/json',
		    data: JSON.stringify({"account":account, "password":password, "node":2})
		}).done(function(resp){
			if(resp.status == "error"){
				alert(resp.errorDetails);
				$("#unlockStatus2").val(resp.errorDetails);
				enableButtons(page2Buttons);
			}else if(resp.status == "complete"){
				$("#unlockStatus2").val(resp.unlock);
				showShortModal();
				setTimeout(function(){
					enableButtons(page2Buttons);
					hideShortModal();
				},6000);
			}
		});
	});

	$("#startMiner").on('click', function(e){
		e.preventDefault();		
		disableButtons(page2Buttons,$("#minerStatus"), "Miner starting...");
		$.ajax({
		    url: '/api/ethereum:minerStart', 
		    type: 'POST', 
		    contentType: 'application/json',
		    data:JSON.stringify({"node":1})
		}).done(function(resp){
			if(resp.status == "error"){
				alert(resp.errorDetails);
				$("#minerStatus").val(resp.errorDetails);
				enableButtons(page2Buttons);
			}else if(resp.status == "complete"){
				$("#minerStatus").val(resp.message);
				currentlyMining = true;
				showLongModal();
				enableButtons(page2Buttons);
				// setTimeout(function(){
					
				// 	hideShortModal();
				// },6000);
			}
		});
	});

	$("#stopMiner").on('click', function(e){
		e.preventDefault();		
		disableButtons(page2Buttons,$("#minerStatus"), "Miner Stopping...");
		$.ajax({
		    url: '/api/ethereum:minerStop', 
		    type: 'POST', 
		    contentType: 'application/json',
		    data:JSON.stringify({"node":1})
		}).done(function(resp){
			if(resp.status == "error"){
				alert(resp.errorDetails);
				$("#minerStatus").val(resp.errorDetails);
				enableButtons(page2Buttons);
			}else if(resp.status == "complete"){
				$("#minerStatus").val(resp.message);
				currentlyMining = false;
				showShortModal();
				setTimeout(function(){
					enableButtons(page2Buttons);
					hideShortModal();
				},6000);
			}
		});
	});

	$("#startMiner2").on('click', function(e){
		e.preventDefault();	
		disableButtons(page2Buttons,$("#minerStatus2"), "Miner Starting...");	
		$.ajax({
		    url: '/api/ethereum:minerStart', 
		    type: 'POST', 
		    contentType: 'application/json',
		    data:JSON.stringify({"node":2})
		}).done(function(resp){
			if(resp.status == "error"){
				alert(resp.errorDetails);
				$("#minerStatus2").val(resp.errorDetails);
				enableButtons(page2Buttons);
			}else if(resp.status == "complete"){
				$("#minerStatus2").val(resp.message);
				currentlyMining = true;
				showShortModal();
				setTimeout(function(){
					enableButtons(page2Buttons);
					hideShortModal();
				},6000);
			}
		});
	});

	$("#stopMiner2").on('click', function(e){
		e.preventDefault();		
		disableButtons(page2Buttons,$("#minerStatus2"), "Miner stopping...");
		$.ajax({
		    url: '/api/ethereum:minerStop', 
		    type: 'POST', 
		    contentType: 'application/json',
		    data:JSON.stringify({"node":2})
		}).done(function(resp){
			if(resp.status == "error"){
				alert(resp.errorDetails);
				enableButtons(page2Buttons);
			}else if(resp.status == "complete"){
				$("#minerStatus2").val(resp.message);
				currentlyMining = false;
				showShortModal();
				setTimeout(function(){
					enableButtons(page2Buttons);
					hideShortModal();
				},6000);
			}
		});
	});

	$("#sendTransactionForm").on('submit', function(e){
		e.preventDefault();		
		var sender = $("#senderAddress").val();
		var receiver = $("#destinationAddress").val();
		var amount = $("#sendAmount").val();
		if(!receiver || !amount || !sender){
			alert("Please enter all the details!");
			$("#transactionStatus").val("Please enter all the details.");
			return;
		}
		disableButtons(page2Buttons,$("#transactionStatus"), "Sending Transaction...");
		$.ajax({
		    url: '/api/ethereum:transaction', 
		    type: 'POST', 
		    contentType: 'application/json',
		    data: JSON.stringify({"node":1,"sender":sender,"receiver":receiver, "amount":amount})
		}).done(function(resp){
			if(resp.status == "error"){
				alert(resp.errorDetails);
				$("#transactionStatus").val(resp.errorDetails);
				enableButtons(page2Buttons);
			}else if(resp.status == "complete"){
				$("#transactionStatus").val(resp.transactionStatus);
				showShortModal();
				setTimeout(function(){
					enableButtons(page2Buttons);
					hideShortModal();
				},6000);
			}
		});
	});

	$("#sendTransactionForm2").on('submit', function(e){
		e.preventDefault();		
		var sender = $("#senderAddress2").val();
		var receiver = $("#destinationAddress2").val();
		var amount = $("#sendAmount2").val();
		if(!receiver || !amount || !sender){
			alert("Please enter all the details!");
			$("#transactionStatus2").val("Please enter all the details").
			return;
		}
		disableButtons(page2Buttons,$("#transactionStatus2"), "Sending Transaction...");
		$.ajax({
		    url: '/api/ethereum:transaction', 
		    type: 'POST', 
		    contentType: 'application/json',
		    data: JSON.stringify({"node":2,"sender":sender,"receiver":receiver, "amount":amount})
		}).done(function(resp){
			if(resp.status == "error"){
				alert(resp.errorDetails);
				$("#transactionStatus2").val(resp.errorDetails);
				enableButtons(page2Buttons);
			}else if(resp.status == "complete"){
				$("#transactionStatus2").val(resp.transactionStatus);
				showShortModal();
				setTimeout(function(){
					enableButtons(page2Buttons);
					hideShortModal();
				},6000);
			}
		});
	});

	$("#checkTransactionForm").on('submit', function(e){
		e.preventDefault();		
		disableButtons(page2Buttons,$("#pendingTransactions"), "Fetching transaction status...");
		$.ajax({
		    url: '/api/ethereum:transactionStatus', 
		    type: 'POST', 
		    contentType: 'application/json'
		}).done(function(resp){
			if(resp.status == "error"){
				alert(resp.errorDetails);
				$("#pendingTransactions").val(resp.errorDetails);
				enableButtons(page2Buttons);
			}else if(resp.status == "complete"){
				$("#pendingTransactions").val(resp.pending);
				$("#queuedTransactions").val(resp.queued);
				showShortModal();
				setTimeout(function(){
					enableButtons(page2Buttons);
					hideShortModal();
				},6000);
			}
		});
	});


	//Homepage Scenario 2 Buttons
	$("#startEthereumMove").on('click', function(e){
		e.preventDefault();
		$("#loader").fadeIn("fast");
		var timeout = setTimeout(function(){
				window.location.href = './ethereum.html';
			},5000);	
		$.ajax({
		    url: '/api/configureEthereum:start', 
		    type: 'POST', 
		    contentType: 'application/json'}
		).done(function(resp){
			if(resp.status == "error"){
				alert(resp.errorDetails);
				clearInterval(timeout);
				$("#loader").fadeOut("slow");
			}
		});
	});

	$("#stopAllEthereum").on('click', function(e){
		e.preventDefault();
		$.ajax({
		    url: '/api/configureEthereum:stop', 
		    type: 'POST', 
		    contentType: 'application/json'}
		).done(function(resp){
			if(resp.status == "error"){
				alert(resp.errorDetails);
			}else if(resp.status == "complete"){
				alert(resp.message);
			}
		});

	});

	$("#moveToStep2").on('click', function(e){
		e.preventDefault();
		window.location.href = './ethereum.html';
	});
	
	$("#deleteEverything").on('click', function(e){
		e.preventDefault();
		if(confirm("Are you sure you want to delete everything?")){
			$.ajax({
				url: '/api/deleteEverything', 
			    type: 'POST', 
			    contentType: 'application/json'
			}).done(function(resp){
				if(resp.status == "error"){
					alert(resp.errorDetails);
				}else if(resp.status == "complete"){
					alert(resp.message);
					window.location.href ='./index.html';
				}
			});			
		}else{
			return;
		}

	});

	$("#submitProject").on('click', function(e){
		e.preventDefault();
		$.ajax({
			url: '/api/submitScore', 
		    type: 'GET', 
		    contentType: 'application/json'
		}).done(function(resp){
			$("#submitScore").val(resp.hash);
		});
	});

	$("#copyScore").on('click', function(e){
		e.preventDefault();
		var copy = document.getElementById("submitScore");
		if(!copy.value){
			alert("Please generate your score first!");
			return;
		}
		copy.select();
		document.execCommand("Copy");
		copy.selectionStart = copy.selectionEnd = -1;
		alert("Copied to Clipboard")
	});

});

function addListAndBalance(element, resp){
	element.empty();
	for(var i = 0; i <resp.account.length; i++){
		var temp = '<div class="col-6"><input type="text" class="form-control" id="accountAddress" placeholder="Account Address" readonly value='+ resp.account[i] +'></div><div class="col-3"><input type="text" class="form-control" id="balanceWei" placeholder="Balance (in Weis)" readonly value='+ resp.wei[i] +'></div><div class="col-3"><input type="text" class="form-control" id="balanceEther" placeholder="Balance (in Ether)" readonly value='+ resp.ether[i] +'></div>';
		element.append(temp);
	}
	
}

function disableButtons(elements, messageElement, message){
	for(i=0; i<elements.length; i++){
		element = elements[i];
		element.prop("disabled", true);
		element.removeClass("btn-dark");
		element.removeClass("btn-primary");
	}
	messageElement.val(message);
}

function disableButton(element){
	element.prop("disabled", true);
	element.removeClass("btn-dark");
	element.removeClass("btn-primary");
}

function enableButtons(elements){
	for(i=0; i<elements.length; i++){
		element = elements[i];
		element.prop("disabled", false);
		element.removeClass("btn-dark");
		element.addClass("btn-primary");
	}
	if(currentlyMining == true){
		element = $("#startMiner");
		element.prop("disabled", true);
		element.removeClass("btn-dark");
		element.removeClass("btn-primary");
	}
}

function removeElement(buttonList,element){
	console.log(element);
	console.log(buttonList.indexOf(element));
	return buttonList.filter(function(e){
		return e!=element;
	});
}

function showShortModal(){
	$("#shortModal").modal({
		backdrop: 'static',
		keyboard: false
	});
	var countDown = new Date().getTime() + 6000;
	var testInterval = setInterval(function(){
		var now = new Date().getTime();
		var remain = countDown - now;

		var mins = Math.floor((remain %(1000*60*60))/(1000*60));
		var secs = Math.floor((remain % (1000*60)) / 1000);

		document.getElementById("shortTimer").innerHTML = mins + "m " + secs + "s ";

		if(remain<0){
			clearInterval(testInterval);
			document.getElementById("shortTimer").innerHTML = "0m 5s";
		}

	},1000);
}

function hideShortModal(){
	$("#shortModal").modal('hide');
}

function showLongModal(){
	$("#longModal").modal({
		backdrop: 'static',
		keyboard: false
	});
	var countDown = new Date().getTime() + (30 * 60 * 1000);
	var longInterval = setInterval(function(){
		var now = new Date().getTime();
		var remain = countDown - now;

		var mins = Math.floor((remain %(1000*60*60))/(1000*60));
		var secs = Math.floor((remain % (1000*60)) / 1000);

		document.getElementById("longTimer").innerHTML = mins + "m " + secs + "s ";

		if(remain<0){
			clearInterval(longInterval);
			clearInterval(DAGInterval);
			hideLongModal();
			document.getElementById("longTimer").innerHTML = "5m 0s";
		}

	},1000);
	var DAGInterval = setInterval(function(){
		//Contact the backend. If true, hideLongModal and clear the above interval and this interval
		$.ajax({
			url: '/api/checkDAG', 
			type: 'GET', 
			contentType: 'application/json'}
		).done(function(resp){
			if(resp.status == "error"){
				alert(resp.errorDetails);
			}else if(resp.status == "complete"){
				if(resp.dagStatus == true){
					clearInterval(longInterval);
					clearInterval(DAGInterval);
					hideLongModal();
				}
			}
		});
	},15000);
}

function hideLongModal(){
	$("#longModal").modal('hide');
}
