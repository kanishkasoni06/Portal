import {
  FormControlLabel,
  RadioGroup,
  FormControl,
  Radio,
} from "@mui/material";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import ModeEditOutlinedIcon from "@mui/icons-material/ModeEditOutlined";
import EditQuestion from "./EditQuestion";
import { useDispatch } from "react-redux";
import { toggleEditOpt } from "../../../../../store/slices/EditContSlice";
import { quesList } from "../../../../../store/slices/QuestionsSlice";
import axios from "axios";
import { useState } from "react";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const GetQuestions = () => {
  const category = useSelector((state) => state.quesList.quesCategory);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_APP_NODE_URL}/category/${category}`)
      // .get(`${import.meta.env.VITE_APP_NODE_URL}/getquestions`)
      .then((res) => {
        // console.log(res)
        dispatch(quesList(res.data.msg));
        // setLoading(false);
      })
      .catch(() => {
        // console.log(err);
        // setLoading(false);
        // toast.error("Something went wrong");
      });
  }, [category]);

  const questionDisplay = useSelector((state) => state.quesList);
  const showEdit = useSelector((state) => state.editShow);
  const [correctAns, setCorrectAns] = useState();
  const dispatch = useDispatch();

  useEffect(() => {
    // console.log(questionDisplay?.initialQues[questionDisplay.initialQuesNo-1])
    let options =
      questionDisplay?.initialQues[questionDisplay.initialQuesNo - 1]?.options;
    let correctId =
      questionDisplay?.initialQues[questionDisplay.initialQuesNo - 1]
        ?.correctId;
    let index = options?.findIndex((x) => x.ansId == correctId);
    // console.log(index,options)
    setCorrectAns(options[index]?.name);
  }, [
    questionDisplay?.initialQues[questionDisplay.initialQuesNo - 1]?.question,
  ]);

  const delQuestion = (id) => {
    axios
      .delete(`${import.meta.env.VITE_APP_NODE_URL}/deletequestions/${id}`)
      .then(() => {
        //   console.log(res)
        toast.success("Question deleted successfully");
        axios
          .get(`${import.meta.env.VITE_APP_NODE_URL}/category/${category}`)
          .then((res) => {
            //   console.log(res)
            dispatch(quesList(res.data.msg));
          });
        // dispatch(feedbacklist(res.data))
      });
  };

  return (
    <>
      <div className="p-10 flex flex-col justify-between h-full">
        <div className="">
          <div className="flex justify-between my-3">
            <p>Question-{questionDisplay?.initialQuesNo}</p>
            <div>
              <ModeEditOutlinedIcon
                sx={{ cursor: "pointer" }}
                onClick={() => dispatch(toggleEditOpt())}
                style={{ cursor: "pointer" }}
              />
              <DeleteOutlineOutlinedIcon
                sx={{ color: "#f95959", marginLeft: "1rem", cursor: "pointer" }}
                onClick={() => {
                  delQuestion(
                    questionDisplay.initialQues[
                      questionDisplay?.initialQuesNo - 1
                    ]?._id
                  );
                }}
              />
            </div>
          </div>
          <hr />
          <p>
            {
              questionDisplay?.initialQues[questionDisplay?.initialQuesNo - 1]
                ?.question
            }
          </p>

          <FormControl>
            <RadioGroup>
              {questionDisplay?.initialQues[
                questionDisplay.initialQuesNo - 1
              ]?.options.map((item, key) => {
                return (
                  <FormControlLabel
                    key={key}
                    checked={item.name === correctAns}
                    value={item}
                    control={<Radio />}
                    label={item.name}
                  />
                );
              })}
              {/* <FormControlLabel value="HTML11" checked control={<Radio/>} label="HTML11"/> */}
            </RadioGroup>
          </FormControl>
        </div>
        <div className="text-[#097309] font-bold">
          <p>Correct Answer</p>
          <hr />
          <p>{correctAns}</p>
        </div>

        <div
          className={
            showEdit.initialValue
              ? "absolute top-6 start-0 w-full z-10"
              : "hide"
          }
        >
          <EditQuestion />
        </div>

        <ToastContainer />
      </div>
    </>
  );
};

export default GetQuestions;
