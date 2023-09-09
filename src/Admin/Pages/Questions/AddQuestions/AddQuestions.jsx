import React from "react";
import Header from "../../../components/Header";
import Question from "./components/Question";
import Dropdown from "./components/Dropdown";
import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";
import { toggleQuestion } from "../../../../store/slices/QuestionsSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Cookies from "js-cookie";
import { useState } from "react";

const AddQuestions = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const check = Cookies.get("apage5");
    if (!check) {
      navigate("/login");
    }
    // console.log("add")
  }, []);
  const dispatch = useDispatch();
  return (
    <div>
      <Header />
      <div className="flex" style={{ margin: "7rem 0 0 3rem" }}>
        <div className="w-2/3">
          <Question />
        </div>
        <div
          className="w-1/3 flex flex-col justify-between"
          style={{ margin: "3rem 4rem 0 2rem" }}
        >
          <Dropdown onClick={() => dispatch(toggleQuestion())} />

          <Button
            variant="contained"
            sx={{ width: "80%", margin: "0.8rem auto", padding: "0.5rem" }}
            endIcon={<SendIcon />}
            onClick={() => dispatch(toggleQuestion())}
          >
            Submit
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AddQuestions;
