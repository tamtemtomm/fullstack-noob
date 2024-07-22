import React from "react";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";

const JobRow = () => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-sm relative">
      <div className="absolute top-4 right-4 cursor-pointer">
        <FontAwesomeIcon icon={faHeart} className="size-6 text-gray-400"/>
      </div>
      <div className="flex grow gap-4">
        <div className="content-center">
          <Image
            src="https://upload.wikimedia.org/wikipedia/commons/5/54/2024_Spotify_logo_without_text.svg"
            className="size-12"
            alt="logo"
            width="12"
            height="12"
          />
        </div>
        <div className="grow md:flex">
          <div className="grow">
            <div className="text-gray-500 sm">Spotify</div>
            <div className="font-bold text-lg mb-1">Product Designers</div>
            <div className="text-gray-500 text-sm">
              Remote &middot; New York, US &middot; Full time
            </div>
          </div>

          <div className="content-end text-gray-500 text-sm">2 weeks ago</div>
        </div>
      </div>
    </div>
  );
};

export default JobRow;
