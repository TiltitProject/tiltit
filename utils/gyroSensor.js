import { useState, useEffect } from "react";
import { Gyroscope } from "expo-sensors";

export const gyroSensor = (setData) => {
  const [subscription, setSubscription] = useState(null);

  Gyroscope.setUpdateInterval(16);

  const _subscribe = () => {
    setSubscription(
      Gyroscope.addListener((gyroscopeData) => {
        setData(gyroscopeData);
      }),
    );
  };

  const _unsubscribe = () => {
    subscription && subscription.remove();
    setSubscription(null);
  };

  useEffect(() => {
    _subscribe();
    return () => _unsubscribe();
  }, []);
};
