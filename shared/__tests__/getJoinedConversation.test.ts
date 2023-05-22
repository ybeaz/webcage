import { getJoinedConversation } from '../getJoinedConversation'

const consoleDirOptions = {
  showHidden: true,
  depth: null,
  showPrototypes: true,
}

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
              profiles: [],
            },
          ],
          idSocket: 'bbb123',
          profileNameHost: '@trivedi',
          profileName: '@rome',
        },
        expected: {
          conversation: {
            idConversation: '["@rome","@trivedi"]',
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

        // console.info('\n\n', 'getJoinedConversation.test [279]')
        // console.dir({ conversation, conversations }, consoleDirOptions)

        expect(outputed).toEqual(expected)
      }
    })
  })
})
