import {
  Switch,
  Route,
  Router as WouterRouter,
  useLocation,
} from "wouter";
import { lazy, Suspense, useEffect, useState } from "react";
import Home from "@/pages/index";

const Order = lazy(() => import("@/pages/order"));
const Delivery = lazy(() => import("@/pages/delivery"));
const NotFound = lazy(() => import("@/pages/not-found"));
const PrivacyPolicy = lazy(() => import("@/pages/privacy-policy"));
const Terms = lazy(() => import("@/pages/terms"));

const Toaster = lazy(() =>
  import("@/components/ui/toaster").then((mod) => ({
    default: mod.Toaster,
  })),
);

function Router() {
  return (
    <Suspense
      fallback={
        <div
          className="min-h-screen bg-background"
          aria-busy="true"
          aria-live="polite"
        />
      }
    >
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/order" component={Order} />
        <Route path="/privacy-policy" component={PrivacyPolicy} />
        <Route path="/delivery" component={Delivery} />
        <Route path="/terms" component={Terms} />
        <Route component={NotFound} />
      </Switch>
    </Suspense>
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
