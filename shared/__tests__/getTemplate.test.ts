import { getTemplate } from '../getTemplate'

const consoleDirOptions = {
  showHidden: true,
  depth: null,
  showPrototypes: true,
}

/**
 * @test yarn jest getTemplate.test
 */
describe('Test function getTemplate', () => {
  it('test', () => {
    const tests = [
      {
        isActive: true,
        input: {},
        expected: {},
      },
    ]

    tests.forEach((test: any) => {
      const { isActive, input, expected } = test
      if (isActive) {
        const outputed = getTemplate()

        console.info('getTemplate [21]', { outputed })

        // expect(outputed).toEqual(expected)
      }
    })
  })
})
