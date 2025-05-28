import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar';
import AppSideBar from '../components/AppSideBar';
import Editor from '../components/Editor';

export default function MainPage() {
  return (
    <div className="h-screen flex">
      <SidebarProvider>
        <AppSideBar />
        <SidebarInset className="flex-1 overflow-hidden">
          <Editor />
        </SidebarInset>
      </SidebarProvider>
    </div>
  );
}