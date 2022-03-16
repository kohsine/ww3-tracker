import React, { useRef, useState } from 'react';
import GoogleMapReact from 'google-map-react';
import MapMarker from './marker';
import { mapPoints } from '../../../utils/testData';
import useSupercluster from 'use-supercluster';
import { ukrainePoly } from './ukraine-poly-reduced';
import { Button } from '@mui/material';

/**
 * Much of this code is taken from the example at https://www.leighhalliday.com/google-maps-clustering
**/

const clusterStyle = {
    color: "#fff",
    background: "#a11b1b",
    borderRadius: "50%",
    padding: "10px",
    width: "10px",
    height: "10px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontSize: "15px",
    fontWeight: "900",
}

const pointStyle = {
    transform: "translate(-50%, -50%)",
}

export default function Map(props) {
    const mapRef = useRef();
    const [bounds, setBounds] = useState(null);
    const [zoom, setZoom] = useState(10);
    const [clickMarker, setClickMarker] = useState(null);

    const points = mapPoints;
    const { clusters, supercluster } = useSupercluster({
        points,
        bounds,
        zoom,
        options: { radius: 75, maxZoom: 15 }
    });

    const {
        onMarkerClick = () => { },
        onMapClick = (lat, lng) => { },
        style = { width: "100vw", height: "100vh" }
    } = props;

    return <>
        <div style={style}>
            {
                clickMarker &&
                <Button style={{ position: 'absolute', top: '5px', left: '50%', transform: 'translate(-50%, 0)', zIndex: 10 }} variant="contained" onClick={() => { setClickMarker(null) }}>
                    Clear marker (right click)
                </Button>
            }

            <GoogleMapReact
                bootstrapURLKeys={{ key: "AIzaSyDELfmgebaV3wanKz383-IKuAl6HcIPwMA" }}
                defaultCenter={{
                    lat: 48.4,
                    lng: 31.3
                }}
                defaultZoom={6}
                yesIWantToUseGoogleMapApiInternals
                onGoogleApiLoaded={({ map, maps }) => {
                    mapRef.current = map;

                    const polygon = new maps.Polygon({
                        paths: ukrainePoly,
                        strokeColor: "#FF0000",
                        strokeOpacity: 0.8,
                        strokeWeight: 3,
                        fillColor: "#FF0000",
                        fillOpacity: 0.15
                    });

                    maps.event.addListener(map, 'contextmenu', (e) => {
                        setClickMarker(null)
                        onMapClick(null)
                    });
                    maps.event.addListener(polygon, 'contextmenu', (e) => {
                        setClickMarker(null)
                        onMapClick(null)
                    });

                    polygon.setMap(map)
                }}
                onChange={({ zoom, bounds }) => {
                    setZoom(zoom);
                    setBounds([bounds.nw.lng, bounds.se.lat, bounds.se.lng, bounds.nw.lat]);
                }}
                onClick={({ x, y, lat, lng, event }) => {
                    setClickMarker({ lat, lng });
                    onMapClick({lat, lng});
                }}
            >

                {
                    clickMarker &&
                    <MapMarker
                        lat={clickMarker.lat}
                        lng={clickMarker.lng}
                        style={{...pointStyle, pointerEvents: 'none'}}
                        size={36}
                        color={'#2D4263'}
                    />
                }


                {clusters.map(cluster => {
                    const [longitude, latitude] = cluster.geometry.coordinates;
                    const { cluster: isCluster, point_count: pointCount } = cluster.properties;

                    if (isCluster) {
                        return (
                            <div
                                key={cluster.name}
                                lat={latitude}
                                lng={longitude}
                                style={clusterStyle}
                                onClick={() => {
                                    const expansionZoom = Math.min(
                                        supercluster.getClusterExpansionZoom(cluster.id),
                                        20
                                    );
                                    mapRef.current.setZoom(expansionZoom);
                                    mapRef.current.panTo({ lat: latitude, lng: longitude });
                                }}
                            >
                                {pointCount}
                            </div>
                        );
                    }
                    return (
                        <MapMarker
                            key={cluster.properties.name}
                            lat={latitude}
                            lng={longitude}
                            style={pointStyle}
                            size={36}
                            color={'#fa2020'}
                            onClick={() => onMarkerClick(cluster.properties)}
                        />
                    );
                })
                }


            </GoogleMapReact>
        </div>
    </>
}
