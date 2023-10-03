import React from "react";
import { useParams } from "react-router-dom";

// data Api

export default function DetailTang() {
  // sd useParams de nhan data truyen toi theo router
  const params = useParams();
  console.log("🚀 ~ file: DetailTang.jsx:7 ~ DetailTang ~ params:", params);
  console.log("id : ", params.id);
  return <div>DetailTang</div>;
}
