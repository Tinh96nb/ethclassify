var crypto,ipfs, Buffer, account;

function initFileAPI() {
    if (!window.File || !window.FileReader || !window.FileList || !window.Blob) {
        alert("File API is not supported"); 
    }
};

function initDropzone() {
    var dropZone = document.getElementById('dropzone');
    dropZone.addEventListener('dragover', handleDragOver, false);
    dropZone.addEventListener('drop', handleFileSelect, false);
}

function initCrypto() {
    crypto = window.crypto || window.msCrypto;
    if(!crypto.subtle) {
        alert('Crypto API is not available!');
    }   
}

function initIpfs(){
    if(window.ipfsAPI){
        ipfs = window.ipfsAPI('localhost', '5001');    
    }else {
        alert('IPFS not available!');
    }
    
}

function initWeb3(){
    web3.eth.getAccounts(function(err, accs) {
    if (err != null) {
      message("There was an error fetching your accounts.");
      return;
    }

    if (accs.length == 0) {
      message("Couldn't get any accounts! Make sure your Ethereum client is configured correctly.");
      return;
    }

    accounts = accs;
    account = accounts[0];
    document.getElementById('balance').textContent = web3.fromWei(web3.eth.getBalance(account)) + ' ETH';
  });
}

function initRequireJs(){
    requirejs.config({
        baseUrl: './',

        paths: {
            app: '../app'
        }
});

    // Start the main app logic.
    requirejs(['buffer'],
       function   (buffer) {
            Buffer = buffer.Buffer;
        }
    );
}