import React, { useEffect, useState } from "react";
import QuesTab from "../../components/QuesTab/QuesTab";
import Question from "../../components/Question/Question";
import QuesNumbers from "../../components/QuesNumbers/QuesNumbers";
import Timer from "../../components/Timer/Timer2";
import TestFooter from "../../components/TestFooter/TestFooter";
import TestHeader from "../../components/TestHeader/TestHeader";
import { Button } from "@mui/material";
import { useSelector } from "react-redux";
import axios from "axios";

const Test = () => {
  const data = useSelector((state) => state.prevNext);
  console.log(data);
  return (
    <div className="flex justify-evenly">
      <div className="flex flex-col justify-start w-8/12 m-0 py-4 pl-12">
        <TestHeader />
        <QuesTab />
        <Question />
        <TestFooter />
      </div>
      <div className="flex flex-col w-4/12 m-0 py-4 pr-12 justify-between">
        <div>
          <Timer />
          <QuesNumbers />
        </div>
        <Button
          type="submit"
          className="!bg-submitColor !text-white w-4 !mx-auto !px-16 !py-2 absolute -bottom-10"
        >
          Submit
        </Button>
      </div>
    </div>
  );
};

export default Test;
