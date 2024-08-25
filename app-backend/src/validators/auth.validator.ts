import { check, type ValidationChain } from 'express-validator'

export default [
    check(
      'password',
      'Password of user should be more 5'
    ).isLength({ min: 5 }),
    check('email', 'Email must contain @').isEmail(),
]
