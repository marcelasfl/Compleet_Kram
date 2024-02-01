import { InternalRouteType } from "antd/es/breadcrumb/Breadcrumb"
import { LinkProps } from "next/link"


export const AUTH_TOKEN_NAME = 'app-token'
export const AUTH_SIGN_IN_PATH = '/auth/signin' satisfies LinkProps<InternalRouteType>['href'] 