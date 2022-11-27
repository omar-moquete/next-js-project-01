import { MongoClient } from "mongodb";
import MeetupList from "../components/meetups/MeetupList";

export default function HomePage(props) {
  return <MeetupList meetups={props.meetups} />;
}

export async function getStaticProps() {
  //  1) Stablish connection
  const client = await MongoClient.connect(process.env.MONGODB_URI);

  // 2) Access database
  const db = client.db();

  // 3) Access collection in database
  const meetupsCollection = db.collection("meetups");

  const meetupsData = await meetupsCollection.find().toArray();

  const formattedMeetups = meetupsData.map((meetup) => {
    return {
      id: meetup._id.toString(),
      title: meetup.title,
      address: meetup.address,
      image: meetup.image,
    };
  });

  client.close();
  return {
    props: {
      meetups: formattedMeetups,
    },
    revalidate: 2,
  };
}
