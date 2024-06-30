import React, { useEffect, useRef } from 'react';
import 'ol/ol.css';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import { fromLonLat, transform } from 'ol/proj';
import { Point } from 'ol/geom';
import { Feature } from 'ol';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import { Style, Circle, Fill, Stroke } from 'ol/style';

interface MapProps {
  onLocationUpdate: (lat: number, lon: number) => void;
  center: [number, number];
}

const MapComponent: React.FC<MapProps> = ({ onLocationUpdate, center }) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const map = useRef<Map | null>(null);
  const markerLayer = useRef<VectorLayer<VectorSource> | null>(null);

  useEffect(() => {
    if (!map.current && mapRef.current) {
      map.current = new Map({
        target: mapRef.current,
        layers: [
          new TileLayer({
            source: new OSM(),
          }),
        ],
        view: new View({
          center: fromLonLat(center),
          zoom: 8,
        }),
      });

      markerLayer.current = new VectorLayer({
        source: new VectorSource(),
        style: new Style({
          image: new Circle({
            radius: 6,
            fill: new Fill({ color: 'blue' }),
            stroke: new Stroke({ color: 'white', width: 2 }),
          }),
        }),
      });

      map.current.addLayer(markerLayer.current);

      map.current.on('click', (event) => {
        const clickedCoord = transform(event.coordinate, 'EPSG:3857', 'EPSG:4326');
        updateMarker(clickedCoord[1], clickedCoord[0]);
      });
    }

    return () => {
      if (map.current) {
        map.current.setTarget(undefined);
        map.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (map.current) {
      map.current.getView().setCenter(fromLonLat(center));
      updateMarker(center[1], center[0]);
    }
  }, [center]);

  const updateMarker = (lat: number, lon: number) => {
    if (markerLayer.current) {
      const source = markerLayer.current.getSource();
      if (source) {
        source.clear();
        const marker = new Feature({
          geometry: new Point(fromLonLat([lon, lat]))
        });
        source.addFeature(marker);
      }
    }
    onLocationUpdate(lat, lon);
  };

  const handleGetLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          updateMarker(latitude, longitude);
          if (map.current) {
            map.current.getView().setCenter(fromLonLat([longitude, latitude]));
            map.current.getView().setZoom(15);
          }
        },
        (error) => {
          console.error('Error getting location:', error.message);
        }
      );
    } else {
      console.error('Geolocation is not supported by this browser.');
    }
  };

  return (
    <div className="space-y-2">
      <button
        type="button"
        onClick={handleGetLocation}
        className="inline-flex items-center px-4 py-2 bg-gray-800 dark:bg-gray-200 border border-transparent rounded-md font-semibold text-xs text-white dark:text-gray-800 uppercase tracking-widest hover:bg-gray-700 dark:hover:bg-white focus:bg-gray-700 dark:focus:bg-white active:bg-gray-900 dark:active:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 transition ease-in-out duration-150"
      >
        تحديد الموقع
      </button>
      <div ref={mapRef} className="w-full h-64 rounded-lg overflow-hidden"></div>
    </div>
  );
};

export default MapComponent;