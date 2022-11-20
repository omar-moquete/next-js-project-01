import { useRouter } from "next/router";
import React from "react";

export default function DynamicSegment() {
  const router = useRouter();
  console.log("dynamicSegmentId", router);
  return <div>{router.query.newsId}</div>;
}
