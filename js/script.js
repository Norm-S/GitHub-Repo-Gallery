// ul  to display the repos list
const reposList = document.querySelector(".repos-list");

// div where your profile information will appear
const overview = document.querySelector(".overview");

const username = "Norm-S";

const fetchUserProfile = async function () {
  const res = await fetch(`https://api.github.com/users/${username}`);
  const data = await res.json();

  displayUserInfo(data);
};

fetchUserProfile();

const displayUserInfo = function (json) {
  const div = document.createElement("div");
  div.classList.add("user-info");
  div.innerHTML = `
    <figure>
      <img alt="user avatar" src=${json.avatar_url} />
    </figure>
    <div>
      <p><strong>Name:</strong> ${json.name}</p>
      <p><strong>Bio:</strong> ${json.bio}</p>
      <p><strong>Location:</strong> ${json.location}</p>
      <p><strong>Number of public repos:</strong> ${json.public_repos}</p>
    </div>
    `;
  overview.append(div);
};

const fetchRepo = async function () {
  const res = await fetch(`https://api.github.com/users/${username}/repos`);
  const json = await res.json();
  // console.log(json);
};
