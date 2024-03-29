import axios from 'axios'
import { LOG_IN_ROUTE, ACCOUNT_ROUTE, SIGN_UP_ROUTE, FORGET_PASSWORD_ROUTE } from './api-routes'

export const sendLoginForm = async (formLogin: any) => {
  const { data } = await axios.post(LOG_IN_ROUTE, formLogin, {
    headers: {
      'Content-Type': 'application/json',
    },
  })
  return data
}

export const sendAccountForm = async (formAccount: any) => {
  const { data } = await axios.post(ACCOUNT_ROUTE, formAccount, {
    headers: {
      'Content-Type': 'application/json',
    },
  })
  return data
}

export const sendSignUpForm = async (formSignUp: any) => {
  const { data } = await axios.post(SIGN_UP_ROUTE, formSignUp, {
    headers: {
      'Content-Type': 'application/json',
    },
  })
  return data
}

export const sendPasswordForm = async (formPassword: any) => {
  const { data } = await axios.post(FORGET_PASSWORD_ROUTE, formPassword, {
    headers: {
      'Content-Type': 'application/json',
    },
  })
  return data
}
