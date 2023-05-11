let conversations =
  []; /** @example [{ idConversation: '["@rome","@smid"]', idProfiles: [Array] }] */
let profiles =
  []; /** @example [{ idProfile: '@rome', idSocket: 'ArYnDsqrA3AyR9z4AAAF', profileName: '@rome' }] */

const getSortedArray = (arr) => arr.sort((a, b) => a.localeCompare(b));

const getProfileBy = (propName, value) => {
  const profileFound = profiles((profile) => profile[propName] === value);
  return profileFound;
};

const getAddedProfile = ({ idSocket, idProfile, profilename }) => {
  const profileFound = profiles.find(
    (profile) =>
      profile.idSocket === idSocket && profile.idProfile === idProfile
  );
  if (!profileFound) {
    const profileNew = { idSocket, idProfile, profilename };
    profiles = [...profiles, profileNew];
  }
};

const getConversation = (idSocket, profileName, respondentname) => {
  getAddedProfile({
    idSocket,
    idProfile: profileName,
    profilename: profileName,
  });
  const idsProfiles = getSortedArray([profileName, respondentname]);
  const idConversation = JSON.stringify(idsProfiles);
  const conversation = {
    idConversation,
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
  getConversation,
};
