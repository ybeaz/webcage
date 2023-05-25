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

        console.info('\n\n', 'getTemplate [27]')
        console.dir({ outputed }, consoleDirOptions)

        // expect(outputed).toEqual(expected)
      }
    })
  })
})
