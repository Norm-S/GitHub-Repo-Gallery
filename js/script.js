// div where your profile information will appear
const overview = document.querySelector(".overview");

const username = "Norm-S";

const fetchUserProfile = async function () {
  const res = await fetch(`https://api.github.com/users/${username}`);
  const data = await res.json();

  console.log(data);
};

fetchUserProfile();
