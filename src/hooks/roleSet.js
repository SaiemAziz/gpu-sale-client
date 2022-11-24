const roleSet = (email, role = 'buyer', photoURL, displayName) => {
    fetch(`${process.env.REACT_APP_URL}/role-set?email=${email}&role=${role}&displayName=${displayName}&photoURL=${photoURL}`)
    .then(res => res.json())
    .then(data => (data))
};

export default roleSet;