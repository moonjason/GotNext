import React from 'react';
import { Link } from 'react-router-dom';
import { CourtLinkCard, CourtCard } from './style';

const CourtList = ({ courts }) => {
    return (
        <>
        {
            courts.map((court, i) => {
                return (
                    <CourtCard  key={i}>
                        <CourtLinkCard>
                            <Link key={court.id} to={`main/${court.alias}`}>
                                <div>
                                    <h2>{court.name}</h2>
                                </div>
                            </Link>
                        </CourtLinkCard>
                    </CourtCard>
                )
            })
        }
        </>
    )
}

export default CourtList;