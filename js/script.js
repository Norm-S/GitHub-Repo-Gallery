// selects "Back to Rep Gallery" button
const button = document.querySelector(".view-repos");

// selects input with the "Search by name" placeholder
const filterInput = document.querySelector(".filter-repos");

// selects section where all repo info appears
const reposSection = document.querySelector(".repos");

// selects section where indiviual repo data will appear
const repoData = document.querySelector(".repo-data");

// selects ul to display the repos list
const reposList = document.querySelector(".repo-list");

// selects div where your profile information will appear
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
  // console.log(json);

  displayRepoInfo(json);
};

const displayRepoInfo = function (repos) {
  for (const repo of repos) {
    const li = document.createElement("li");
    li.classList.add("repo");
    li.innerHTML = `<h3>${repo.name}</h3>`;
    reposList.append(li);
  }

  filterInput.classList.remove("hide");
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
  // console.log(repoInfo);

  const fetchLanguages = await fetch(`${repoInfo.languages_url}`);
  const languageData = await fetchLanguages.json();
  // console.log(languageData);

  const languages = [];
  for (const key in languageData) {
    languages.push(key);
  }
  // console.log(languages);

  displayTargetRepoInfo(repoInfo, languages);
};

const displayTargetRepoInfo = function (repoInfo, languages) {
  repoData.innerHTML = "";

  const div = document.createElement("div");
  div.innerHTML = `
  <h3>Name: ${repoInfo.name}</h3>
  <p>Description: ${repoInfo.description}</p>
  <p>Default Branch: ${repoInfo.default_branch}</p>
  <p>Languages: ${languages.join(", ")}</p>
  <a class="visit" href="${
    repoInfo.html_url
  }" target="_blank" rel="noreferrer noopener">View Repo on GitHub!</a>
  `;

  repoData.append(div);
  repoData.classList.remove("hide");
  reposSection.classList.add("hide");
  button.classList.remove("hide");
};

button.addEventListener("click", function () {
  reposSection.classList.remove("hide");
  repoData.classList.add("hide");
  button.classList.add("hide");
});

filterInput.addEventListener("input", function (e) {
  const searchField = e.target.value;
  // console.log(searchField);

  const repos = document.querySelectorAll(".repo");
  const searchTerm = searchField.toLowerCase();

  for (const repo of repos) {
    const title = repo.innerText.toLowerCase();
    if (title.includes(searchTerm)) {
      repo.classList.remove("hide");
    } else {
      repo.classList.add("hide");
    }
  }
});
