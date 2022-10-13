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
    viewed: number | null;
  }
  interface PathType {
    lat: number,
    lng: number
  }
  interface Audio {
    id: number,
    location: PathType,
    audioFile: string,
    imageFile: string,
    notes: string,
    transcript: string
  }
  interface ImageInfo {
    path_name: string,
    image: string,
    imageUrl: string
  }
}

export {};
