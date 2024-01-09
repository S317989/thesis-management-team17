const subParentURL = '/thesis';
import FetchAPIs from "./FetchAPIs";

const ThesisAPI = {
    addOrUpdateThesisRequest: async (thesis) => await FetchAPIs.post(subParentURL + '/edit', thesis),
    getThesisBySupervisor: async () => await FetchAPIs.get(subParentURL + '/current-supervisor'),
    setThesisRequestStatus: async (thesisId, status) => await FetchAPIs.post(subParentURL + '/set-status', {thesisId: thesisId, status: status}),
    getThesis: async (thesisId) => await FetchAPIs.get(subParentURL + '/get/' + thesisId)
}

export default ThesisAPI;