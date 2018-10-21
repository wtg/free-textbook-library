const jwt = require('jsonwebtoken')
const User = require('../user/user.model')

// // // //

// POST /api/auth/register
// { username, password }
exports.register = (req, res) => {

    // Pulls parameters from req.body
    const { name, username, password, email } = req.body

    // Create a new User instance if one does not exist
    const create = (user) => {
        // User exists - throw error and return
        if (user) {
            throw new Error('username exists')
            return
        }

        // Creates a new User
        return User.create({ name, email, username, password })
    }

    // Respond to the client
    const respond = (user) => {
        res.json({
            message: 'Registered Successfully.'
        })
    }

    // Handle error (username exists)
    const onError = (error) => {
        res.status(409).json({
            message: error.message
        })
    }

    // check username duplication
    User.findOneByUsername(username)
    .then(create)
    .then(respond)
    .catch(onError)
}

// // // //

// POST /api/auth/login
// { username, password }
exports.login = (req, res) => {

    // Gathers username, password
    const { name, email, username, password } = req.body

    // check the user info & generate the jwt
    // Ensures presence of the User in the database
    // Verifies the supplied password against the database
    const check = (user) => {

        // User does NOT exist
        if(!user){

            // Invalid password
            throw new Error('Login failed - user does not exist.')
            return
        }

        // User does exists - verify the password parameter
        if (!user.verify(password)) {

            // Invalid password
            throw new Error('Login failed - invalid password.')
            return
        }

        // Assembles JWT User Payload
        const jwt_paylod = {
            id: user._id.toString(),
            name: user.name,
            admin: user.admin,
            email: user.email,
            username: user.username,
            iat: Date.now() // Issued At
        }

        // JWT Options
        const jwt_options = {
            expiresIn: '7d', // TODO - should these be abstracted into ENV?
            issuer: 'eb.com', // TODO - should issuer be included with Boilerplate?
            subject: 'user_info',
        }

        // TODO - assign 'alg' to JWT options?
        // alg: ''

        // Return a Promise to handle asynchronous JWT generation
        return new Promise((resolve, reject) => {

            // Defines callback to JWT
            const jwtCallback = (err, token) => {
                if (err) return reject(err)
                resolve({ token, user })
            }

            // Signs & encrypts the JWT - generates the web token
            jwt.sign(jwt_paylod, process.env.JWT_SECRET, jwt_options, jwtCallback)

        })
    }

    // Responds with user's authorization payload
    const respond = ({ token, user }) => {

        // Isolates the User's ID to be used as a key
        // in Redis for { user_id: token } records
        let user_id = user._id.toString() // MongoDB

        // Assembles response_payload
        const response_payload = {
            _id: user_id,
            username: user.username,
            name: user.name,
            email: user.email,
            admin: user.admin,
            roles: user.roles,
            token: token
        };

        // TODO - abstract HEADER
        const CONTENT_TYPE_JSON = { 'Content-Type': 'application/json' };

        // 200 OK - send token to client
        res.writeHead(200, CONTENT_TYPE_JSON);
        res.end(JSON.stringify(response_payload));
        return;
    }

    // error occured
    const onError = (error) => {
        res.status(403).json({
            message: error.message
        })
    }

    // Find the user
    User.findOneByUsername(username)
    .then(check)
    .then(respond)
    .catch(onError)

}

// // // //

// POST /api/auth/reset_password
exports.reset_password = (req, res) => {
    console.log('TODO - reset password logic')
    // Password reset workflow (option A):
    // 1 - Fetch User -> User.findByUsername(req.user.username)
    // 2 - Generate RandomPassword
    // 3 - Email RandomPassword to User.email
    // 4 - Assign User.password = RandomPassword
}
