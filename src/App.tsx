import { Switch, Route, Router as WouterRouter } from "wouter";
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
