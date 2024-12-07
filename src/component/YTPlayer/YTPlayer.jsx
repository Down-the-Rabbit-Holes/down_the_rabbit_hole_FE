import "./YTPlayer";
import React from "react";

const YTPlayer = ({ ytVideoId }) => {
  if (!ytVideoId) {
    return <p>Loading video...</p>;
  }

  return (
    <div className="embedded-player">
      <iframe
        width="800"
        height="640"
        src={`https://www.youtube.com/embed/${ytVideoId}`}
        title="YouTube Video Player"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerpolicy="strict-origin-when-cross-origin"
        allowfullscreen="true"
        tabIndex="0"
        // data-cy="yt-iframe"
      ></iframe>
    </div>
  );
};
export default YTPlayer;
