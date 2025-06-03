import { AppSidebar } from "@/view/components/AppSideBar"
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar"
import Editor from "../components/Editor"

export default function MainPage() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <Editor />
      </SidebarInset>
    </SidebarProvider>
  )
}
