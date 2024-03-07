import React from 'react';
import { getChatResponse } from '../AI/Prediction';

const ActionProvider = ({ createChatBotMessage, setState, children }) => {
  const handleQuestion = async (question) => {
    let answer = await getChatResponse(question);

    const botMessage = createChatBotMessage(answer);
    console.log(answer);
    
  
    setState((prev) => ({
      ...prev,
      messages: [...prev.messages, botMessage],
    }));
  };
  return (
    <div>
      {React.Children.map(children, (child) => {
        return React.cloneElement(child, {
          actions: {
            handleQuestion,
          },
        });
      })}
    </div>
  );
};

export default ActionProvider;