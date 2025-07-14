import { convertGender, countAge, formatDate } from "@/lib/utils";

import { Container } from "@/components/tmdb/container";
import { Skeleton } from "@/components/ui/skeleton";

type Props = {
  knownFor: string;
  gender: number;
  birthday: string | null;
  deathday: string | null;
  placeOfBirth: string | null;
  alsoKnownAs: string[];
};

export const PersonalInfo = ({
  knownFor,
  gender,
  birthday,
  deathday,
  placeOfBirth,
  alsoKnownAs,
}: Props) => {
  const born = birthday ? formatDate(birthday) : null;
  const died = deathday ? formatDate(deathday) : null;
  const age = died ? born && countAge(born, died) : born && countAge(born);

  return (
    <div className="mt-6">
      <Container label="Personal Info">
        <div className="flex flex-col space-y-2 md:space-y-4">
          <div className="flex flex-col">
            <h1 className="font-semibold">Known For</h1>
            <p className="text-muted-foreground text-sm">{knownFor}</p>
          </div>
          <div className="flex flex-col">
            <h1 className="text-sm font-semibold">Gender</h1>
            <p className="text-muted-foreground text-sm">
              {convertGender(gender)}
            </p>
          </div>
          <div className="flex flex-col">
            <h1 className="text-sm font-semibold">Born</h1>
            <p className="text-muted-foreground text-sm">
              {died ? (born ? born : "-") : `${born} (${age} years old)`}
            </p>
          </div>
          {died && (
            <div className="flex flex-col">
              <h1 className="text-sm font-semibold">Died</h1>
              <p className="text-muted-foreground text-sm">
                {`${died} (${age} years old)`}
              </p>
            </div>
          )}
          <div className="flex flex-col">
            <h1 className="text-sm font-semibold">Place of Birth</h1>
            <p className="text-muted-foreground text-sm">{placeOfBirth}</p>
          </div>
          <div className="flex flex-col">
            <h1 className="text-sm font-semibold">Also Known As</h1>
            <ul
              className="text-muted-foreground text-sm"
              style={{ whiteSpace: "pre-line" }}
            >
              {alsoKnownAs.map((item) => (
                <li key={item}>&bull; {item}</li>
              ))}
            </ul>
          </div>
        </div>
      </Container>
    </div>
  );
};

export const PersonalInfoSkeleton = () => {
  return (
    <div className="mt-6">
      <div className="flex w-full flex-col gap-y-4">
        <header className="flex items-center justify-between">
          <Skeleton className="h-9 w-1/2" />
        </header>
        <main className="flex flex-col space-y-4">
          {Array.from({ length: 5 }).map((_, index) => (
            <div key={index} className="flex flex-col space-y-2">
              <Skeleton className="h-6 w-1/3" />
              <Skeleton className="h-4 w-2/3" />
            </div>
          ))}
        </main>
      </div>
    </div>
  );
};
