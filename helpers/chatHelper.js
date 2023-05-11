let conversations =
  []; /** @example [{ idConversation: '["@rome","@smid"]', profiles: [Array] }] */

const getSortedArray = (arr) => arr.sort((a, b) => a.localeCompare(b));

const getFoundElementBy = (arr, propName, value) => {
  const profileFound = arr((profile) => profile[propName] === value);
  return profileFound;
};

const getAddedConversation = (props) => {
  const { idSocket, profileName, respondentname } = props;

  const idsProfiles = getSortedArray([profileName, respondentname]);
  const idConversation = JSON.stringify(idsProfiles);
  const conversation = {
    idConversation,
    idsSockets: [],
    idsProfiles,
    idSocket,
    profileName,
    respondentname,
  };
  const conversationPrev = conversations.find(
    (conversation) => conversation.idConversation === idConversation
  );
  if (!conversationPrev || conversationPrev.profileName !== profileName)
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
  const output = conversations.filter(
    (conversation) => conversation.idConversation === idConversation
  );

  console.info("userHelper [36]", { conversations });
  return output;
}

module.exports = {
  getConversationsByIdConversation,
  getExitedConversation,
  getCurrentConversation,
  getAddedConversation,
};