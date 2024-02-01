'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { ReactQueryStreamedHydration } from '@tanstack/react-query-next-experimental'
import { ConfigProvider } from 'antd'
import React, { useState } from 'react'

export function Providers(props: { children: React.ReactNode }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 1,
          },
        },
      })
  )

  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryStreamedHydration>
        <ConfigProvider
          theme={{
            token: {
              borderRadius: 4,
              borderRadiusLG: 4,
              colorBgLayout: '#f1f2f5',
            },
          }}
        >
          {props.children}
        </ConfigProvider>
      </ReactQueryStreamedHydration>
      {<ReactQueryDevtools initialIsOpen={false} />}
    </QueryClientProvider>
  )
}
