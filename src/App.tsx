import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NotFound from "./pages/NotFound";
import { MirrorHomeScreen } from "./mirror/screens/MirrorHomeScreen";
import { MirrorHomeCompositeScreen } from "./mirror/screens/MirrorHomeCompositeScreen";
import { MirrorInboxListScreen } from "./mirror/screens/MirrorInboxListScreen";
import { MirrorFeedbackConfirmationScreen } from "./mirror/screens/MirrorFeedbackConfirmationScreen";
import { MirrorClickFixConfirmationScreen } from "./mirror/screens/MirrorClickFixConfirmationScreen";
import { MirrorLanguageSelectionScreen } from "./mirror/screens/MirrorLanguageSelectionScreen";
import { MirrorSettingsScreen } from "./mirror/screens/MirrorSettingsScreen";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MirrorHomeScreen />} />
          <Route path="/mirror" element={<MirrorHomeScreen />} />
          <Route path="/mirror/home" element={<MirrorHomeCompositeScreen />} />
          <Route path="/mirror/inbox" element={<MirrorInboxListScreen />} />
          <Route path="/mirror/feedback-confirmation" element={<MirrorFeedbackConfirmationScreen />} />
          <Route path="/mirror/clickfix-confirmation" element={<MirrorClickFixConfirmationScreen />} />
          <Route path="/mirror/language" element={<MirrorLanguageSelectionScreen />} />
          <Route path="/mirror/settings" element={<MirrorSettingsScreen />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
