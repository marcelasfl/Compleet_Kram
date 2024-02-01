'use client'

import UserForm from '@/components/Forms/UserForm'
import useUserMutation from '@/hooks/Mutations/useUserMutation'
import { User } from '@/validations/user.validations'

export default function AddUserPage() {
  const { mutateAsync: addUser } = useUserMutation()

  async function handleSubmit(data: User) {
    await addUser({ data })
  }

  return <UserForm onSubmit={handleSubmit} />
}
