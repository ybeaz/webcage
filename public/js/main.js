const chatForm = document.getElementById('chat-form')
const chatMessages = document.querySelector('.chat-messages')
const userList = document.getElementById('users')
const respondent = document.getElementById('respondent')

/*
• io.of(namespace): Creates a separate namespace for Socket.IO connections.
• io.on(eventName, callback): Listens for a specific event on the server side.
• io.sockets.emit(eventName, data): Emits an event to all connected clients.
• io.to(roomName).emit(eventName, data): Sends an event to all clients in a specific room.
• io.use(middleware): Registers a middleware function to be executed for every incoming connection.
• socket.broadcast.emit(eventName, data): Emits an event to all clients except the current one.
• socket.disconnect(): Disconnects the client from the server.
• socket.emit(eventName, data): Emits an event from the server to a specific client or clients.
• socket.id: Returns the unique identifier for the client's socket connection.
• socket.join(roomName): Makes a client join a specific room.
• socket.leave(roomName): Makes a client leave a specific room.
• socket.on(eventName, callback): Listens for a specific event on the client side.
*/

const profiles = [
  {
    idProfile: '0',
    idUser: '0',
    profileName: '@',
    nameFirst: '',
    nameLast: '',
    uriAvatar: '',
    phones: [],
    emails: [],
    messengers: [],
    locations: [],
    serviceSpecs: [],
    summary: '',
  },
  {
    idProfile: '1',
    idUser: '1',
    profileName: '@rome',
    nameFirst: 'Roman',
    nameLast: 'Ches',
    uriAvatar: 'https://r1.userto.com/img/avatar-rome.jpg', // https://yourails.com/images/sphinx-01.jpg
    phones: ['415-650-9893'],
    emails: ['t3531350@yahoo.com'],
    messengers: [{ name: 'Telegram', profileName: '@rome_sfba2' }],
    locations: ['Remote', 'San Francisco, CA'],
    serviceSpecs: ['Full Stack Developer', 'Machine Learning'],
    summary: '',
  },
  {
    idProfile: '2',
    idUser: '2',
    profileName: '@smid',
    nameFirst: 'Dmitrii',
    nameLast: 'Smid',
    uriAvatar: 'https://r1.userto.com/img/avatar-smid.jpg',
    phones: ['415-340-9293'],
    emails: ['smiddist@gmail.com'],
    messengers: [],
    locations: ['San Francisco, CA'],
    serviceSpecs: ['Electrician', 'Appliance technician'],
    summary:
      'Motivated and detail-oriented electrician with experience in installing and maintaining electrical systems in residential settings. Skilled in using hand and power tools to complete tasks accurately and efficiently.',
  },
  {
    idProfile: '4',
    idUser: '4',
    profileName: '@wilson',
    nameFirst: 'Alicia',
    nameLast: 'Wilson',
    uriAvatar:
      'https://mindbodygreen-res.cloudinary.com/image/upload/c_fill,g_auto,w_50,h_50,q_auto,f_auto,fl_lossy/dpr_2.0/usr/RSRzgow.png',
    phones: ['650-000-0000'],
    emails: ['example2@site.com'],
    messengers: [],
    locations: ['San Moon, CA'],
    serviceSpecs: ['Technical support'],
    summary: '',
  },
  {
    idProfile: '3',
    idUser: '3',
    profileName: '@trivedi',
    nameFirst: 'Jack',
    nameLast: 'Trivedi',
    uriAvatar:
      'https://raw.githubusercontent.com/webkul/vivid/master/icons/badge.svg',
    phones: ['415-000-0000'],
    emails: ['example@site.com'],
    messengers: [],
    locations: ['San City, CA'],
    serviceSpecs: ['Technical recruiter'],
    summary: '',
  },
]

const getIdProfileByProfileName = profileName =>
  profiles.find(profile => profile.profileName === profileName)?.idProfile

const getProfileNameByIdProfile = idProfile =>
  profiles.find(profile => profile.idProfile === idProfile)?.profileName

/** @description Get profileNameHost and from URL */
const { profileNameHost, profileName } = Qs.parse(location.search, {
  ignoreQueryPrefix: true,
})

const getSortedArray = arr => arr.sort((a, b) => a.localeCompare(b))
const idsProfiles = getSortedArray([profileNameHost, profileName])
const idConversation = JSON.stringify(idsProfiles)

const socket = io('http://localhost:3003')

/** @description Join chatroom */
socket.emit('joinConversation', { profileNameHost, profileName })

/** @description Get users */
socket.on('conversations', data => {
  const {
    conversation: { profiles },
  } = data
  outputProfiles(profiles)
})

/** @description Message from server */
socket.on('message', message => {
  const { idConversation, idProfile, text, createdAt } = message
  const profileName = getProfileNameByIdProfile(idProfile)
  outputMessage({ profileName, text, createdAt })

  /** @description Scroll down */
  chatMessages.scrollTop = chatMessages.scrollHeight
})

/** @description Message submit */
chatForm.addEventListener('submit', e => {
  e.preventDefault()

  /** @description Get message text */
  let msg = e.target.elements.msg.value

  msg = msg.trim()

  if (!msg) {
    return false
  }

  /** @description Emit message to server */
  const idProfile = getIdProfileByProfileName(profileNameHost)
  const chatMessage = { idConversation, idProfile, text: msg }
  socket.emit('chatMessage', chatMessage)

  /** @description Clear input */
  e.target.elements.msg.value = ''
  e.target.elements.msg.focus()
})

/** @description Output message to DOM */
function outputMessage(message) {
  const dateTime = new Date(message.createdAt).toLocaleTimeString('en-US')

  const div = document.createElement('div')
  div.classList.add('message')
  const p = document.createElement('p')
  p.classList.add('meta')
  p.innerText = message.profileName ? message.profileName : 'System message'
  p.innerHTML += `<span>${dateTime}</span>`
  div.appendChild(p)
  const para = document.createElement('p')
  para.classList.add('text')
  para.innerText = message.text
  div.appendChild(para)
  document.querySelector('.chat-messages').appendChild(div)
}

/** @description Add name to DOM */
function outputRoomName() {
  respondent.innerText = profileName
}

/** @description Add users to DOM */
function outputProfiles(profiles) {
  userList.innerHTML = ''
  profiles.forEach(profile => {
    const li = document.createElement('li')
    li.innerText = profile.profileName
    userList.appendChild(li)
  })
}

/** @description Prompt the user before leave chat */
document.getElementById('leave-btn').addEventListener('click', () => {
  const leaveRoom = confirm('Are you sure you want to leave the chatroom?')
  if (leaveRoom) {
    window.location = '../index.html'
  } else {
  }
})
