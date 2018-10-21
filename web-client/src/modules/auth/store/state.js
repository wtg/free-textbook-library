
// Auth Module State
export default {
  token: localStorage.token || '',
  fetching: false,
  logging_in: false,
  current_user: {},
  login_user: {
    username: 'johndoe',
    email: 'john@doe.com',
    password: 'abc123',
    errors: {}
  },
  register_user: {
    name: 'John Doe',
    email: 'john@doe.com',
    username: 'johndoe',
    password: 'abc123',
    passwordverify: 'abc123',
    errors: {}
  }
}
