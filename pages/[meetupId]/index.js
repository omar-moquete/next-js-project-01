import React from "react";
import { DUMMY_MEETUPS } from "..";
import MeetupDetail from "../../components/meetups/MeetupDetail";

export default function MeetupPage({ meetupData }) {
  return <MeetupDetail {...meetupData} />;
}
///////////////////////////////////////////////////////////////

export async function getStaticProps(context) {
  // console.log("GETTING NEW DATA"); // logged to terminal
  // console.log("Time: " + Date()); // logged to terminal
  const response = await fetch("https://restcountries.com/v3.1/all");
  const responseData = await response.json();

  const meetupData = DUMMY_MEETUPS.filter(
    (meetup) => meetup.id === context.params.meetupId
  ).at(0);

  return {
    props: {
      meetupData,
    },
    revalidate: 30,
  };
}

export async function getStaticPaths() {
  // Return object with a paths property, which is an array of objects, where each object has a params property, which value is an object of a possible segment id.
  return {
    paths: [
      {
        params: {
          meetupId: "m1",
        },
        params: {
          meetupId: "m2",
        },
      },
    ],
    fallback: true, // false means that all possible values are given here. This means that if the user tries to access a path that does not exist, a 404 error will be thrown. If true, nextjs will try to generate a page for the current dynamic segment automatically on the server for the current request (current path being requested). In other words, this is used in case we don't want to pregenerate all pages, just certain pages and let nextjs pregenerate the rest upon request.
  };
}
