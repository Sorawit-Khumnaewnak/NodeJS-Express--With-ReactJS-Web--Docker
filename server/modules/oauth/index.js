const _ = require("lodash")
const bcrypt = require("bcrypt-nodejs")
const config = require('../../config')
const { User } = require("../../models/userDB")


const oAuth = () => {
  const checkToken = async (token) => {
    try {
      return await User.findByToken(token)
    } catch (e) {
      throw e
    }
  }

  const findByID = async (id) => {
    try {
      let result = {}
      const user = await User.findOne({_id: id})
      if (user){
        result = user.toJSON()
      }
      return result
    } catch (e) {
      throw (e)
    }
  }

  const signin = async (email, password, client_id, client_secret) => {
    try {
      if (config.oauth.client_id !== client_id || config.oauth.client_secret !== client_secret){
        throw Error ("The 'client_id' or 'client_secret' is worong!")
      }
      const getUser = await User.findOne({email: email.toLocaleLowerCase()})
      await validPassword(getUser.password, password)
      const newToken = await getUser.generateAuthToken()
      if (!newToken){
        throw Error ("Username or Password is not correct")
      }
      const result = getUser.toJSON()
      result.token = newToken
      return result
    } catch (e) {
      throw e
    }
  }

  const validPassword = async (hashPassword, password) => {
    try {
      if (bcrypt.compareSync(password, hashPassword) === false) {
        throw new Error("The password is worong!")
      }
      return true
    } catch (e) {
      throw Error (e)
    }
  }

  const generateHash = async (password) => {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8) + config.oauth.client_secret, null)
  }

  return {
    checkToken,
    signin,
    findByID,
  }
}

module.exports = oAuth()