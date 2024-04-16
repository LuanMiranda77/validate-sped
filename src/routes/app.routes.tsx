import React, { ReactNode, Suspense } from "react";
import { BrowserRouter, HashRouter, Route, Routes } from "react-router-dom";
//nossos imports
import { FaCashRegister } from "react-icons/fa";
import { Layout } from "../components/Layout";
import { Notfound } from "../module/Notfound";
import Home from "../module/home";
import { isElectron } from "../utils";

interface Props {
  setDefaultTheme(): void;
}

interface RouteApp {
  name: string;
  path: string;
  element: () => ReactNode;
  icon?: ReactNode;
}

export const routesApp: RouteApp[] = [
  {
    name: "",
    path: "/",
    element: () => <Home />,
  },
  {
    name: "inicio",
    path: "/home",
    element: () => <Home />,
    icon: <FaCashRegister className="btn-menu" />,
  },
  {
    name: "inicio",
    path: "*",
    element: () => <Notfound />,
  },
];

const AppRoutes: React.FC<Props> = ({ setDefaultTheme }) => {
  const isDesk = isElectron();
  return (
    <>
      {isDesk ? (
        <HashRouter>
          <Layout alterTheme={setDefaultTheme}>
            <Suspense fallback={<div className="">Carregando....</div>}>
              <Routes>
                {routesApp.map((route, key) => (
                  <Route key={key} path={route.path} element={route.element()} />
                ))}
              </Routes>
            </Suspense>
          </Layout>
        </HashRouter>
      ) : (
        <BrowserRouter>
          <Layout alterTheme={setDefaultTheme}>
            <Suspense fallback={<div className="">Carregando....</div>}>
              <Routes>
                {routesApp.map((route, key) => (
                  <Route key={key} path={route.path} element={route.element()} />
                ))}
              </Routes>
            </Suspense>
          </Layout>
        </BrowserRouter>
      )}
    </>
  );
};
export default AppRoutes;
