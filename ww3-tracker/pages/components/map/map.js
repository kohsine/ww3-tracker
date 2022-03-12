import React, { useRef, useState } from 'react';
import GoogleMapReact from 'google-map-react';
import MapMarker from './marker';
import { mapPoints } from '../../../utils/testData';
import useSupercluster from 'use-supercluster';


/**
 * Much of this code is taken from the example at https://www.leighhalliday.com/google-maps-clustering
**/

const clusterStyle = {
    color: "#fff",
    background: "#197878",
    borderRadius: "50%",
    padding: "10px",
    width: "15px",
    height: "15px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontSize: "15px",
    fontWeight: "900",
}

const pointStyle = {}

export default function Map(props) {
    const mapRef = useRef();
    const [bounds, setBounds] = useState(null);
    const [zoom, setZoom] = useState(10);

    const points = mapPoints;
    const { clusters, supercluster } = useSupercluster({
        points,
        bounds,
        zoom,
        options: { radius: 75, maxZoom: 15 }
    });

    const { onMarkerClick = () => {}} = props;


    return <>
        <div style={{ height: '100vh', width: '100%' }}>

            <GoogleMapReact
                bootstrapURLKeys={{ key: "AIzaSyDELfmgebaV3wanKz383-IKuAl6HcIPwMA" }}
                defaultCenter={{
                    lat: 49.15,
                    lng: 30.43
                }}
                defaultZoom={7}
                yesIWantToUseGoogleMapApiInternals
                onGoogleApiLoaded={({ map }) => { mapRef.current = map }}
                onChange={({ zoom, bounds }) => {
                    setZoom(zoom);
                    setBounds([bounds.nw.lng, bounds.se.lat, bounds.se.lng, bounds.nw.lat]);
                }}
            >

                {clusters.map(cluster => {
                    console.log(cluster)
                    const [longitude, latitude] = cluster.geometry.coordinates;
                    const { cluster: isCluster, point_count: pointCount } = cluster.properties;

                    if (isCluster) {
                        return (
                            <div
                                key={cluster.id}
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
                            key={cluster.properties.id}
                            lat={latitude}
                            lng={longitude}
                            style={pointStyle}
                            size={30}
                            color={'#1976d2'}
                            onClick={() => onMarkerClick(cluster.properties)}
                        />
                    );
                })
                }


            </GoogleMapReact>
        </div>
    </>
}
