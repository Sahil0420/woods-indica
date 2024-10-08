import React from "react";
import StarsRating from "react-star-rate";

const ReviewComponent = ({ review }) => {
  const {
    userName,
    rating,
    review: comments,
    reviewDate,
    reviewTime,
  } = review || {};

  if (!review) {
    return <div>Error: Review data is missing</div>;
  }

  return (
    <main className="p-4 w-full border-2 rounded-md shadow-sm">
      <section className="flex justify-between mb-3 flex-col lg:flex-row">
        <div className="flex items-start gap-3">
          <div>
            <h1 className="md:text-lg text-gray-700 font-semibold">
              {userName || "Anonymous"}
            </h1>
            <p className="text-gray-700 text-sm">
              {reviewDate} at {reviewTime}
            </p>
          </div>
        </div>
        <StarsRating disabled value={rating} />
      </section>
      <p className="md:text-lg text-gray-700">{comments}</p>
    </main>
  );
};

export default ReviewComponent;
