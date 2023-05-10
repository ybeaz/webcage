const users = [];
let conversations = [];

// Join user to chat
function newUser(id, username, room) {
  const user = { id, username, room };

  users.push(user);

  return user;
}

const newConversation = (idSocket, username, respondentname) => {
  const idConversation = getSortedStringifyArray([username, respondentname]);
  const conversation = { idSocket, idConversation, username, respondentname };
  if (
    conversations.find(
      (conversation) => conversation.idConversation === idConversation
    )
  )
    conversations = [...conversations, conversation];
  return conversation;
};

// Get current user
function getActiveUser(id) {
  return users.find((user) => user.id === id);
}

function getCurrentConversation(idSocket) {
  return conversations.find(
    (conversation) => conversation.idSocket === idSocket
  );
}

// User leaves chat
function exitRoom(id) {
  const index = users.findIndex((user) => user.id === id);

  if (index !== -1) {
    return users.splice(index, 1)[0];
  }
}

function getExitedConversation(idSocket) {
  const conversation = conversations.find(
    (conversation) => conversation.idSocket === idSocket
  );
  conversations = conversations.filter(
    (conversation) => conversation.idSocket !== idSocket
  );

  return conversation;
}

// Get room users
function getIndividualRoomUsers(room) {
  return users.filter((user) => user.room === room);
}

function getUsersOfConversation(idConversation) {
  return conversations.filter(
    (conversation) => conversation.idConversation === idConversation
  );
}

const getSortedStringifyArray = (arr) =>
  JSON.stringify(arr.sort((a, b) => a.localeCompare(b)));

module.exports = {
  getUsersOfConversation,
  getExitedConversation,
  getCurrentConversation,
  newConversation,
  getSortedStringifyArray,
  newUser,
  getActiveUser,
  exitRoom,
  getIndividualRoomUsers,
};
