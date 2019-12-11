import React, { useState, useEffect } from 'react';
import { withFirebase } from '../Firebase';

const MyCheckIn = ({ currentUser, firebase }) => {
    const [checkedInPlayers, setCheckedInPlayers] = useState(null)

    useEffect(() => {
        if (currentUser !== null) {
            if (currentUser.currentCheckIn !== '') {
                firebase.db.collection('courts').doc(currentUser.currentCheckIn).get()
                .then(doc => {
                    if (doc.exists) {
                        setCheckedInPlayers([...doc.data().Basketball])
                    }
                }).catch(err => console.log(err))
                firebase.db.collection('courts').doc(currentUser.currentCheckIn).onSnapshot(snapshot => setCheckedInPlayers([...snapshot.data().Basketball]))
            }
        }
    }, [currentUser])
    
    // console.log(checkedInPlayers)
    return (
        <>
        {  
            checkedInPlayers 
                ? 
                    <div>
                        <h4>Basketball</h4>
                        <h5>Player:</h5>
                        <h5>Messages:</h5>
                        <ul>
                            {
                                checkedInPlayers.map((player, i) => {
                                    return (
                                        <li key={i}>
                                            <p>{player.playerName}</p>
                                            <p>{player.message}</p>
                                        </li>
                                    )
                                })
                            }
                        </ul>
                    </div>
                :
                    <div> yoyoyoyoyo</div>
        }
        </>
    )
}

export default withFirebase(MyCheckIn); 