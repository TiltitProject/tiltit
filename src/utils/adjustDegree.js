
const adjustDegree = (result, initialRotation) => {
  const { beta, gamma } = result.rotation;
  const degree45 = 0.785;
  const LIMIT_INPUT = 10;
  const responsiveNess = 11;
  const limitDegree = LIMIT_INPUT / responsiveNess;

  let applyGamma = gamma - initialRotation.gamma;
  let applyBeta = beta - initialRotation.beta;

  if (gamma - initialRotation.gamma > limitDegree) {
    applyGamma = limitDegree;
  }
  if (gamma - initialRotation.gamma < -limitDegree) {
    applyGamma = -limitDegree;
  }
  if (beta - initialRotation.beta > limitDegree) {
    applyBeta = limitDegree;
  }
  if (beta - initialRotation.beta < -limitDegree) {
    applyBeta = -limitDegree;
  }

  return { applyGamma, applyBeta, responsiveNess };
};

export default adjustDegree;
