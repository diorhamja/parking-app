import React, {useState, useEffect} from 'react' 
import { Link } from 'react-router-dom';
import axios from 'axios';
import ShowMap from '../components/ShowMap';
import Header from '../components/Header';
import AddSpot from '../components/AddSpot';
import DetailSpot from '../components/DetailSpot';
import Posted from '../components/Posted';

const Home = (props) => {

    const { userLocation, user } = props;
    
    const [spots, setSpots] = useState([]);
    const [selectedSpot, setSelectedSpot] = useState(null);
    const [clickedLocation, setClickedLocation] = useState(null);

    const [isAddOpen, setIsAddOpen] = useState(false);
    const [isDetailOpen, setIsDetailOpen] = useState(false);
    const [isPostedOpen, setIsPostedOpen] = useState(false);


    useEffect(() => {
        axios.get('http://localhost:8000/api/spots')
            .then((res) => {
                console.log(res.data);
                setSpots(res.data);
            })
            .catch((err) => {
                console.log(err);
            })
    }, []);

    return (
        <div>
            <Header setIsAddOpen={ setIsAddOpen } user={ user } />
            <ShowMap spots={ spots } setSelectedSpot={ setSelectedSpot } setIsDetailOpen={setIsDetailOpen} userLocation={ userLocation } clickedLocation={clickedLocation} setClickedLocation={ setClickedLocation } isPosting={ setIsAddOpen } />
            {
                user &&
                <AddSpot isAddOpen={ isAddOpen } setIsAddOpen={ setIsAddOpen } spots={ spots } setSpots={ setSpots } userLocation={ userLocation } clickedLocation={ clickedLocation } user={ user } setIsPostedOpen={setIsPostedOpen} />
            }
            {
                selectedSpot &&
                <DetailSpot isDetailOpen={isDetailOpen} setIsDetailOpen={setIsDetailOpen} id={selectedSpot._id}/>
            }
            {/* <Posted isPostedOpen={isPostedOpen} setIsPostedOpen={setIsPostedOpen}/> */}
        </div>
    )
}

export default Home;