import React from 'react';
import SideBarRow from './../SideBarRow/SideBarRow';
import './SideBar.css';
import HomeIcon from '@material-ui/icons/Home';
import WhatshotIcon from '@material-ui/icons/Whatshot';
import SubscriptionsIcon from '@material-ui/icons/Subscriptions';
import VideoLibraryIcon from '@material-ui/icons/VideoLibrary';
import HistoryIcon from '@material-ui/icons/History';
import OndemandVideoIcon from '@material-ui/icons/OndemandVideo';
import WatchLaterIcon from '@material-ui/icons/WatchLater';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import { Link } from 'react-router-dom';

const SideBar = () => {
    return (
        <div className='sidebar'>
            <Link to={`/`}>
                <SideBarRow Icon={HomeIcon} title='Inicio' />
            </Link>    
            <Link to={`/search/kingdom%20hearts`}>
                <SideBarRow Icon={WhatshotIcon} title='Tendencias' />
            </Link>
            <SideBarRow Icon={SubscriptionsIcon} title='Suscripciones' />
            <hr />
            <SideBarRow Icon={VideoLibraryIcon} title='Biblioteca' />
            <SideBarRow Icon={HistoryIcon} title='Historial' />
            <SideBarRow Icon={OndemandVideoIcon} title='Mis videos' />
            <SideBarRow Icon={WatchLaterIcon} title='Ver más tarde' />
            <SideBarRow Icon={ThumbUpIcon} title='Vídeos que me gustan' />
            <hr />
        </div>
    )
}

export default SideBar;