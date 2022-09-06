
export const api = {
    addClient: jest.fn(() => Promise.resolve(1)),
    updateClient: jest.fn(() => Promise.resolve()),
    deleteClient: jest.fn(() => Promise.resolve()),
    getHistory: jest.fn(() => Promise.resolve('')),
    updateHistory: jest.fn(() => Promise.resolve()),
};

const Api = jest.fn(() => api);

export default Api;
