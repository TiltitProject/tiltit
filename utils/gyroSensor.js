import { useState, useEffect } from "react";
import { Gyroscope } from "expo-sensors";

const useGyroSensor = (setData) => {
  const [subscription, setSubscription] = useState(null);

  Gyroscope.setUpdateInterval(16);

  const subscribe = () => {
    setSubscription(
      Gyroscope.addListener((gyroscopeData) => {
        setData(gyroscopeData);
      }),
    );
  };

  const unsubscribe = () => {
    if (subscription) {
      subscription.remove();
    }
    setSubscription(null);
  };

  useEffect(() => {
    subscribe();
    return () => unsubscribe();
  }, []);
};

export default useGyroSensor;
