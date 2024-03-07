import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import AiAssistant from "pages/AiAssistant";
import HomePage from "pages/HomePage";
import LoginPage from "pages/LoginPage";
import ProfilePage from "pages/ProfilePage";
import RegisterPage from "pages/RegisterPage";
import ResetPasswordPage from "pages/ResetPasswordPage";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet, Route, Routes } from "react-router-dom";
import { themeSettings } from "theme";

function MissingRoute() {
  return <Navigate to="/" replace />;
}
function LayoutCheck() {
  const user = useSelector((state) => state.user);

  return user?.token ? <Outlet /> : <Navigate to="/login" replace />;
}
function StopBack() {
  const user = useSelector((state) => state.user);

  return user?.token ? <Navigate to="/" replace /> : <Outlet />;
}

function App() {
  const { mode } = useSelector((state) => state.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  return (
    <div className="app">
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Routes>
          <Route element={<LayoutCheck />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/assistant" element={<AiAssistant />} />
            <Route path="/profile/:id?" element={<ProfilePage />} />
          </Route>
          <Route element={<StopBack />}>
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/reset-password" element={<ResetPasswordPage />} />
          </Route>
          {/* page-not-found route */}
          <Route path="*" element={<MissingRoute />} />
        </Routes>
      </ThemeProvider>
    </div>
  );
}

export default App;
