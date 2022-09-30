declare global {
  interface RouteConfig {
    path: string;
    name: string;
    exact: boolean;
    Component: () => React.ReactElement;
    secured: boolean;
  }
  module '*.png'
}

export {};
