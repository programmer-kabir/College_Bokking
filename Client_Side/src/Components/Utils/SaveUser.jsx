export const saveUser = (user) => {
  const currentUser = {
    name: user.displayName,
    email: user.email,
    photo: user.photoURL,
  };
  console.log(user);
  fetch(`http://localhost:3000/users`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(currentUser),
  })
    .then((res) => res.json())
   
};
