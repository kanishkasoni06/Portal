import { Tab, Tabs } from "@mui/material";
import React, { useState } from "react";

const QuesTab = () => {
  const quesType = ["HTML", "CSS", "SQL", "Aptitude", "C"];
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <div>
      <Tabs value={value} onChange={handleChange} centered>
        {quesType?.map((type, id) => {
          return <Tab label={type} key={id} />;
        })}
      </Tabs>
    </div>
  );
};

export default QuesTab;
