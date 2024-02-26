// selects section where all repo info appears
const repos = document.querySelector(".repos");

// selects section where indiviual repo data will appear
const repoData = document.querySelector(".repo-data");

// ul  to display the repos list
const reposList = document.querySelector(".repo-list");

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
  fetchRepos();
};

const fetchRepos = async function () {
  const res = await fetch(`https://api.github.com/users/${username}/repos`);
  const json = await res.json();
  console.log(json);

  displayRepoInfo(json);
};

const displayRepoInfo = function (repos) {
  repos.forEach(function (repo) {
    const li = document.createElement("li");
    li.classList.add("repo");
    li.innerHTML = `<h3>${repo.name}</h3>`;
    reposList.append(li);
  });
};

reposList.addEventListener("click", function (e) {
  if (e.target.matches("h3")) {
    const repoName = e.target.innerText;
    getRepoInfo(repoName);
  }
});

const getRepoInfo = async function (repoName) {
  const res = await fetch(
    `https://api.github.com/repos/${username}/${repoName}`
  );
  const repoInfo = await res.json();
  console.log(repoInfo);

  const fetchLanguages = await fetch(`${repoInfo.languages_url}`);
  const languageData = await fetchLanguages.json();
  console.log(languageData);

  const languages = [];
  for (let key in languageData) {
    languages.push(key);
  }
  console.log(languages);
};
