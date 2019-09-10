
import {update} from '../getUser'

describe('update', () => {
  it('should return null when the action is logout or fail', () => {
    const creds = update({username: 'olduser'}, {action: 'fail'})
    expect(creds.username).toBeFalsy()
  })

  it('should do nothing when there is no action, regardless of the new username', () => {
    const creds = update({username: 'olduser'}, {username: 'newuser'})
    expect(creds.username).toEqual('olduser')
  })

  it('should update the username when the action is signup or login', () => {
    const creds = update({username: 'olduser'}, {username: 'newuser', action: 'signup'})
    expect(creds.username).toEqual('newuser')
  })
})
