import React, { useEffect, useRef, useState, useImperativeHandle, ForwardRefRenderFunction } from 'react';
import 'ol/ol.css';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';

interface MapComponentProps {
  onLocationSelect: (lat: number, lon: number) => void;
}

const MapComponent: ForwardRefRenderFunction<any, MapComponentProps> = ({ onLocationSelect }, ref) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<Map | null>(null);

  useImperativeHandle(ref, () => ({
    onLocationSelect: (lat: number, lon: number) => {
      if (map) {
        map.on('click', (event) => {
          const lonLat = event.coordinate;
          const lon = lonLat[0];
          const lat = lonLat[1];
          onLocationSelect(lat, lon);
        });
      }
    }
  }));

  useEffect(() => {
    if (mapRef.current) {
      const newMap = new Map({
        target: mapRef.current,
        layers: [
          new TileLayer({
            source: new OSM(),
          }),
        ],
        view: new View({
          center: [0, 0],
          zoom: 2,
        }),
      });
      setMap(newMap);
    }
  }, []);

  return <div ref={mapRef} style={{ width: '100%', height: '400px' }} />;
};

export default React.forwardRef(MapComponent);
