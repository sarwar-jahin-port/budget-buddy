const convertTo24HourFormat = (time) =>{
    const [timePart, modifier] = time.split(" ");
    let [hours, minutes] = time.split(' ');
    if(hours == '12') hours='00';
    if(modifier==='PM' && hours !== '12') hours = parseInt(hours, 10) + 12;
    return `${hours}:${minutes}`;
}

export default convertTo24HourFormat;