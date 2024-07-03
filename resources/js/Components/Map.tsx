import React, { useEffect, useRef } from 'react';
import 'ol/ol.css';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import { fromLonLat } from 'ol/proj';

interface MapComponentProps {
  lat: number;
  lon: number;
}

const MapComponent: React.FC<MapComponentProps> = ({ lat, lon }) => {
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mapRef.current) return;

    const coords = fromLonLat([lon, lat]);

    const map = new Map({
      target: mapRef.current,
      layers: [
        new TileLayer({
          source: new OSM(),
        }),
      ],
      view: new View({
        center: coords,
        zoom: 12,
      }),
    });

    return () => {
      map.setTarget(undefined);
    };
  }, [lat, lon]);

  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${lat},${lon}`;

  return (
    <div className="flex flex-col items-center">
      <div ref={mapRef} style={{ width: '150px', height: '100px', border: '1px solid #ccc' }} />
      <a 
        href={googleMapsUrl} 
        target="_blank" 
        rel="noopener noreferrer" 
        className="mt-2 text-blue-600 hover:text-blue-800"
      >
        فتح في خرائط Google
      </a>
    </div>
  );
};

export default MapComponent;