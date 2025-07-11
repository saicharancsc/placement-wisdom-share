
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/hooks/useAuth";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import LikedPosts from "./pages/LikedPosts";
import BlogPost from "./components/BlogPost";
import CreateBlog from "./components/CreateBlog";
import UserDashboard from "./components/UserDashboard";
import PublicUserProfile from "./components/PublicUserProfile";
import Bookmarks from "./pages/Bookmarks";
import Terms from "./pages/Terms";
import Privacy from "./pages/Privacy";
import ResetPassword from "./pages/ResetPassword";
import Admin from "./pages/Admin";
import Resources from "./pages/Resources";
import ResourceDetail from "./pages/ResourceDetail";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/blog/:id" element={<BlogPost />} />
            <Route path="/create" element={<CreateBlog />} />
            <Route path="/edit/:id" element={<CreateBlog />} />
            <Route path="/dashboard" element={<UserDashboard />} />
            <Route path="/profile/:userId" element={<PublicUserProfile />} />
            <Route path="/liked" element={<LikedPosts />} />
            <Route path="/bookmarks" element={<Bookmarks />} />
            <Route path="/resources" element={<Resources />} />
            <Route path="/resource/:id" element={<ResourceDetail />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
