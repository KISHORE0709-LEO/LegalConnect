export type AuthMode = "login" | "signup";

export const openAuth = (mode: AuthMode = "login") => {
  window.dispatchEvent(new CustomEvent("open-auth", { detail: { mode } }));
};
