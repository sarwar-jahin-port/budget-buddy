const checkUserDataStatus = async(email) =>{
    let userDataStatus = false;
    const res = await fetch(`http://localhost:3000/data-status/${email}`)
    const data = await res.json();
    data?.dataStatus ? userDataStatus=true : userDataStatus=false;
    return userDataStatus;
}

export default checkUserDataStatus;