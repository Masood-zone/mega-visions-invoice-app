import React from "react";
import { useParams } from "react-router-dom";

function EditCompany() {
  const { id } = useParams();
  return <section>Edit Compant</section>;
}

export default EditCompany;
