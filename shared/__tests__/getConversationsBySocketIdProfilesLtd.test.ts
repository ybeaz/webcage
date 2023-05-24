import { getConversationsBySocketIdProfilesLtd } from '../getConversationsBySocketIdProfilesLtd'

const consoleDirOptions = {
  showHidden: true,
  depth: null,
  showPrototypes: true,
}

/**
 * @test yarn jest getConversationsBySocketIdProfilesLtd.test
 */
describe('Test function getConversationsBySocketIdProfilesLtd', () => {
  it('test', () => {
    const tests = [
      {
        isActive: true,
        input: {
          conversations: [
            {
              idConversation: '["@rome","@smid"]',
              profiles: [
                { idSocket: 'rome111', profileName: '@rome' },
                { idSocket: 'smid222', profileName: '@smid' },
              ],
            },
            {
              idConversation: '["@trivedi","@wilson"]',
              profiles: [
                { idSocket: 'trivedi222', profileName: '@trivedi' },
                { idSocket: 'wilson333', profileName: '@wilson' },
              ],
            },
            {
              idConversation: '["@rome","@trivedi"]',
              profiles: [
                { idSocket: 'rome111', profileName: '@rome' },
                { idSocket: 'trivedi222', profileName: '@trivedi' },
              ],
            },
          ],
          idSocket: 'rome111',
        },
        expected: [
          {
            idConversation: '["@rome","@smid"]',
            profiles: [{ idSocket: 'rome111', profileName: '@rome' }],
          },
          {
            idConversation: '["@rome","@trivedi"]',
            profiles: [{ idSocket: 'rome111', profileName: '@rome' }],
          },
        ],
      },
    ]

    tests.forEach((test: any) => {
      const { isActive, input, expected } = test
      if (isActive) {
        const outputed = getConversationsBySocketIdProfilesLtd(input)

        console.info('getConversationsBySocketIdProfilesLtd [21]', { outputed })

        expect(outputed).toEqual(expected)
      }
    })
  })
})
