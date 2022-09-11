import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { HeritageListContext } from '../context/heritageListContext';
import { v4 as uuidv4 } from 'uuid';
import 'leaflet/dist/leaflet.css';
import markerIconPng from "leaflet/dist/images/marker-icon.png"
import { Icon } from 'leaflet'
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import BackToTop from './BackToTop';

function ListingDetails() {
    const params = useParams();
    const list = useContext(HeritageListContext);
    const [details, setDetails] = useState(false);
    const [map, setMap] = useState(null);

    useEffect(() => {
        if (list) {
            const result = list.find(item => +item.id === +params.id);
            setDetails(result);
        }
    }, [list, params.id])

    useEffect(() => {
        if (map && details) {
            map.setView([details.coords.lat, details.coords.lon], 8);
        }
    }, [map, details]);


    return (
        <article>
            {details && (
                <article className="text-start bg-light p-4">
                    <p><span className="text-dark fw-bold">{`Name: `}</span>{details.descTitleTxt}</p>
                    <p className="text-dar fw-bold">{`Location: ${details.locationArr[0]}`} <img className="img-fluid" src={`https://whc.unesco.org${details.locationArr[1]}`} alt="" width="50px" height="20px" /></p>
                    <p><span className="text-dark fw-bold">{`description: `}</span>{details.descParaTxt}</p>
                    <img src={details.mainImg} className="img-fluid my-2" alt="place-image" />
                    {
                        details.text.map(t => (
                            <p className="text-dark fw-normal" key={uuidv4()}>{t}</p>
                        ))
                    }
                    <div style={{ width: '100%', height: '300px',marginBottom:"20px" }}>
                        <MapContainer style={{ height: '300px', width: "100%" }}
                            // conter={[details.coords.lat,details.coords.lon]}
                            zoom={13} scrollWheelZoom={false}
                            ref={setMap}
                        >
                            <TileLayer
                                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            />
                            <Marker
                                icon={new Icon({ iconUrl: markerIconPng, iconSize: [25, 41], iconAnchor: [12, 41] })}
                                position={[details.coords.lat, details.coords.lon]}>
                                <Popup>
                                    {details.locationArr[0]}
                                </Popup>
                            </Marker>
                        </MapContainer>
                    </div>
                    <BackToTop />
                </article>
            )}
        </article>
    )







}

export default ListingDetails


{/* <div>
{details && (
    {
        details.text.map(t => (
            <p className="text-dark fw-normal" key={uuidv4()}>{t}</p>
        ))
    }
    <article className="text-start bg-light p-4">
        <p><span className="text-dark fw-bold">{`Name: `}</span>{details.descTitleTxt}</p>
        <p className="text-dar fw-bold">{`Location: ${details.locationArr[0]}`} <img className="img-fluid" src={`https://whc.unesco.org${details.locationArr[1]}`} alt="" width="50px" height="20px" /></p>
        <p><span className="text-dark fw-bold">{`description: `}</span>{details.descParaTxt}</p>
        
        <img src={details.mainImg} className="img-fluid my-2" alt="place-image" />
       
        <div style={{ width: '100%', height: '300px' }}>
            <MapContainer style={{ height: '300px', width: "100%" }}
                // conter={[details.coords.lat,details.coords.lon]}
                zoom={13} scrollWheelZoom={false}
                ref={setMap}
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker
                    icon={new Icon({ iconUrl: markerIconPng, iconSize: [25, 41], iconAnchor: [12, 41] })}
                    position={[details.coords.lat, details.coords.lon]}>
                    <Popup>
                        {details.locationArr[0]}
                    </Popup>
                </Marker>
            </MapContainer>
        </div>

    </article>
    
)}
</div> */}