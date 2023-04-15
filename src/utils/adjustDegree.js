
const adjustDegree = (result) => {
  const { beta, gamma } = result.rotation;
  const degree45 = 0.785;
  const LIMIT_INPUT = 8;
  const responsiveNess = 10;
  const limitDegree = LIMIT_INPUT / responsiveNess;

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
