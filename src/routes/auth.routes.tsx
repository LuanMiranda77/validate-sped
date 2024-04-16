import React, { Suspense } from "react";
import { BrowserRouter, HashRouter, Route, Routes } from "react-router-dom";
//nossos imports
import { createBrowserHistory, createHashHistory } from "history";
import { ModalExample } from "../components/modal_example";
import { ThemeContext } from "../hooks/theme";
import { Notfound } from "../module/Notfound";
import Login from "../module/authenticate/pages/Login";
import RecuperaSenha from "../module/authenticate/pages/RecuperaSenha";
import { isElectron } from "../utils";

const AuthRoutes: React.FC = () => {
  const root = ThemeContext.ThemeProvider();
  const history = isElectron() ? createHashHistory() : createBrowserHistory();
  return (
    <>
      {history ? (
        <HashRouter>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/recupera-senha" element={<RecuperaSenha />} />
            <Route path="/login" element={<Login />} />
            <Route path="*" element={<Notfound />} />
            <Route path="/develop-tools" element={<ModalExample />} />
          </Routes>
        </HashRouter>
      ) : (
        <BrowserRouter>
          <Suspense fallback={<div className="">Carregando....</div>}>
            <Routes>
              <Route path="/" element={<Login />} />
              <Route path="/recupera-senha" element={<RecuperaSenha />} />
              <Route path="/login" element={<Login />} />
              <Route path="*" element={<Notfound />} />
              <Route path="/develop-tools" element={<ModalExample />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      )}
    </>
  );
};
export default AuthRoutes;
