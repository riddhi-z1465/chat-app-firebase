export function getMsg(){
    firebase
    .firestore()
    .collection('jh-chat')
    .onSnapshot(changes => {
        changes.docChanges().forEach((change) =>{
            if(change.type=='added'){
                let pTag=document.createElement('p');
                pTag.innerText=`Message: ${change.doc.data().message}`;

                let chatContainer=document.getElementById('chat');
                chatContainer.appendChild(pTag);
            }
        })
    })
}