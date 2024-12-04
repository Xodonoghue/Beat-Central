import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCartShopping, faPlay, faEllipsisVertical, faTrash} from '@fortawesome/free-solid-svg-icons';
import useFetch from '../../hooks/useFetch';
import { useContext, useEffect, useState, useRef } from 'react';
import { AuthContext } from '../../contexts/authContext';
import Loading from './Loading';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import HeroSection from './HeroSection';
import UserNavbar from './UserNavbar';
import Modal from './Modal';
import axios from 'axios';

const ManageStore = () => {
    const authData = useContext(AuthContext)
    const user = authData.user
    const userError = authData.error
    const userLoading = authData.loading
    const {data, loading, error, reFetch, useRef} = useFetch("/api/beats/all/" + user?.uid)
    const navigate = useNavigate()
    let player

    const [players, setPlayers] = useState([]);
    const [activePlayerIndex, setIndex] = useState(null);
    const [modalStates, setModalStates] = useState([]);

    const initializePlayers = (beats) => {
        const audioPlayers = beats.map(
            (beat) => new Audio(beat.mp3 || beat.wav)
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

    const toggleModal = (index) => {
        const updatedStates = [...modalStates];
        updatedStates[index] = !updatedStates[index];
        setModalStates(updatedStates);
    };

    const deleteBeat = async (id) => {
        const axiosInstance = axios.create({
            baseURL: 'http://localhost:5173', 
            withCredentials: true,
          });
        await axiosInstance.delete(`/api/beats/delete-beat/${id}`)
    }

    useEffect(() => {
        if (data?.length) {
            console.log(data)
            initializePlayers(data);
            setModalStates(new Array(data.length).fill(false)); 
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
                    <button onClick={() => {navigate(toggleModal(i))}}>
                        <FontAwesomeIcon icon={faEllipsisVertical} />
                    </button>
                    <Modal open={modalStates[i]} ind={i} onClose={() => {toggleModal(i)}}>
                        <p3 className='text-black p-1'>Confirm Delete</p3>
                        <FontAwesomeIcon color="red-400" icon={faTrash} />
                        <p className='text-zinc-400 p-1'> Are you sure you want to delete this item?</p>
                        <div className='flex flex-row gap-3'>
                            <button onClick={async() => {await deleteBeat(data[i].id); toggleModal(i); reFetch()}} className='btn btn-danger w-1/2 bg-red-500 rounded-xl shadow shadow-lg'>Delete</button>
                            <button onClick={() => {toggleModal(i)}} className='btn btn-light w-1/2 text-zinc-400 bg-white-500 rounded-xl shadow shadow-lg'>Cancel</button>
                        </div>

                    </Modal >
                </button>)
                }))}
                </div>
            </div>}
        </main>
    )
} 
export default ManageStore