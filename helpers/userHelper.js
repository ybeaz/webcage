let conversations = [];

const newConversation = (idSocket, username, respondentname) => {
  const idConversation = getSortedStringifyArray([username, respondentname]);
  const conversation = { idSocket, idConversation, username, respondentname };
  const conversationPrev = conversations.find(
    (conversation) => conversation.idConversation === idConversation
  );
  if (!conversationPrev || conversationPrev.username !== username)
    conversations = [...conversations, conversation];
  return conversation;
};

function getCurrentConversation(idSocket) {
  return conversations.find(
    (conversation) => conversation.idSocket === idSocket
  );
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

function getConversationsByIdConversation(idConversation) {
  return conversations.filter(
    (conversation) => conversation.idConversation === idConversation
  );
}

const getSortedStringifyArray = (arr) =>
  JSON.stringify(arr.sort((a, b) => a.localeCompare(b)));

module.exports = {
  getConversationsByIdConversation,
  getExitedConversation,
  getCurrentConversation,
  newConversation,
  getSortedStringifyArray,
};
