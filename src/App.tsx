import {
  Switch,
  Route,
  Router as WouterRouter,
  useLocation,
} from "wouter";
import { lazy, Suspense, useEffect, useState } from "react";
import Home from "@/pages/index";
import Order from "@/pages/order";
import Delivery from "@/pages/delivery";
import NotFound from "@/pages/not-found";
import PrivacyPolicy from "@/pages/privacy-policy";
import Terms from "@/pages/terms";

const Toaster = lazy(() =>
  import("@/components/ui/toaster").then((mod) => ({
    default: mod.Toaster,
  })),
);

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/order" component={Order} />
      <Route path="/privacy-policy" component={PrivacyPolicy} />
      <Route path="/delivery" component={Delivery} />
      <Route path="/terms" component={Terms} />
      <Route component={NotFound} />
    </Switch>
  );
}

function ScrollToTop() {
  const [location] = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [location]);

  useEffect(() => {
    if (!("scrollRestoration" in window.history)) return;

    const previousValue = window.history.scrollRestoration;
    window.history.scrollRestoration = "manual";

    return () => {
      window.history.scrollRestoration = previousValue;
    };
  }, []);

  return null;
}

function App() {
  const [showToaster, setShowToaster] = useState(false);

  useEffect(() => {
    document.documentElement.classList.add('dark');
    const id = window.setTimeout(() => setShowToaster(true), 1200);
    return () => window.clearTimeout(id);
  }, []);

  return (
    <>
      <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
        <ScrollToTop />
        <Router />
      </WouterRouter>
      {showToaster && (
        <Suspense fallback={null}>
          <Toaster />
        </Suspense>
      )}
    </>
  );
}

export default App;
