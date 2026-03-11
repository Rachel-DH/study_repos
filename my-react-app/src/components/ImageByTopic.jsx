import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ImageByTopic = ({ topic }) => {
    const [imageUrl, setImageUrl] = useState('');
    const API_KEY = '0Af9gMrtNjtFehNmxsKmlIgfT7CK05vK7CNwRid7kL18wVqd1zim4CYA';
    useEffect(() => {
        const fetchImage = async () => {
            try {
                const response = await axios.get(`https://api.pexels.com/v1/search`, {
                    headers: {
                        Authorization: API_KEY
                    },
                    params: {
                        query: topic,
                        per_page: 1
                    }
                });
                if (response.data.photos.length > 0) {
                    setImageUrl(response.data.photos[0].src.large);
                }
            } catch (error) {
                console.error('Error fetching image from Pexels:', error);
            }
        };

        fetchImage();
    }, [topic]);

    return (
        <div>
            {imageUrl ? <img
                src={imageUrl}
                alt={topic}
                style={{}}
            /> : <p>Loading...</p>}
        </div>
    );
};

export default ImageByTopic;
