const roleSet = (email, role = 'buyer') => {
    fetch(`${process.env.REACT_APP_URL}/role-set?email=${email}&role=${role}`)
    .then(res => res.json())
    .then(data => (data))
};

export default roleSet;