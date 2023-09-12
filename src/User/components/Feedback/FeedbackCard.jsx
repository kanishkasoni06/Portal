import React, { useState } from 'react';
import { Box, Button, Typography } from '@mui/material';
import './FeedbackCard.css';

const FeedbackCard = (props) => {
  const [selectedEmoji, setSelectedEmoji] = useState(null);
 
  const emojis = [
    { label: 'Poor', src: "src/User/assets/Confounded face.svg", value: 'Bad' },
    { label: 'Fair', src: "src/User/assets/Disappointed face.svg"  , value: 'Good' },
    { label: 'Good', src: "src/User/assets/Good face.svg", value: 'Very Good' },
    { label: 'Excellent', src:"src/User/assets/Oh Yeah face.svg" , value: 'Excellent' },
  ];
  

  const selectEmoji = (emoji,index) => {
    if (selectedEmoji === null) {
      setSelectedEmoji(index);
      props.ondata({ question_id: props.ques_id, answer_text: emoji.value });
    }
  };

  return (
    <Box className="QuestionMain">
      <Typography variant="h6" className="QuestionHead">
        {props.question}
      </Typography>
      <Box className="emojiFlex">
        {emojis.map((emoji, index) => (
          <Button
            key={index}
            style={{ display: 'grid' }}
            disabled={selectedEmoji !== null}
            onClick={() => selectEmoji(emoji,index)}
            className={selectedEmoji === index ? "selectedEmoji" : "btn"}
          
          >
            <img className="emoji" src={emoji.src} alt={emoji.label} />
            <p className="emojiHead">{emoji.label}</p>
          </Button>
        ))}
      </Box>
    </Box>
  );
};

export default FeedbackCard;
