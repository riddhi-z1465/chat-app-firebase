import { deleteMessage } from "./delete.js";

// Interactive helper functions
function addMessageReactions(messageContainer) {
  const reactionsContainer = document.createElement('div');
  reactionsContainer.className = 'message-reactions';

  const reactions = ['👍', '❤️', '😂', '😮', '😢', '😡'];

  reactions.forEach(emoji => {
    const reactionBtn = document.createElement('button');
    reactionBtn.className = 'reaction-btn';
    reactionBtn.textContent = emoji;
    reactionBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      reactionBtn.classList.toggle('active');
      addRippleEffect(reactionBtn);
    });
    reactionsContainer.appendChild(reactionBtn);
  });

  messageContainer.appendChild(reactionsContainer);
}

function addMessageStatus(messageContainer) {
  const statusContainer = document.createElement('div');
  statusContainer.className = 'message-status';

  const statusIcon = document.createElement('div');
  statusIcon.className = 'status-icon sent';

  const statusText = document.createElement('span');
  statusText.textContent = 'Sent';

  statusContainer.appendChild(statusIcon);
  statusContainer.appendChild(statusText);
  messageContainer.appendChild(statusContainer);

  // Simulate status progression
  setTimeout(() => {
    statusIcon.className = 'status-icon delivered';
    statusText.textContent = 'Delivered';
  }, 1000);

  setTimeout(() => {
    statusIcon.className = 'status-icon read';
    statusText.textContent = 'Read';
  }, 2000);
}

function addRippleEffect(element) {
  element.classList.add('ripple');
  setTimeout(() => element.classList.remove('ripple'), 600);
}

function selectMessage(messageContainer) {
  // Remove previous selection
  const previousSelected = document.querySelector('.message-container.selected');
  if (previousSelected) {
    previousSelected.classList.remove('selected');
  }

  // Add selection to current message
  messageContainer.classList.add('selected');
}

// Edit message functionality
function editMessage(docId, currentMessage, messageBubble, editButton) {
  // Create edit input
  const editInput = document.createElement('input');
  editInput.type = 'text';
  editInput.value = currentMessage;
  editInput.className = 'edit-input';
  editInput.style.cssText = `
    width: 100%;
    padding: 8px 12px;
    border: 2px solid #10b981;
    border-radius: 12px;
    font-size: 14px;
    font-family: inherit;
    outline: none;
    background: white;
    box-shadow: 0 2px 8px rgba(16, 185, 129, 0.2);
  `;

  // Create edit buttons container
  const editButtonsContainer = document.createElement('div');
  editButtonsContainer.className = 'edit-buttons';
  editButtonsContainer.style.cssText = `
    display: flex;
    gap: 8px;
    margin-top: 8px;
  `;

  // Save button
  const saveButton = document.createElement('button');
  saveButton.textContent = 'Save';
  saveButton.className = 'save-edit-btn';
  saveButton.style.cssText = `
    background: #10b981;
    color: white;
    border: none;
    border-radius: 8px;
    padding: 6px 12px;
    font-size: 12px;
    cursor: pointer;
    transition: all 0.2s ease;
  `;

  // Cancel button
  const cancelButton = document.createElement('button');
  cancelButton.textContent = 'Cancel';
  cancelButton.className = 'cancel-edit-btn';
  cancelButton.style.cssText = `
    background: #f1f5f9;
    color: #64748b;
    border: 1px solid #e2e8f0;
    border-radius: 8px;
    padding: 6px 12px;
    font-size: 12px;
    cursor: pointer;
    transition: all 0.2s ease;
  `;

  // Replace message content with edit input
  messageBubble.innerHTML = '';
  messageBubble.appendChild(editInput);
  messageBubble.appendChild(editButtonsContainer);
  editButtonsContainer.appendChild(saveButton);
  editButtonsContainer.appendChild(cancelButton);

  // Focus and select text
  editInput.focus();
  editInput.select();

  // Save functionality
  saveButton.addEventListener('click', async () => {
    const newMessage = editInput.value.trim();
    if (newMessage && newMessage !== currentMessage) {
      try {
        await firebase.firestore().collection('jh-chat').doc(docId).update({
          message: newMessage
        });
        console.log('Message updated successfully');
      } catch (error) {
        console.error('Error updating message:', error);
        alert('Failed to update message. Please try again.');
      }
    }
    // Restore original message display
    messageBubble.innerHTML = newMessage || currentMessage;
  });

  // Cancel functionality
  cancelButton.addEventListener('click', () => {
    messageBubble.innerHTML = currentMessage;
  });

  // Save on Enter key
  editInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      saveButton.click();
    }
  });

  // Cancel on Escape key
  editInput.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      cancelButton.click();
    }
  });

  // Hover effects for buttons
  saveButton.addEventListener('mouseenter', () => {
    saveButton.style.background = '#059669';
    saveButton.style.transform = 'translateY(-1px)';
  });
  saveButton.addEventListener('mouseleave', () => {
    saveButton.style.background = '#10b981';
    saveButton.style.transform = 'translateY(0)';
  });

  cancelButton.addEventListener('mouseenter', () => {
    cancelButton.style.background = '#e2e8f0';
    cancelButton.style.transform = 'translateY(-1px)';
  });
  cancelButton.addEventListener('mouseleave', () => {
    cancelButton.style.background = '#f1f5f9';
    cancelButton.style.transform = 'translateY(0)';
  });
}

