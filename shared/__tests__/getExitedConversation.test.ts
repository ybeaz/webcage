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
          idSocket: 'aaa456',
        },
        expected: {
          conversation: undefined,
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
                  idSocket: 'aaa123',
                  profileName: '@trivedi',
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
          idSocket: 'aaa456',
        },
        expected: {
          conversation: undefined,
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
          idSocket: 'aaa456',
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
