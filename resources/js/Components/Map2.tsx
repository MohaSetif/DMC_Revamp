import React, { forwardRef, useImperativeHandle, useRef, useEffect } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

interface MapComponentProps {
  onLocationSelect: (lat: number, lon: number) => void;
  height: number;
  width: string | number;
  initialLat: number;
  initialLon: number;
}

const MapComponent = forwardRef<{ setLocation: (lat: number, lon: number) => void }, MapComponentProps>(
  ({ onLocationSelect, height, width, initialLat = 0, initialLon = 0 }, ref) => {
    const mapRef = useRef<L.Map | null>(null);
    const markerRef = useRef<L.Marker | null>(null);

    useEffect(() => {
      if (!mapRef.current) {
        mapRef.current = L.map('map').setView([initialLat, initialLon], 13);

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '© OpenStreetMap contributors'
        }).addTo(mapRef.current);

        mapRef.current.on('click', (e: L.LeafletMouseEvent) => {
          const { lat, lng } = e.latlng;
          onLocationSelect(lat, lng);
          if (markerRef.current) {
            markerRef.current.setLatLng([lat, lng]);
          } else {
            markerRef.current = L.marker([lat, lng]).addTo(mapRef.current!);
          }
        });
      }

      return () => {
        if (mapRef.current) {
          mapRef.current.remove();
          mapRef.current = null;
        }
      };
    }, [onLocationSelect, initialLat, initialLon]);

    useImperativeHandle(ref, () => ({
      setLocation: (lat: number, lon: number) => {
        if (mapRef.current) {
          mapRef.current.setView([lat, lon], 13);
          if (markerRef.current) {
            markerRef.current.setLatLng([lat, lon]);
          } else {
            markerRef.current = L.marker([lat, lon]).addTo(mapRef.current);
          }
        }
      }
    }));

    return <div id="map" style={{ height, width }} />;
  }
);

export default MapComponent;
