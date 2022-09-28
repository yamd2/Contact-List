const apiUrl = "https://randomuser.me/api/?";
let userList = [];

const displayElm = document.querySelector("#list");

const fetchUsers = (params = "results=20") => {
  fetch(apiUrl + params)
    .then((response) => response.json())
    .then((data) => {
      display(data.results);
      userList = data.results;
    })
    .catch((error) => {
      console.log(error);
    });
};

const display = (users) => {
  let str = "";
  console.log(users);
  users.map((item, i) => {
    str += `
            <div class="card m-2" style="width: 20rem">
            <img src="${item.picture.large}" class="card-img-top" alt="..." />
            <div class="card-body">
            <h5 class="card-title">
            ${item.name.title}  ${item.name.first}  ${item.name.last}
            </h5>
            <p class="card-text">
            <ul class='list-unstyled'>
            <li> <i class="fa-solid fa-mobile"></i> ${item.phone} </li>
            <li > <i class="fa-solid fa-envelope"></i> ${item.email}</li>
            <li> <i class="fa-solid fa-calendar-days"></i> ${item.dob.date}</li>
            <li class="d-flex> <i class="fa-solid fa-house"></i> ${item.location.street.number} ${item.location.street.name}, ${item.location.postcode},  ${item.location.state}</li>
            </ul>   
            
            </p>
            
            </div>
            </div>
`;
  });

  displayElm.innerHTML = str;

  document.querySelector("#count").innerText = users.length;
};

fetchUsers();

const handleOnChage = (e) => {
  console.log(e.value);
  const params = "results=20&gender=" + e.value;
  fetchUsers(params);
};

const handleOnSearch = (e) => {
  console.log(e.value);
  const str = e.value;

  const filteredUser = userList.filter((item) => {
    const userName = item.name.first + item.name.last;

    return userName.toLowerCase().includes(str.toLowerCase());
  });

  display(filteredUser);
};
