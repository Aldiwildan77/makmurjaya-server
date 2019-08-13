const nodemailer = require('nodemailer')
const uuidv4 = require('uuid/v4')
const bycrpt = require('bcrypt')
const _ = require('lodash')

const { Op, Karyawan, Recovery } = require('../../models')
const { NODE_ENV, MAILER } = require('../../config/config')

const sendMail = async (email, token) => {
  let transporter = await nodemailer.createTransport({
    host: MAILER.HOST,
    port: MAILER.PORT,
    auth: {
      user: MAILER.USER,
      pass: MAILER.PASS
    }
  })

  let domain = NODE_ENV === 'production' ? '' : 'localhost:5015'
  let link = `http://${domain}/reset/${token}`

  let message = {
    from: MAILER.USER,
    to: email,
    subject: 'MakmurJaya - Recovery Password',
    html: `<h1>Hi, welcome to MakmurJaya</h1>
    <p>To recover your account, please click the Recovery bellow</p>
    <div style="margin-top: 38px;
    margin-bottom: 8px;" >
    <a style="padding: 10px 20px;
    border-radius: 10px;
    color: white;
    background: #00BCD4;
    text-decoration: none;" href=${link}>Recover Account</a>
    </div>
    <br />
    <p>or if it is not working you can just copy this link and paste it into your browser</p>
    ${link}`
  }

  return await new Promise((resolve, reject) => {
    transporter.sendMail(message, (error, info) => {
      if (error) {
        reject(error)
      } else {
        resolve(info.response)
      }
    })

    transporter.close()
  })
}

const forgotPassword = async ({ input }, context) => {
  if (_.isEmpty(input) || _.isUndefined(input)) throw new Error('Input can\'t be a null or undefined value')

  try {
    let token = await uuidv4()
    const checkUser = await Karyawan.findOne({
      attributes: {
        exclude: ['password', 'createdAt', 'updatedAt']
      },
      where: {
        [Op.or]: [{ email: { [Op.eq]: input } },
        { username: { [Op.eq]: input } }]
      }
    })
    if (!checkUser) {
      throw new Error('User doesn\'t exist, please check your username or email')
    }

    const insertRecovery = await Recovery.create({
      token: token,
      recoveryExpired: Date.now() + 1800000,
      karyawan_id: checkUser.id
    })

    await insertRecovery.save()
    const response = await sendMail(checkUser.email, token)
    if (!response) {
      throw new Error('Failed to send mail')
    }

    return 'Reset password token sended successfully, please check your email'
  } catch (error) {
    throw error
  }
}

const resetPassword = async ({ token, input }, context) => {
  if ((input.password).length < 8 || (input.password).length > 15) {
    throw new Error('Passwords must be at 8 - 15 characters in length')
  }

  if (!_.isEqual(input.password, input.confirmPassword)) {
    throw new Error('Confirmation password doesn\'t match with password')
  }

  try {
    const hashedPassword = await bycrpt.hash(input.password, 12)
    const checkToken = await Recovery.findOne({ where: { token: { [Op.eq]: token } } })
    if (!checkToken) {
      throw new Error('Recovery token doesn\'t exist')
    }

    let exp = new Date(checkToken.recoveryExpired).getTime()
    let now = new Date(Date.now()).getTime()

    if (exp < now) {
      throw new Error('Your token is expired, please re-send your recovery request again')
    }

    const [numOfAffectedRow, updatedKaryawan] = await Karyawan.update({ password: hashedPassword }, {
      where: {
        id: {
          [Op.eq]: checkToken.karyawan_id
        }
      },
      returning: true
    })

    if (!updatedKaryawan) {
      throw new Error('Failed to update Karyawan please check your input')
    }

    await Recovery.destroy({ where: { karyawan_id: { [Op.eq]: checkToken.karyawan_id } } })

    return 'Your password has been changed successfully'
  } catch (error) {
    throw error
  }
}

module.exports = { forgotPassword, resetPassword }
