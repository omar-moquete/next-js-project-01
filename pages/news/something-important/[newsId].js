import { useRouter } from "next/router";
import React from "react";

export default function DynamicSegment() {
  const dynamicSegmentId = useRouter();
  console.log("dynamicSegmentId", dynamicSegmentId);
  return <div>test</div>;
}
