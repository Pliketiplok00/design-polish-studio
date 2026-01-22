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
import { MirrorEventsScreen } from "./mirror/screens/MirrorEventsScreen";
import { MirrorTransportHubScreen } from "./mirror/screens/MirrorTransportHubScreen";
import { MirrorContactsListScreen } from "./mirror/screens/MirrorContactsListScreen";
import { MirrorContactDetailScreen } from "./mirror/screens/MirrorContactDetailScreen";
import { MirrorInfoHubScreen } from "./mirror/screens/MirrorInfoHubScreen";
import { MirrorEventDetailScreen } from "./mirror/screens/MirrorEventDetailScreen";
import { MirrorRoadLineDetailScreen } from "./mirror/screens/MirrorRoadLineDetailScreen";
import { MirrorSeaLineDetailScreen } from "./mirror/screens/MirrorSeaLineDetailScreen";

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
          <Route path="/mirror/events" element={<MirrorEventsScreen />} />
          <Route path="/mirror/events/:eventId" element={<MirrorEventDetailScreen />} />
          <Route path="/mirror/transport" element={<MirrorTransportHubScreen />} />
          <Route path="/mirror/transport/road" element={<MirrorRoadLineDetailScreen />} />
          <Route path="/mirror/transport/sea" element={<MirrorSeaLineDetailScreen />} />
          <Route path="/mirror/contacts" element={<MirrorContactsListScreen />} />
          <Route path="/mirror/contacts/:contactId" element={<MirrorContactDetailScreen />} />
          <Route path="/mirror/info" element={<MirrorInfoHubScreen />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
