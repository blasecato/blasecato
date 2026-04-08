import { useRef, useEffect } from 'react';
import Map, { Marker, NavigationControl } from 'react-map-gl/mapbox';
import mapboxgl from 'mapbox-gl';
import { useTheme } from '@/contexts/ThemeContext';
import { useTranslation } from 'react-i18next';
import { MapPin } from 'lucide-react';
import 'mapbox-gl/dist/mapbox-gl.css';

const BOGOTA = { longitude: -74.0721, latitude: 4.7110 };
const TOKEN = import.meta.env.VITE_MAPBOX_TOKEN as string;

export function MapSection() {
  const { theme } = useTheme();
  const { t } = useTranslation();
  const isDark = theme === 'dark';
  const mapStyle = isDark
    ? 'mapbox://styles/mapbox/satellite-streets-v12'
    : 'mapbox://styles/mapbox/satellite-streets-v12';

  const mapRef = useRef<mapboxgl.Map | null>(null);

  // Add atmosphere/fog on map load for globe effect
  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;
    map.setFog({
      color: isDark ? 'rgb(10, 10, 30)' : 'rgb(186, 210, 235)',
      'high-color': isDark ? 'rgb(20, 20, 60)' : 'rgb(36, 92, 223)',
      'horizon-blend': 0.08,
      'space-color': isDark ? 'rgb(5, 5, 20)' : 'rgb(220, 235, 255)',
      'star-intensity': isDark ? 0.6 : 0.1,
    });
  }, [isDark, mapRef.current]);

  return (
    <section className="mb-20 w-full bg-background transition-colors duration-300 px-6 pb-0">
      <div className="mx-auto max-w-[1300px]">
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <MapPin className="h-5 w-5 text-foreground/50" />
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-foreground/40 font-medium">
              {t('map.based')}
            </p>
            <h3 className="text-lg font-semibold text-foreground leading-tight">
              {t('map.location')}
            </h3>
          </div>
        </div>

        {/* Map container */}
        <div className="relative w-full h-[520px] rounded-3xl overflow-hidden border border-foreground/10">
          <Map
            ref={(ref) => { if (ref) mapRef.current = ref.getMap(); }}
            mapboxAccessToken={TOKEN}
            initialViewState={{
              longitude: BOGOTA.longitude,
              latitude: BOGOTA.latitude,
              zoom: 3.5,
              pitch: 45,
              bearing: -20,
            }}
            style={{ width: '100%', height: '100%' }}
            mapStyle={mapStyle}
            attributionControl={false}
            projection="globe"
            onLoad={(e) => {
              const map = e.target;
              map.setFog({
                color: isDark ? 'rgb(10, 10, 30)' : 'rgb(186, 210, 235)',
                'high-color': isDark ? 'rgb(20, 20, 60)' : 'rgb(36, 92, 223)',
                'horizon-blend': 0.08,
                'space-color': isDark ? 'rgb(5, 5, 20)' : 'rgb(220, 235, 255)',
                'star-intensity': isDark ? 0.6 : 0.1,
              });
            }}
          >
            <NavigationControl position="top-right" showCompass={false} />

            {/* Marker */}
            <Marker longitude={BOGOTA.longitude} latitude={BOGOTA.latitude} anchor="bottom">
              <div className="flex flex-col items-center">
                <div className="relative flex h-8 w-8 items-center justify-center rounded-full bg-white shadow-lg shadow-black/50">
                  <MapPin className="h-4 w-4 text-red-500" />
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white opacity-40" />
                </div>
                <div className="mt-1.5 rounded-xl border border-white/20 bg-black/70 backdrop-blur px-2.5 py-1 text-center shadow-lg">
                  <p className="text-[11px] font-semibold text-white leading-tight">Bogotá, Colombia</p>
                  <p className="text-[9px] text-white/50">D.C.</p>
                </div>
              </div>
            </Marker>
          </Map>
        </div>
      </div>
    </section>
  );
}
