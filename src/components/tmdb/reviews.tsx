import { TPickReview } from "@/data/zod/tmdb";

import { CardReview } from "@/components/card/card-review";
import { Container } from "@/components/tmdb/container";

type Props = {
  id: number;
  reviews: TPickReview[];
};

export const Reviews = ({ id, reviews }: Props) => {
  const totalReviewCount = reviews.length;
  return (
    totalReviewCount > 0 && (
      <Container
        label={totalReviewCount === 1 ? "User Review" : "User Reviews"}
        linkShowMore={totalReviewCount > 2 ? `/movie/${id}/reviews` : ""}
        labelShowMore="Read All Reviews"
      >
        <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
          {reviews.slice(0, 2).map((review) => (
            <div key={review.id} className="px-2">
              <CardReview review={review} expanded={false} />
            </div>
          ))}
        </div>
      </Container>
    )
  );
};
