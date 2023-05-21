import { getJoinedConversation } from '../getJoinedConversation'

/**
 * @test yarn jest getJoinedConversation.test
 */
describe('Test function getJoinedConversation', () => {
  it('test', () => {
    const tests = [
      {
        isActive: true,
        input: {
          conversations: [
            {
              idConversation: '["@rome","@trivedi"]',
              profiles: [
                {
                  idSocket: 'aaa123',
                  profileName: '@trivedi',
                },
                {
                  idSocket: 'aaa456',
                  profileName: '@rome',
                },
              ],
            },
            {
              idConversation: '["@trivedi","@wilson"]',
              profiles: [
                {
                  idSocket: 'bbb123',
                  profileName: '@trivedi',
                },
              ],
            },
          ],
          idSocket: 'bbb456',
          profileNameHost: '@wilson',
          profileName: '@trivedi',
        },
        expected: {
          conversation: {
            idConversation: '["@trivedi","@wilson"]',
            profiles: [
              {
                idSocket: 'bbb123',
                profileName: '@trivedi',
              },
              {
                idSocket: 'bbb456',
                profileName: '@wilson',
              },
            ],
          },
          conversations: [
            {
              idConversation: '["@rome","@trivedi"]',
              profiles: [
                {
                  idSocket: 'aaa123',
                  profileName: '@trivedi',
                },
                {
                  idSocket: 'aaa456',
                  profileName: '@rome',
                },
              ],
            },
            {
              idConversation: '["@trivedi","@wilson"]',
              profiles: [
                {
                  idSocket: 'bbb123',
                  profileName: '@trivedi',
                },
                {
                  idSocket: 'bbb456',
                  profileName: '@wilson',
                },
              ],
            },
          ],
        },
      },
      {
        isActive: true,
        input: {
          conversations: [
            {
              idConversation: '["@rome","@trivedi"]',
              profiles: [
                {
                  idSocket: 'aaa123',
                  profileName: '@trivedi',
                },
                {
                  idSocket: 'aaa456',
                  profileName: '@rome',
                },
              ],
            },
          ],
          idSocket: 'bbb123',
          profileNameHost: '@trivedi',
          profileName: '@wilson',
        },
        expected: {
          conversation: {
            idConversation: '["@trivedi","@wilson"]',
            profiles: [
              {
                idSocket: 'bbb123',
                profileName: '@trivedi',
              },
            ],
          },
          conversations: [
            {
              idConversation: '["@rome","@trivedi"]',
              profiles: [
                {
                  idSocket: 'aaa123',
                  profileName: '@trivedi',
                },
                {
                  idSocket: 'aaa456',
                  profileName: '@rome',
                },
              ],
            },
            {
              idConversation: '["@trivedi","@wilson"]',
              profiles: [
                {
                  idSocket: 'bbb123',
                  profileName: '@trivedi',
                },
              ],
            },
          ],
        },
      },
      {
        isActive: true,
        input: {
          conversations: [
            {
              idConversation: '["@rome","@trivedi"]',
              profiles: [
                {
                  idSocket: 'aaa123',
                  profileName: '@trivedi',
                },
              ],
            },
          ],
          idSocket: 'aaa456',
          profileNameHost: '@rome',
          profileName: '@trivedi',
        },
        expected: {
          conversation: {
            idConversation: '["@rome","@trivedi"]',
            profiles: [
              {
                idSocket: 'aaa123',
                profileName: '@trivedi',
              },
              {
                idSocket: 'aaa456',
                profileName: '@rome',
              },
            ],
          },
          conversations: [
            {
              idConversation: '["@rome","@trivedi"]',
              profiles: [
                {
                  idSocket: 'aaa123',
                  profileName: '@trivedi',
                },
                {
                  idSocket: 'aaa456',
                  profileName: '@rome',
                },
              ],
            },
          ],
        },
      },
      {
        isActive: true,
        input: {
          conversations: [],
          idSocket: 'aaa123',
          profileNameHost: '@trivedi',
          profileName: '@rome',
        },
        expected: {
          conversation: {
            idConversation: '["@rome","@trivedi"]',
            profiles: [
              {
                idSocket: 'aaa123',
                profileName: '@trivedi',
              },
            ],
          },
          conversations: [
            {
              idConversation: '["@rome","@trivedi"]',
              profiles: [
                {
                  idSocket: 'aaa123',
                  profileName: '@trivedi',
                },
              ],
            },
          ],
        },
      },
    ]

    tests.forEach((test: any, index: number) => {
      const { isActive, input, expected } = test
      if (isActive) {
        const outputed = getJoinedConversation(input)

        const { conversation, conversations } = outputed
        // console.info('getJoinedConversation.test [171]', { outputed })
        // console.info('getJoinedConversation.test [173]', { conversation })
        // console.info('getJoinedConversation.test [174]', conversations)
        // console.info(
        //   'getJoinedConversation.test [175]',
        //   conversations[0].profiles
        // )
        // if (index < 2)
        //   console.info(
        //     'getJoinedConversation.test [176]',
        //     conversations[1].profiles
        //   )

        expect(outputed).toEqual(expected)
      }
    })
  })
})
