import React from "react";
import { Link } from "react-router-dom";

export default function OtherPage() {
  return (
    <div>
      Im some Other page
      <Link to="/">Go back home</Link>
    </div>
  );
}
