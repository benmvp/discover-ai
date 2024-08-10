import { getSearchFormData } from './houseplans'
import type { SearchParams } from './houseplans'

describe('getSearchFormData', () => {
  it('should return an empty FormData object when empty search params are provided', () => {
    const params: SearchParams = {}
    const formData = getSearchFormData(params)

    expect(formData).toBeInstanceOf(FormData)
    expect([...formData.entries()]).toMatchInlineSnapshot(`
[
  [
    "p",
    "1",
  ],
  [
    "s",
    "MOST_POPULAR",
  ],
]
`)
  })

  it('should correctly convert single selections from each feature category', () => {
    const params: SearchParams = {
      bd1: true,
      ba1h: true,
      s2: true,
      g3p: true,
      mnsqft: 1000,
      me: true,
      '2ms': true,
      bsp: true,
      wap: true,
      elv: true,
    }

    const formData = getSearchFormData(params)

    expect([...formData.entries()]).toMatchInlineSnapshot(`
[
  [
    "bd1",
    "true",
  ],
  [
    "ba1h",
    "true",
  ],
  [
    "s2",
    "true",
  ],
  [
    "g3p",
    "true",
  ],
  [
    "mnsqft",
    "1000",
  ],
  [
    "sy[]",
    "me",
  ],
  [
    "bf[]",
    "2ms",
  ],
  [
    "kf[]",
    "bsp",
  ],
  [
    "os[]",
    "wap",
  ],
  [
    "mf[]",
    "elv",
  ],
  [
    "p",
    "1",
  ],
  [
    "s",
    "MOST_POPULAR",
  ],
]
`)
  })

  it('should correctly convert multiple selections from each feature category', () => {
    const params: SearchParams = {
      bd2: true,
      bd3: true,
      ba1h: true,
      ba2: true,
      s1: true,
      s2: true,
      g1: true,
      g2: true,
      mnsqft: 1000,
      mxsqft: 2500,
      cr: true,
      mo: true,
      cbn: true,
      wic: true,
      nok: true,
      peb: true,
      blc: true,
      brz: true,
      emn: true,
      wca: true,
    }

    const formData = getSearchFormData(params)

    expect([...formData.entries()]).toMatchInlineSnapshot(`
[
  [
    "bd2",
    "true",
  ],
  [
    "bd3",
    "true",
  ],
  [
    "ba1h",
    "true",
  ],
  [
    "ba2",
    "true",
  ],
  [
    "s1",
    "true",
  ],
  [
    "s2",
    "true",
  ],
  [
    "g1",
    "true",
  ],
  [
    "g2",
    "true",
  ],
  [
    "mnsqft",
    "1000",
  ],
  [
    "mxsqft",
    "2500",
  ],
  [
    "sy[]",
    "cr",
  ],
  [
    "sy[]",
    "mo",
  ],
  [
    "bf[]",
    "cbn",
  ],
  [
    "bf[]",
    "wic",
  ],
  [
    "kf[]",
    "nok",
  ],
  [
    "kf[]",
    "peb",
  ],
  [
    "os[]",
    "blc",
  ],
  [
    "os[]",
    "brz",
  ],
  [
    "mf[]",
    "emn",
  ],
  [
    "mf[]",
    "wca",
  ],
  [
    "p",
    "1",
  ],
  [
    "s",
    "MOST_POPULAR",
  ],
]
`)
  })

  it.todo(
    'should correctly include minimum and maximum dimensions in the form data',
  )

  it.todo(
    'should correctly convert all combinations of single and multiple selections across all parameter categories',
  )

  it.todo(
    'should handle minimum values for each numeric parameter (e.g., mnsqft, mxsqft)',
  )

  it.todo(
    'should handle maximum values for each numeric parameter (e.g., mnsqft, mxsqft)',
  )

  it.todo(
    'should handle values just below the minimum and just above the maximum boundaries for numeric parameters',
  )

  // Feature-Specific Combinations:

  it.todo(
    'should correctly convert single, multiple, and all possible combinations of architecture styles',
  )

  it.todo(
    'should correctly convert various combinations of bedroom/bathroom features',
  )

  it.todo('should correctly convert combinations of kitchen features')

  it.todo('should correctly convert combinations of outdoor features')

  it.todo('should correctly convert combinations of other features')

  // Edge Cases:

  it.todo(
    'should exclude parameters with invalid feature names (e.g., "xyz") from the form data',
  )

  it.todo(
    'should handle parameters with incorrect data types (e.g., a string for a numeric field) and provide appropriate error handling',
  )

  it.todo('should exclude parameters with undefined values from the form data')

  it.todo(
    'should correctly convert truthy and falsy values for boolean parameters in the form data',
  )

  // Additional Considerations (if applicable):

  it.todo(
    'should maintain the correct order of parameters in the form data (if order matters)',
  )

  it.todo(
    'should correctly encode parameter values that require special encoding (if applicable)',
  )
})
