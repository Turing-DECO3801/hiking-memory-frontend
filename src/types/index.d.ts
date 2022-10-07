declare global {
  interface RouteConfig {
    path: string;
    name: string;
    exact: boolean;
    Component: () => React.ReactElement;
    secured: boolean;
  }
  module '*.png'
  interface HikeData {
    id: number,
    email: string,
    gps_logs: string,
    distance: number | null,
    start_time: string,
    end_time: string,
    path_name: string | null,
    favourite: number,
    date: Date
  }
}

export {};
