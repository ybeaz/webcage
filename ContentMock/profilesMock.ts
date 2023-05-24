import { ProfileType } from '../@types/ProfileType'

export const profiles: ProfileType[] = [
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
    summary:
      '\
Full Stack Engineer with 12+ years of experience: a broad overview from MERN to LAMP, from AWS CDK to AI and Machine Learning.\n\
Frontend and backend Javascript, Typescript, ES6, 4 in React-Native, 8 in React.js, Redux, GraphQL, REST API, Node.js, AWS serverless: CDK, CloudFront, Lambda, API Gateway, Python, AI-ML: a broad outlook from MERN design patterns to LAMP OOP and focus on product requirements\n\
ML and AI include Tensorflow, Keras, NumPy, Pandas, SciPy, Matplotlib, PyTorch, AWS, API\n\
',
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
