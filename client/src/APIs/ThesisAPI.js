const subParentURL = '/thesis';
import FetchAPIs from "./FetchAPIs";

const ThesisAPI = {
    addOrUpdateThesisRequest: async (thesis) => await FetchAPIs.post(subParentURL + '/edit', thesis),
}

export default ThesisAPI;