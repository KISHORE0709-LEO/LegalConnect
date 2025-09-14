export type AuthMode = "login" | "signup";

export const openAuth = (mode: AuthMode = "login") => {
  window.dispatchEvent(new CustomEvent("open-auth", { detail: { mode } }));
};

// Event bus for cross-component communication
class EventBus {
  private events: { [key: string]: Function[] } = {};

  emit(event: string, data?: any) {
    if (this.events[event]) {
      this.events[event].forEach(callback => callback(data));
    }
  }

  on(event: string, callback: Function) {
    if (!this.events[event]) {
      this.events[event] = [];
    }
    this.events[event].push(callback);
  }

  off(event: string, callback: Function) {
    if (this.events[event]) {
      this.events[event] = this.events[event].filter(cb => cb !== callback);
    }
  }
}

export const eventBus = new EventBus();
