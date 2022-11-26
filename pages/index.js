import MeetupList from "../components/meetups/MeetupList";

export const DUMMY_MEETUPS = [
  {
    id: "m1",
    title: "A first meetup",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/f/f2/Fortaleza_Ozama.jpg",
    address: "Address atc...",
    description: "This is a first meetup.",
  },
  {
    id: "m2",
    title: "A second meetup",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/6/69/El-templete-habana.JPG",
    address: "Address atc2...",
    description: "This is a second meetup.",
  },
];

export default function HomePage(props) {
  return <MeetupList meetups={props.meetups} />;
}

export function getStaticProps() {
  // MongoClient.connect();
  return {
    props: {
      meetups: DUMMY_MEETUPS,
    },
  };
}
