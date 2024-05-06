// Video.jsx
import React, { useState, useEffect } from 'react';
import Quiz from '../components/Quiz';
import { useParams } from 'react-router-dom';
import { db } from '../firebase'; // Make sure this path is correct
import { collection, query, where, getDocs } from "firebase/firestore";
import ReactPlayer from 'react-player';

export default function Video() {
    const { id } = useParams();
    const [videoData, setVideoData] = useState(null);
    const [loading, setLoading] = useState(true); // State to track loading state

    useEffect(() => {
        const fetchVideoData = async () => {
            try {
                const videosRef = collection(db, 'videos');
                const finalQuery = query(videosRef, where('id', '==', id));
                const querySnapshot = await getDocs(finalQuery);

                if (!querySnapshot.empty) {
                    querySnapshot.forEach(doc => {
                        const data = doc.data();
                        setVideoData(data);
                    });
                } else {
                    console.error('No matching documents!');
                }
            } catch (error) {
                console.error('Error fetching video data:', error);
            } finally {
                setLoading(false); // Set loading state to false after fetching data
            }
        };

        fetchVideoData();
    }, [id]); // Add 'id' to the dependency array to fetch data when id changes

    return (
        <div className='max-w-[1200px] mx-auto'>
            {loading ? (
                <p>Loading...</p>
            ) : (
                <>
                    <h1>{videoData?.title || 'Video Title'}</h1>
                    <div className='flex justify-between'>
                        {/* <ReactPlayer
                            controls={true}
                            url={"C:/Users/shahn/Desktop/Coding-Projects/crest-app/crest-frontend/src/assets/html.mp4"}
                            width="70%"
                            height="auto"
                        />       */}
                        <iframe width="70%" height="315" src={"https://www.youtube.com/embed/MDLn5-zSQQI?si=1mcAYwioOlsBAHFF"}
                            title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            referrerpolicy="strict-origin-when-cross-origin" allowfullscreen>
                        </iframe>
                        <div>
                            {videoData?.recommendations?.map((recommendation, index) => (
                                <video key={index} className='w-full my-2' controls>
                                    <source src={recommendation} type="video/mp4" />
                                </video>
                            ))}
                        </div>
                    </div>
                    {videoData && videoData.transcript}
                    {videoData && <Quiz videoData={videoData} />}
                </>
            )}
        </div>
    );
}
