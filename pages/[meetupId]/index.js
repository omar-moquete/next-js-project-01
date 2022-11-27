import { MongoClient, ObjectId } from "mongodb";
import React from "react";
import { DUMMY_MEETUPS } from "..";
import MeetupDetail from "../../components/meetups/MeetupDetail";
import MeetupList from "../../components/meetups/MeetupList";

export default function MeetupPage(props) {
  console.log(props);

  return <MeetupDetail {...props} />;
}

// Get meetup data from db to pass into MeetupDetail component
export async function getStaticProps(context) {
  // How does meetupId gets set in the browser url? Initially when the page loads all the documents(meetups) in the database are rendered as a list. Each list item has a button which executes a programmatic navigation to the current meetup id.

  // received meetupId from dynamic path
  const { meetupId } = context.params;

  // connect to mongodb
  const client = await MongoClient.connect(process.env.MONGODB_URI);

  // connect to db
  const db = client.db();

  // connect to meetups collection in the db
  const meetupsCollection = db.collection("meetups");

  // find the one meetup which matches the dynamic path id
  // ObjectId() exported from mongodb creates a new bson id required.
  const selectedMeetup = await meetupsCollection.findOne({
    _id: new ObjectId(meetupId),
  });

  // close connection
  await client.close();

  return {
    props: {
      image: selectedMeetup.image,
      description: selectedMeetup.description,
      address: selectedMeetup.address,
      title: selectedMeetup.title,
    },
  };
}

export async function getStaticPaths() {
  // connect to mongodb
  const client = await MongoClient.connect(process.env.MONGODB_URI);

  // connect to db
  const db = client.db();

  // connect to meetups collection in the db
  const meetupsCollection = db.collection("meetups");

  // get possible paths to replace [meetupId] with. These paths will include each meetup id.
  // get all meetup ids to replace [meetupId] with
  // find({} === what to filter, {_id: 0} === without if 0, only if 1)

  const documentsArray = await meetupsCollection.find().toArray(); //returns all documents in the collection in an array
  const ids = documentsArray.map((doc) => JSON.parse(JSON.stringify(doc._id))); // returns an array with all the ids parsed from bson to json to strings.

  const cb = function (id) {
    return { params: { meetupId: id } };
  };

  const paths = ids.map(cb);

  return {
    paths,
    fallback: false,
  };
}

// OAOO
