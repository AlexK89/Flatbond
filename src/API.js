const FETCH_MEMBERSHIP_FEE_URL = "https://cxynbjn3wf.execute-api.eu-west-2.amazonaws.com/production/config";

export const fetchMembershipFee = async () => {
    const response = await fetch(FETCH_MEMBERSHIP_FEE_URL);
    return response.json()
};