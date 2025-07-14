import { TMovieFullDetail } from "@/data/zod/tmdb";
import { formatCurrency, formatDate, getLanguageFromCode } from "@/lib/utils";

import { Container } from "@/components/tmdb/container";
import { Card } from "@/components/ui/card";

type Props = {
  movie: TMovieFullDetail;
};

export const MovieDetailInfo = ({ movie }: Props) => {
  const language = getLanguageFromCode(movie.original_language);
  return (
    <Container label="Detail">
      <Card className="grid grid-cols-1 p-4 md:grid-cols-2">
        <div className="flex flex-col space-y-2">
          <h1 className="font-semibold">
            Status:
            <span className="text-muted-foreground pl-2 font-normal">
              {movie.status}
            </span>
          </h1>
          <h1 className="font-semibold">
            Release Date:
            <span className="text-muted-foreground pl-2 font-normal">
              {movie.release_date && formatDate(movie.release_date)}
            </span>
          </h1>
          <h1 className="font-semibold">
            Original Language:
            <span className="text-muted-foreground pl-2 font-normal">
              {movie.original_language && language.name}
            </span>
          </h1>
          <h1 className="font-semibold">
            Budget:
            <span className="text-muted-foreground pl-2 font-normal">
              {movie.budget === 0 ? "-" : formatCurrency(movie.budget)}
            </span>
          </h1>
          <h1 className="font-semibold">
            Revenue:
            <span className="text-muted-foreground pl-2 font-normal">
              {movie.revenue === 0 ? "-" : formatCurrency(movie.revenue)}
            </span>
          </h1>
          <h1 className="font-semibold">
            Production Companies:
            <span className="text-muted-foreground pl-2 font-normal">
              {movie.production_companies &&
                movie.production_companies
                  .map((company) => `${company.name}`)
                  .join(", ")}
            </span>
          </h1>
          <h1 className="font-semibold">
            Countries:
            <span className="text-muted-foreground pl-2 font-normal">
              {movie.production_countries &&
                movie.production_countries
                  .map((country) => `${country.name}`)
                  .join(", ")}
            </span>
          </h1>
          <h1 className="font-semibold">
            Spoken Language:
            <span className="text-muted-foreground pl-2 font-normal">
              {movie.spoken_languages &&
                movie.spoken_languages.map((lang) => `${lang.name}`).join(", ")}
            </span>
          </h1>
        </div>
        <div className="flex flex-col space-y-8">
          <div className="flex flex-col space-y-2">
            <h1 className="font-semibold">Tagline:</h1>
            <p className="text-muted-foreground border-l-primary border-l-4 px-4 italic">
              {movie.tagline !== "" ? movie.tagline : "-"}
            </p>
          </div>
          <div className="flex flex-col space-y-2">
            <h1 className="font-semibold">Overview:</h1>
            <p className="text-muted-foreground">
              {movie.overview !== "" ? movie.overview : "-"}
            </p>
          </div>
        </div>
      </Card>
    </Container>
  );
};
