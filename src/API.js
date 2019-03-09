const FETCH_MEMBERSHIP_FEE_URL = 'https://cxynbjn3wf.execute-api.eu-west-2.amazonaws.com/production/config';
const POST_USER_DATA_URL = 'https://cxynbjn3wf.execute-api.eu-west-2.amazonaws.com/production/flatbond';

export const fetchMembershipFee = async () => {
    const response = await fetch(FETCH_MEMBERSHIP_FEE_URL);
    return response.json()
};

export const postUserData = async (userData) => {
    const response = await fetch(POST_USER_DATA_URL, {
        method: 'POST',
        header: {
            "Content-Type": "application/json",
        },
        body: {
            userData: JSON.stringify(userData)
        }
    });

    return response.json();
};