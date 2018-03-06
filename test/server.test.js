const request = require('supertest'),
  bcrypt = require('bcryptjs'),
  app = require('../server'),
  User = require('../server/models/user'),
  AccessToken = require('../server/models/acess-token')


describe('# Authentication Route', () => {
  const loggingUser = {
    email: 'cyrikxz.ph@gmail.com',
    password: 'password123'
  }

  beforeEach((done) => {
    User.remove({})
      .then(() => {
        const user = new User(loggingUser)
        return user.save()
      })
      .then(() => {
        return AccessToken.remove({})
      })
      .then(() => done())
  })

  describe('POST /api/auth/register', () => {
    test('should register new user', (done) => {
      const newUser = {
        email: 'aleson.llanes@carvepacket.com',
        password: 'password123'
      }
      request(app)
        .post('/api/register')
        .send(newUser)
        .expect(200)
        .expect((res) => {
          expect(res.header).toHaveProperty('x-auth-token')
          expect(res.body.data.email).toBe(newUser.email)
        })
        .end((err, res) => {
          if (err) {
            return done(err)
          }

          User.find({ email: newUser.email})
            .then((users) => {
              expect(users.length).toBe(1)
              expect(users[0].email).toBe(newUser.email)
              done()
            })
            .catch((e) => done(e))
        })
    })

    test('should not register with email already exists', (done) => {
      request(app)
        .post('/api/register')
        .send(loggingUser)
        .expect(400)
        .expect((res) => {
          expect(res.header).not.toHaveProperty('x-auth-token')
          expect(res.body.success).toBe('false')
        })
        .end(done)
    })
  })

  describe('POST /api/auth/login', () => {
    test('should login user', (done) => {
      request(app)
        .post('/api/login')
        .send(loggingUser)
        .expect(200)
        .expect((res) => {
          expect(res.header).toHaveProperty('x-auth-token')
        })
        .end(done)
    })

    test('should login fail if invalid email', (done) => {
      request(app)
        .post('/api/login')
        .send({
          email: 'invalid@me.com',
          password: loggingUser.password,
        })
        .expect(403)
        .expect((res) => {
          expect(res.header).not.toHaveProperty('x-auth-token')
          expect(res.body.success).toBe('false')
        })
        .end(done)
    })
    test('should login fail if invalid password', (done) => {
      request(app)
        .post('/api/login')
        .send({
          email: loggingUser.email,
          password: 'invalidPassw0rd'
        })
        .expect(403)
        .expect((res) => {
          expect(res.header).not.toHaveProperty('x-auth-token')
          expect(res.body.success).toBe('false')
        })
        .end(done)
    })
  })
})

describe('# Users Route', () => {

  const loggingUser = {
    email: 'cyrikxz.ph@gmail.com',
    password: 'password123'
  }

  beforeEach((done) => {
    User.remove({})
      .then(() => {
        const user = new User(loggingUser)
        return user.save()
      })
      .then((user) => {
        return AccessToken.remove({})
          .then(() => {
            return user
          })
      })
      .then((user) => {
        return user.generateAuthToken()
      })
      .then((token) => {
        loggingUser['token'] = token
      })
      .then(() => done())
  })

  describe('POST /api/user/logout', () => {
    test('should logout user', (done) => {
      request(app)
        .post('/api/users/logout')
        .set('x-auth-token', loggingUser.token)
        .expect(200)
        .end((err, res) => {
          if (err) {
            done(err)
          }
          User.findOne({ email: loggingUser.email})
            .then((user) => {
              return AccessToken.count({
                userId: user._id,
                token: loggingUser.token
              })
            })
            .then((count) => {
              expect(count).toBe(0)
              done()
            })
            .catch((err) => done(err))
        })
    })

    test('should get unauthorized for invalid / inactive token', (done) => {
      request(app)
        .post('/api/users/logout')
        .set('x-auth-token', 'THISISANINVALIDTOKEN')
        .expect(401, done)
    })
  })

  describe('POST /api/user/change-password', () => {
    test('should change user\'s password', (done) => {
      const newPassword = 'password321'
      request(app)
        .post('/api/users/change-password')
        .set('x-auth-token', loggingUser.token)
        .send({
          oldPassword: loggingUser.password,
          newPassword,
        })
        .expect((res) => {
          expect(res.body.success).toBe('true')
        })
        .expect(200)
        .end((err, res) => {
          if (err) return done(err)

          User.findOne({email: loggingUser.email})
            .then((user) => {
              return bcrypt.compare(newPassword, user.password)
            })
            .then((result) => {
              console.log(result)
              expect(result).toBeTruthy()
              done()
            })
            .catch((err) => done(err))
        })
    })

    test('should not change password if invalid old password', (done) => {
      const newPassword = 'password321'
      request(app)
        .post('/api/users/change-password')
        .set('x-auth-token', loggingUser.token)
        .send({
          oldPassword: 'invalid0ldPa$$word',
          newPassword,
        })
        .expect(400, done)
    })
  })
})