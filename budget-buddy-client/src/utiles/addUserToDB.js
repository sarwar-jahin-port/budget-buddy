const addUserToDB = (result) => {
    fetch("http://localhost:3000/add-user", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ "email": result?.user?.email })
        })
          .then(res => res.json())
          .then(data => console.log(data))
}

export default addUserToDB;