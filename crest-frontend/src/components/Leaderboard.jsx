import React, { useEffect, useState } from 'react';
import { db } from '../firebase'; // Import your Firebase configuration
import { collection, getDocs, orderBy, query } from 'firebase/firestore';

export default function Leaderboard({ currentMarks }) {
    const [leaders, setLeaders] = useState([]);

    useEffect(() => {
        const fetchLeaders = async () => {
            try {
                const leadersRef = collection(db, 'leader');
                const finalQuery = query(leadersRef, orderBy('marks', 'desc'));
                const querySnapshot = await getDocs(finalQuery);
                const data = querySnapshot.docs.map((doc) => ({
                    ...doc.data(),
                }));
                setLeaders(data);
            } catch (error) {
                console.error('Error fetching leaders:', error);
            }
        };

        fetchLeaders();
    }, [currentMarks]); // Re-fetch leaders when currentMarks changes

    // Create an array including the current user's score
    const updatedLeaders = [
        { name: 'You', marks: currentMarks },
        ...leaders,
    ];

    // Sort the updated leaders array in descending order of marks
    updatedLeaders.sort((a, b) => b.marks - a.marks);

    return (
        <div>
            <h2>Leaderboard</h2>
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Marks</th>
                    </tr>
                </thead>
                <tbody>
                    {updatedLeaders.map((leader, index) => (
                        <tr key={index}>
                            <td>{leader.name}</td>
                            <td>{leader.marks}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
