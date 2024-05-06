import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Leaderboard from './Leaderboard';

export default function Quiz({ videoData }) {
    const [quizData, setQuizData] = useState(null);
    const [answers, setAnswers] = useState({});
    const [score, setScore] = useState(null);
    const [showLeaderboard, setShowLeaderboard] = useState(false); // State to toggle leaderboard display

    useEffect(() => {
        if (videoData) {
            const prompt = `GENERATE 10 Multiple choice questions WITH ANSWERS IN JSON FORMAT with options based on the following text: ${videoData.transcript}`;

            const fetchGeneratedContent = async () => {
                try {
                    const response = await axios.post(`http://localhost:8000/generate-content`, { prompt });
                    const quizData = response.data;
                    const temp = quizData?.data?.candidates[0]?.content?.parts[0]?.text;
                    const cleanedText = temp.replace(/`/g, '');
                    const trimmedText = cleanedText.replace(/^json\s+/i, '');
                    const parsedData = JSON.parse(trimmedText);
                    setQuizData(parsedData);
                } catch (error) {
                    console.error('Error fetching generated content:', error);
                }
            };

            fetchGeneratedContent();
        }
    }, [videoData]);

    const handleSubmit = (e) => {
        e.preventDefault();

        let userScore = 0;
        quizData?.questions?.forEach((question, index) => {
            const userAnswer = answers[`question_${index}`];
            if (userAnswer === question.answer) {
                userScore++;
            }
        });

        setScore(userScore);
        setShowLeaderboard(true); // Show leaderboard after submitting
    };

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setAnswers({
            ...answers,
            [name]: value
        });
    };

    return (
        <div className="generated-content">
            <h2>Generated Quiz Content</h2>
            {quizData ? (
                <form onSubmit={handleSubmit}>
                    {quizData?.questions?.map((question, index) => (
                        <div key={index} className="question">
                            <p>{question?.question}</p>
                            <ul>
                                {question?.options?.map((option, optionIndex) => (
                                    <li key={optionIndex}>
                                        <input
                                            type="radio"
                                            id={`question_${index}_option_${optionIndex}`}
                                            name={`question_${index}`}
                                            value={option}
                                            onChange={handleInputChange}
                                            checked={answers[`question_${index}`] === option}
                                        />
                                        <label htmlFor={`question_${index}_option_${optionIndex}`}>{option}</label>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                    <button type="submit">Submit</button>
                </form>
            ) : (
                <p>Loading...</p>
            )}

            {score !== null && (
                <div>
                    <h2>Your Score</h2>
                    <p>{score}/{quizData?.questions?.length}</p>
                </div>
            )}

            {showLeaderboard && <Leaderboard currentMarks={score} />}
        </div>
    );
}
