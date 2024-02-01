import { User } from '@validations/user.validations'
import { SignInData } from '../validations/singIn.validations'
import api from './api'

export type SignInRequestData = {
  email: string
  password: string
}

export type signInRequestResult = {
  autenticated: true,
  date_activated: string,
  date_expiration_access_token: string,
  date_expiration_refresh_token: string,
  access_token: string,
  refresh_token: string,
  message: string
}

export type SignUpRequestData = {
  name: string
  password_confirmation: string
} & SignInRequestData

export async function signInRequest(
  signInData: SignInData,
): Promise<signInRequestResult> {
  const { data } = await api.post<signInRequestResult>('api/login', signInData)
  return data
}

export async function signUpRequest(signUpData: SignUpRequestData) {
  const { data } = await api.post<string>('auth/register', signUpData)
  return data
}

export async function recoverUserInformation() {
  return {
    user: {
      name: '',
      email: '',
      avatar_url: '',
    } as unknown as User,
  }
}

//export async function si(
//signInData: SignInData,
//): Promise<signInRequestResult> {
//const { data } = await api.post<signInRequestResult>('api/login', signInData)
//return data
//}


