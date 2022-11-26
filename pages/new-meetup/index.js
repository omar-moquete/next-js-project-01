import { useRouter } from "next/router";
import React from "react";

import NewMeetupForm from "../../components/meetups/NewMeetupForm";
export default function NewMeetupPage(props) {
  const router = useRouter();
  // Sends request to our backend.
  const addMeetupHandler = async function (enteredMeetupData) {
    const res = await fetch("/api/new-meetup", {
      method: "POST",
      body: JSON.stringify(enteredMeetupData),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await res.json();
    console.log(data);
    router.replace("/");
  };

  return <NewMeetupForm onAddMeetup={addMeetupHandler} />;
}
