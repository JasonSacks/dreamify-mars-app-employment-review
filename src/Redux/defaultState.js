export const defaultAccount = {
    acountid: 0,
    email: '', 
    Avatar: '',
    firstName : '', 
    lastName: '', 
    address1: '', 
    address2: '', 
    city: '', 
    state: '', 
    postalCode: '', 
    phoneNumber: '' 
};

const defaultDate = new Date('2021-02-21');

const defaultState = {
    landingDate:  new Date('2021-02-19'),
    marsImages: [],
    marsIndex: 0,
    marsPage: 1,
    isMarsComplete: false,
    marsLoaded: false,
    earthDate: defaultDate.toISOString(),
    dreamImages: [],
    dreamIndex: 0,
    dreamPage: 1,
    lastDreamId: 0,
    isDreamPageComplete: false,
    dreamsLoaded: false,
    account: defaultAccount,
    accountLoaded: false,
    credits: {value:0, accountId: 0, lastRestDate:'1970-01-01'},
    creditLoadedDate: null,
    token: '',
    isWorking: false,
    workingText: 'Image Processing in Deep Dream',
    alert: ''
};

export default defaultState;