export function getMsg() {
  firebase
    .firestore()
    .collection("jh-chat")
    .onSnapshot((changes) => {
      changes.docChanges().forEach((change) => {
        console.log("Change:", change);

        if (change.type === "added") {
          // Remove empty state if it exists
          const emptyState = document.querySelector('.empty-state');
          if (emptyState) {
            emptyState.remove();
          }

          // Create message container
          let messageContainer = document.createElement("div");
          messageContainer.className = "message-container new-message";
          messageContainer.setAttribute("data-id", change.doc.id);

          // Create message bubble
          let messageBubble = document.createElement("div");
          messageBubble.className = "message-bubble";
          messageBubble.innerText = change.doc.data().message;

          // Add timestamp
          const timestamp = document.createElement('div');
          timestamp.className = 'message-timestamp';
          const now = new Date();
          timestamp.textContent = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
          messageBubble.appendChild(timestamp);

          // Create message actions container
          let actionsContainer = document.createElement("div");
          actionsContainer.className = "message-actions";

          // Create edit button
          let editButton = document.createElement("button");
          editButton.className = "action-btn edit";
          editButton.innerHTML = '<span class="material-symbols-outlined">edit</span>Edit';

          // Create delete button
          let deleteButton = document.createElement("button");
          deleteButton.className = "action-btn delete";
          deleteButton.innerHTML = '<span class="material-symbols-outlined">delete</span>Delete';
          deleteButton.setAttribute("id", "button-" + change.doc.id);

          // Assemble the message
          actionsContainer.appendChild(editButton);
          actionsContainer.appendChild(deleteButton);
          messageContainer.appendChild(messageBubble);
          messageContainer.appendChild(actionsContainer);

          // Add interactive features
          addMessageReactions(messageContainer);
          addMessageStatus(messageContainer);

          // Add to chat container
          let chatContainer = document.getElementById("chat");
          chatContainer.appendChild(messageContainer);

          // Scroll to bottom
          chatContainer.scrollTop = chatContainer.scrollHeight;

          // Play receive sound
          if (typeof playSound === 'function') {
            playSound('receive');
          }

          // Add click handler for message selection
          messageContainer.addEventListener('click', (e) => {
            if (!e.target.closest('.action-btn') && !e.target.closest('.reaction-btn')) {
              selectMessage(messageContainer);
            }
          });

          // Remove new-message class after animation
          setTimeout(() => {
            messageContainer.classList.remove('new-message');
          }, 600);

          // Delete button functionality
          deleteButton.addEventListener("click", () => {
            deleteMessage(change.doc.id);
          });

          // Edit button functionality
          editButton.addEventListener("click", (e) => {
            e.stopPropagation();
            editMessage(change.doc.id, change.doc.data().message, messageBubble, editButton);
          });
        }

        else if (change.type === "removed") {
          // Remove the message container
          let messageContainer = document.querySelector(`[data-id="${change.doc.id}"]`);
          if (messageContainer) {
            messageContainer.remove();
          }

          // Show empty state if no messages
          let chatContainer = document.getElementById("chat");
          if (chatContainer.children.length === 0) {
            let emptyState = document.createElement("div");
            emptyState.className = "empty-state";
            emptyState.innerHTML = `
              <span class="material-symbols-outlined">chat_bubble_outline</span>
              <p>Start a conversation by typing a message below</p>
            `;
            chatContainer.appendChild(emptyState);
          }
        }
      });
    });
}
