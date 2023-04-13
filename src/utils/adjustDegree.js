
const adjustDegree = (result) => {
  const { beta, gamma } = result.rotation;
  const degree45 = 0.785;
  const LIMIT_INPUT = 5.5;
  const responsiveNess = 7;
  const limitDegree = LIMIT_INPUT / 7;

  let applyGamma = gamma;
  let applyBeta = beta - degree45;

  if (gamma > limitDegree) {
    applyGamma = limitDegree;
  }
  if (gamma < -limitDegree) {
    applyGamma = -limitDegree;
  }
  if (beta - degree45 > limitDegree) {
    applyBeta = limitDegree;
  }
  if (beta - degree45 < -limitDegree) {
    applyBeta = -limitDegree;
  }

  return { applyGamma, applyBeta, responsiveNess };
};

export default adjustDegree;
