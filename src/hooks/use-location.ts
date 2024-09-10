import { useState, useEffect } from "react";
import type { Coords, Location } from "../../types/prayer-types";
export function useLocation() {
  const [coords, setCoords] = useState<Coords>();
  const [errorMessage, setErrorMessage] = useState<string>("");
  useEffect(() => {
    if (typeof window !== "undefined") {
      navigator.geolocation.getCurrentPosition(
        ({ coords }: Location) => {
          setCoords({ latitude: coords.latitude, longitude: coords.longitude });
          setErrorMessage("");
        },
        (error: GeolocationPositionError) => {
          let message = "";
          switch (error.code) {
            case error.PERMISSION_DENIED:
              message = "تم رفض إذن تحديد الموقع الجغرافي.";
              break;
            case error.POSITION_UNAVAILABLE:
              message = "معلومات الموقع غير متوفرة.";
              break;
            case error.TIMEOUT:
              message = "انتهت مهلة طلب الحصول على موقع المستخدم.";
              break;
            default:
              message = "";
          }
          setErrorMessage(message);
        }
      );
    }
  }, []);
  return {
    coords,
    errorMessage,
  };
}
