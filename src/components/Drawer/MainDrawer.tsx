import { Drawer, DrawerProps, Flex } from 'antd'
import { Logo } from '../Logo'
import MainMenu from '../Menus/MainMenu'

type MainDrawerProps = DrawerProps

export function MainDrawer({ ...props }: MainDrawerProps) {
  return (
    <Drawer
      closable={false}
      placement="left"
      styles={{
        body: {
          padding: 0,
        },
      }}
      width={256}
      {...props}
    >
      <Flex align="center" justify="center">
        <Logo size={64} />
      </Flex>
      <MainMenu />
    </Drawer>
  )
}
