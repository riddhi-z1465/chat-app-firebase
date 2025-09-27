export function deleteMessage(docID) {
    try {
        firebase
            .firestore()
            .collection('jh-chat')
            .doc(docID)
            .delete()
            .then(() => {
                console.log("Message deleted successfully");
            })
            .catch((error) => {
                console.error("Error deleting message:", error);
                alert('Failed to delete message. Please try again.');
            });
    } catch (error) {
        console.error("Error deleting message:", error);
        alert('Failed to delete message. Please try again.');
    }
}