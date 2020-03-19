/**
 * @author thucvv
 */

function setCorrelation(correlation) {
  return { type: "SET_CORRELATION", correlation };
}

function resetCorrelationState() {
  return { type: "RESET_CORRELATION_STATE" };
}

function initReport(labels, data, colors) {
  return { type: "INIT_STATE", labels, data, colors };
}

const correlationAction = {
  setCorrelation,
  resetCorrelationState,
  initReport
};

export default correlationAction;
