import React from "react";
import Link from "next/link";

export default function DetailPage() {
  return (
    <div>
      <h1>DetailPage</h1>
      <Link href="/news/something-important/dinamicwhatever">CLICK ME</Link>
    </div>
  );
}
