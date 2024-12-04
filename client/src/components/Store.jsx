import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCartShopping, faPlay } from '@fortawesome/free-solid-svg-icons';
import useFetch from '../../hooks/useFetch';
import { useContext, useEffect, useState, useRef } from 'react';
import { AuthContext } from '../../contexts/authContext';
import Loading from './Loading';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import HeroSection from './HeroSection';
import UserNavbar from './UserNavbar';

const Store = () => {
    const authData = useContext(AuthContext)
    const user = authData.user
    const userError = authData.error
    const userLoading = authData.loading
    const {data, loading, error, reFetch, useRef} = useFetch("http://localhost:7001/api/beats/all/" + user?.uid)
    const navigate = useNavigate()
    let player

    const [players, setPlayers] = useState([]);
    const [activePlayerIndex, setIndex] = useState(null);

    const initializePlayers = (beats) => {
        const audioPlayers = beats.map(
            (beat) => new Audio(beat.mp3 || beat.wav) // Fallback to wav if mp3 is missing
        );
        setPlayers(audioPlayers);
    };

    const playAudio = (index) => {
        if (players[index].paused) {
            
            if (activePlayerIndex !== null) {
                players[activePlayerIndex].pause();
            }

            players[index].play();
            setIndex(index);
        } else {
            players[index].pause();
            setIndex(null);
        }
    };

    useEffect(() => {
        if (data?.length) {
            initializePlayers(data);
        }
        
        return () => {
            players.forEach((player) => player.pause());
        };
    }, [data]);

    return (
        <main className='bg-gradient-to-b from-black to-indigo-800 min-h-screen'>
            <UserNavbar/>
            {loading && <div className='min-h-screen flex items-center justify-self-center'><Loading text="Loading..."/></div>} 
            {!loading && <div>
                <p className="text-white text-3xl p-5 self-center justify-self-center">Zae World</p>
                <div className='gap-4 p-4 grid grid-cols-2 bg-black-800 rounded-xl shadow-lg w-11/12 justify-self-center'>
                {data && (data.map((item,i) => {
                return (
                <button key={i} className='bg-black bg-opacity-60 hover:bg-white hover:bg-opacity-40 hover:bg-opacity-20 p-4 rounded-xl text-white border border-solid border-white shadow-lg shadow-black flex flex-row items-center gap-10 justify-between'>
                    <button onClick={() => {playAudio(i)}}>
                        <FontAwesomeIcon icon={faPlay} />
                    </button>
                    <div>
                    <p>{item.title}</p>
                    <p>${item.price}</p>
                    </div>
                    <button onClick={() => {navigate(`/checkout?id=${data[i].id}`)}}>
                        <FontAwesomeIcon icon={faCartShopping} />
                    </button>
                </button>)
                }))}
                </div>
            </div>}
        </main>
    )
} 
export default Store