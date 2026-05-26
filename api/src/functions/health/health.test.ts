import { mockHttpEvent, mockContext } from '@redwoodjs/testing/api'

import { handler } from './health'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-functions

describe('health function', () => {
  it('Should respond with 200', async () => {
    const httpEvent = mockHttpEvent()

    const response = await handler(httpEvent, mockContext())
    const body = JSON.parse(response.body)

    expect(response.statusCode).toBe(200)
    expect(body).toEqual({
      ok: true,
      service: 'boardgames-its',
    })
  })
})
