import { DashboardContentLayout } from "./content.layout";
import { DashboardFooterLayout } from "./footer.layout";
import DashboardHeaderLayout from "./header.layout";
import { DashboardMainContentLayout } from "./main.layout";
import DashboardRootLayout from "./root.layout";
import { SidebarLayout } from "./sidebar.layout";

export const DashboardLayout = Object.assign(
  DashboardRootLayout,
  {
    Header: DashboardHeaderLayout,
    content: DashboardContentLayout,
    Sidebar: SidebarLayout,
    Main: DashboardMainContentLayout,
    footer: DashboardFooterLayout
  },
)

