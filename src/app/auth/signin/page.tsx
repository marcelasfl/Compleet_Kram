'use client'

import SingInForm from '@/components/Forms/SignInForm'
import { Logo } from '@/components/Logo'
import { useAuthStore } from '@/hooks/Store/useAuthStore'
import { AuthLayout as Layout } from '@layouts/auth'
import { Flex } from 'antd'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function SigninPage() {
  const Router = useRouter()
  const { signIn, isAuthenticated, inAuthentication } = useAuthStore()

  useEffect(() => {
    if (isAuthenticated) Router.push('/dashboard')
  }, [Router, isAuthenticated])

  return (
    <Layout>
      <Layout.Content className="flex flex-col">
        <Flex>
          <Logo width={254} height={124} />
        </Flex>

        <Flex className="min-w-[400px] h-auto p-3" vertical>
          <SingInForm onSubmit={signIn} inSubmit={inAuthentication} />
        </Flex>
      </Layout.Content>
    </Layout>
  )
}
