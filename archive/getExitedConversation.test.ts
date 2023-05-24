import { getExitedConversation } from '../getExitedConversation'

/**
 * @test yarn jest getExitedConversation.test
 */
describe('Test function getExitedConversation', () => {
  it('test', () => {
    const tests = [
      {
        isActive: true,
        input: {
          conversations: [],
          idSocket: 'aaa123',
        },
        expected: {
          conversationsExited: [],
          conversations: [],
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
                  idSocket: 'ttt123',
                  profileName: '@trivedi',
                },
              ],
            },
            {
              idConversation: '["@trivedi","@wilson"]',
              profiles: [
                {
                  idSocket: 'ttt123',
                  profileName: '@trivedi',
                },
              ],
            },
          ],
          idSocket: 'ttt123',
        },
        expected: {
          conversationsExited: [
            {
              idConversation: '["@rome","@trivedi"]',
              profiles: [
                {
                  idSocket: 'ttt123',
                  profileName: '@trivedi',
                },
              ],
            },
            {
              idConversation: '["@trivedi","@wilson"]',
              profiles: [
                {
                  idSocket: 'ttt123',
                  profileName: '@trivedi',
                },
              ],
            },
          ],
          conversations: [
            {
              idConversation: '["@rome","@trivedi"]',
              profiles: [],
            },
            {
              idConversation: '["@trivedi","@wilson"]',
              profiles: [],
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
                  idSocket: 'ttt123',
                  profileName: '@trivedi',
                },
                {
                  idSocket: 'rrr456',
                  profileName: '@rome',
                },
              ],
            },
            {
              idConversation: '["@trivedi","@wilson"]',
              profiles: [
                {
                  idSocket: '111123',
                  profileName: '@trivedi',
                },
              ],
            },
          ],
          idSocket: 'rrr456',
        },
        expected: {
          conversationsExited: {
            idConversation: '["@rome","@trivedi"]',
            profiles: [
              {
                idSocket: 'rrr456',
                profileName: '@rome',
              },
            ],
          },
          conversations: [
            {
              idConversation: '["@rome","@trivedi"]',
              profiles: [
                {
                  idSocket: 'ttt123',
                  profileName: '@trivedi',
                },
              ],
            },
            {
              idConversation: '["@trivedi","@wilson"]',
              profiles: [
                {
                  idSocket: 'ttt123',
                  profileName: '@trivedi',
                },
              ],
            },
          ],
        },
      },
    ]

    tests.forEach((test: any) => {
      const { isActive, input, expected } = test
      if (isActive) {
        const outputed = getExitedConversation(input)

        // console.info('getExitedConversation [77]', { outputed })

        expect(outputed).toEqual(expected)
      }
    })
  })
})
