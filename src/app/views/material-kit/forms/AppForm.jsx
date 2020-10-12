import React from "react";
import SimpleForm from "./SimpleForm";
import { Breadcrumb, SimpleCard } from "matx";

const AppForm = () => {
  return (
    <div className="m-sm-30">
      <div  className="mb-sm-30">
        <Breadcrumb
          routeSegments={[
            { name: "Material", path: "/material" },
            { name: "Form" }
          ]}
        />
      </div>
      <SimpleCard title="Custom">
        <SimpleForm />
      </SimpleCard>
      <div className="py-12" />
    </div>
  );
};

export default AppForm;
