import web3 = require('@solana/web3.js');
import { sign } from 'crypto';

console.log("testing my first solana by creating my own cli");
//console.log("web3 connection -->",web3);

// now creating a connection

const connection = new web3.Connection(web3.clusterApiUrl('devnet'));
console.log("connection derived from devnet");
console.log("devnet   --->",connection);


// creating the secret key from wallet 

const mykey : Uint8Array = Uint8Array.from([99,173,4,103,16,103,34,238,196,209,127,169,37,117,42,232,34,208,137,204,22,138,250,23,58,240,27,83,113,145,4,115,175,93,123,148,105,223,161,61,168,250,132,93,163,211,213,160,55,3,133,225,105,114,159,253,101,35,16,129,200,47,219,107]);


console.log("retreived from wallet ------>",mykey);

// adding programID for later purpose 
// we already got the program ID now adding it below
// we already got the program ID - AtcZrTWaadnxytJRLAj878abq5gw8Ymrp2Ks7jP6q7ov

let programId = new web3.PublicKey(
    "AtcZrTWaadnxytJRLAj878abq5gw8Ymrp2Ks7jP6q7ov"
    );

async function  main() {
    // deriving the signer
    // from the wallet

    let signer : web3.Keypair = web3.Keypair.fromSecretKey(mykey);

    //const data : Buffer = Buffer.from("thanga");

    const data : Buffer = Buffer.from(Uint8Array.of(0));

    // const data : Buffer = Buffer.from(Uint8Array.of(1));

    console.log("now the signer is finalized ----->",signer);

    console.log("deriving public key from signer",signer.publicKey.toString());

    await connection.getBalance(signer.publicKey).then((balance)=>{
        console.log("Balance Info -->",balance / web3.LAMPORTS_PER_SOL);
    }).catch((e)=> {
        console.log("found issues -->",e);
    });

    // await connection.getAccountInfo(signer.publicKey).then((info) => {
    //     console.log("Account info -->",info);
    // }).then((e)=>{
    //     console.log(e);
    // })

    // creating a new transaction

    let transaction = new web3.Transaction().add(
        new web3.TransactionInstruction({
            keys: [],
            programId,
            data
        })
    );

    // sending / creating the transaction
    // must also add the signer
    // signer is the one which we already defined

    await web3.sendAndConfirmTransaction(connection,transaction, [signer]).then((txn_signature) => {
        console.log("SOL transaction $SOL devnet explorer",txn_signature);
    })
}

main()
	.then(() => process.exit(0))
	.catch((error) => {
		console.error(error);
		process.exit(1);
	});