export interface Movie {
  Title: string;
  Year: string;
  imdbID: string;
  Type: string;
  Poster: string;
}

export interface MovieDetail extends Movie {
  Rated: string;
  Released: string;
  Runtime: string;
  Genre: string;
  Director: string;
  Writer: string;
  Actors: string;
  Plot: string;
  Language: string;
  Country: string;
  Awards: string;
  Ratings: { Source: string; Value: string }[];
  Metascore: string;
  imdbRating: string;
  imdbVotes: string;
}

export interface SearchResponse {
  Search?: Movie[];
  totalResults?: string;
  Response: 'True' | 'False';
  Error?: string;
}

export interface UserContextType {
  userEmail: string | null;
  login: (email: string) => void;
  logout: () => void;
}