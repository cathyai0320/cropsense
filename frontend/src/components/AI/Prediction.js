import React, { useState } from 'react';

const baseURL = process.env.NODE_ENV === 'production'
    ? process.env.REACT_APP_PROD_BASE_URL
    : process.env.REACT_APP_DEV_BASE_URL;

export const getBestCrop = async (params, modelname) => {

    try {
        let response = await fetch(`${baseURL}/predict/${modelname}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(params),
        });

        let data = await response.json();
        console.log(data.prediction);
        if (!response.ok) {
            console.log(data.msg);
            throw new Error('Prediction failed. ' + data.msg);
        }
        return data.prediction

    } catch (error) {
        return '';
    }
};

export const getChatResponse = async (question) => {

    try {
        let response = await fetch(`${baseURL}/chatbot/ask`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(question),
        });

        let data = await response.json();
        console.log(data.answer);
        if (!response.ok) {
            console.log(data.msg);
            throw new Error('Ask Question failed. ' + data.msg);
        }
        return data.answer

    } catch (error) {
        return error;
    }
};
