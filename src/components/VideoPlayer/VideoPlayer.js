import React, { useState, useEffect } from 'react';
import {useParams} from 'react-router';
import Video from './../Video/Video'
import './VideoPlayer.css';
import RelatedVideos from '../RelatedVideos/RelatedVideos';
import VideoInfo from '../VideoInfo/VideoInfo';
import axios from 'axios';
import CircularProgress from '@material-ui/core/CircularProgress';
import Alert from '@material-ui/lab/Alert';

const VideoPlayer = () => {
    let { videoId } = useParams();

    const [videoInfo, setVideoInfo] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);

    useEffect(() => {
        setVideoInfo([]);
        setIsLoading(true);
        axios
          .get(`https://www.googleapis.com/youtube/v3/videos?part=snippet%2C%20statistics&id=${videoId}&key=${"AIzaSyDn4dY6oVv_8i_IU6cWd78Dan3Mn93Dnig"}`)
          .then(response => {
              createVideoInfo(response.data['items'][0]);
              setIsError(false);
          })
          .catch(error => {
              console.log(error);
              setIsError(true);
          })
    }, [videoId])

    async function createVideoInfo (video) {
        const snippet = video.snippet;
        const stats = video.statistics;
        const channelId = snippet.channelId;
        const response = await axios
                              .get(`https://www.googleapis.com/youtube/v3/channels?part=snippet%2C%20statistics&id=${channelId}&key=${"AIzaSyDn4dY6oVv_8i_IU6cWd78Dan3Mn93Dnig"}`)
        
        const channelImage = response.data.items[0].snippet.thumbnails.medium.url;
        const subs = response.data.items[0].statistics.subscriberCount;
        const publishedDate = new Date(snippet.publishedAt).toLocaleDateString('en-ES', {  
                                                                day : 'numeric',
                                                                month : 'short',
                                                                year : 'numeric'
                                                            });
        const title = snippet.title;
        const description = snippet.description;
        const channelTitle = snippet.channelTitle;
        const viewCount = stats.viewCount;
        const likeCount = stats.likeCount;
        const dislikeCount = stats.dislikeCount;

        setVideoInfo({
            title,
            description,
            publishedDate,
            channelTitle,
            channelImage,
            viewCount,
            likeCount,
            dislikeCount,
            subs
        });
        setIsLoading(false);
    }
    if(isError) {
        return <Alert severity="error" className='loading'>No Results found!</Alert>
    }
    return (
        <div className='videoplayer'>
            <div className='videoplayer__videodetails'>
                <div className='videoplayer__video'>
                    {isLoading ? <CircularProgress className='loading' color='secondary'/> : <Video videoId={videoId} /> }
                </div>
                <div className='videoplayer__videoinfo'>
                    {!isLoading ? <VideoInfo
                                    title={videoInfo.snippet}
                                    description={videoInfo.description}
                                    publishedDate={videoInfo.publishedDate}
                                    channelTitle={videoInfo.channelTitle}
                                    channelImage={videoInfo.channelImage}
                                    viewCount={videoInfo.viewCount}
                                    likeCount={videoInfo.likeCount}
                                    dislikeCount={videoInfo.dislikeCount}
                                    subs={videoInfo.subs}
                                  /> : null
                    }
                </div>
            </div>
            <div className='videoplayer__suggested'>
                < RelatedVideos idVideo={videoId}/>
            </div>
        </div>
    )
}

export default VideoPlayer;