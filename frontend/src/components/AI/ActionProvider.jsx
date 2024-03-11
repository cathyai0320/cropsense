import React from 'react';
import { useAuth } from '../Auth/AuthContext';
import { getChatResponse } from '../AI/Prediction';

const ActionProvider = ({ createChatBotMessage, setState, children }) => {
  const { token } = useAuth();

  const handleQuestion = async (question) => {
    let answer = await getChatResponse(question, token);

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
