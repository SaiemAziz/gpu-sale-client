// set auth token

const tokenSet = (email) => {
    fetch(`${process.env.REACT_APP_URL}/jwt?email=${email}`)
    .then(res => res.json())
    .then(data => localStorage.setItem('auth-token',data.authToken))
};

export default tokenSet;