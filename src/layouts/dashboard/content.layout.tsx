import { useDashboardLayoutStore } from '@/hooks/Store/useDashboardLayoutStore'
import { Layout } from 'antd'
import clsx from 'clsx'
import { MotionProps, motion } from 'framer-motion'

const { Content } = Layout

type DashboardContentLayoutProps = MotionProps

export function DashboardContentLayout({
  children,
  ...props
}: DashboardContentLayoutProps) {
  const { collapsed } = useDashboardLayoutStore()
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      className={clsx(
        'px-4 py-4 ms:py-6 sm:px-12 lg:py-6 lg:px-24 !rounded-lg ml-0 sm:ml-[200px]',
        {
          'sm:ml-[80px]': collapsed,
        }
      )}
      {...props}
    >
      {children}
    </motion.div>
  )
}
