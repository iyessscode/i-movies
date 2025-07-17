import { IconLoader } from "@/data/icons";
import { useInfiniteScroll } from "@/hooks/use-infinite-scroll";
import { Footer } from "./navigation/footer";

type Props = {
  hasNextPage: boolean | undefined;
  isFetchingNextPage: boolean;
  fetchNextPage: () => void;
  labelEndPage?: string;
};

export const LoadMore = ({
  hasNextPage,
  isFetchingNextPage,
  fetchNextPage,
  labelEndPage = "You've reached the end!",
}: Props) => {
  const loadMoreRef = useInfiniteScroll({
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  });
  return (
    <>
      {hasNextPage ? (
        <div ref={loadMoreRef} className="flex justify-center py-4">
          {isFetchingNextPage && (
            <IconLoader className="text-primary h-8 w-8 animate-spin" />
          )}
        </div>
      ) : (
        <>
          <p className="text-muted-foreground py-4 text-center">
            {labelEndPage}
          </p>
          <Footer />
        </>
      )}
    </>
  );
};
