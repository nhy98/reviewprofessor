/**
 * @author caott
 */

function setLoadingPopup(loading) {
    return { type: "IS_LOADING", loading };
}

const loadingAction = {
    setLoadingPopup
  }

export default loadingAction;