import React, { useState, useEffect } from 'react';
import { withFirebase } from '../Firebase';
import { Link } from 'react-router-dom';

const MyCheckIn = ({ currentUser, firebase }) => {
    const [checkedInPlayers, setCheckedInPlayers] = useState(null)
    const [courtName, setCourtName] = useState(null)

    useEffect(() => {
        if (currentUser !== null) {
            if (currentUser.currentCheckIn !== '') {
                firebase.db.collection('courts').doc(currentUser.currentCheckIn).get()
                .then(doc => {
                    if (doc.exists) {
                        setCheckedInPlayers([...doc.data().Basketball])
                        setCourtName(doc.data().courtName)
                    }
                }).catch(err => console.log(err))
                firebase.db.collection('courts').doc(currentUser.currentCheckIn).onSnapshot(snapshot => setCheckedInPlayers([...snapshot.data().Basketball]))
            }
        }
    }, [currentUser])
    
    const renderContent = () => {
        if(currentUser.currentCheckIn !== ''){
            return (
                    <div>
                        <h1>Currently checked in at: </h1>
                        <h1>{courtName}</h1>
                        <h4>Basketball</h4>
                        <h5>Players:</h5>
                        <h5>Messages:</h5>
                        <ul>
                            {
                                checkedInPlayers.map((player, i) => {
                                    return (
                                        <li key={i}>
                                            <Link to={`/main/profile/${player.playerId}`}><p>{player.playerName}</p></Link>
                                            <p>{player.message}</p>
                                        </li>
                                    )
                                })
                            }
                        </ul>
                    </div>
            )
        } else {
            return(
                <div>
                    <h1>You are currently not checked in anywhere!</h1>
                    <h3>Click here to look for parks</h3>
                </div>
            )
        }
    }
    // console.log(checkedInPlayers)
    return (
        <>
        {  
            checkedInPlayers && courtName
                ? 

                    <div>
                        {renderContent()}
                    </div>
                :
                    <div>
                        <h1>You are currently not checked in anywhere!</h1>
                        <h3>Click here to look for parks</h3>
                    </div>
        }
        </>
    )
}

export default withFirebase(MyCheckIn); 