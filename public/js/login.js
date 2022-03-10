const login = async (email, password) => {
  const res = await axios({
    method: "POST",
    url: "http://127.0.0.1:8000/api/v1/users/login",
    data: {
      email,
      password,
    },
  });

  if (res.data.status === "success") {
    showAlert("success", "logged in successfully");
    window.setTimeout(() => {
      location.assign("/");
    }, 1500);
  } else {
    showAlert("error", "Email or Password uncorrect");
  }
};

const showAlert = (type, msg) => {
  hideAlert();
  let markup = `<div class="alert alert--${type}">${msg}</div>`;
  document.querySelector("body").insertAdjacentHTML("afterbegin", markup);
  window.setTimeout(hideAlert, 5000);
};
const hideAlert = () => {
  const el = document.querySelector(".alert");
  if (el) el.parentElement.removeChild(el);
};

const logOutBtn = document.querySelector(".nav__el--logout");
const userDataForm = document.querySelector(".form-user-data");
const loginForm = document.querySelector(".form--login");
const userPasswordForm = document.querySelector(".form-user-password");
const signupform = document.querySelector(".form-signup");

const logout = async () => {
  try {
    const res = await axios({
      method: "GET",
      url: "http://127.0.0.1:8000/api/v1/users/logout",
    });
    if ((res.data.status = "success")) location.reload(true);
  } catch (err) {
    showAlert("error", err.response.data.message);
  }
};

const updateSettings = async (data, type) => {
  try {
    const url =
      type === "password"
        ? "http://127.0.0.1:8000/api/v1/users/updateMyPassword"
        : "http://127.0.0.1:8000/api/v1/users/updateMe";

    const res = await axios({
      method: "PATCH",
      url,
      data,
    });
    if (res.data.status === "success") {
      showAlert("success", `${type.toUpperCase()} updated successfully`);
      window.setTimeout(() => {
        location.reload(true);
      }, 1000);
    }
  } catch (err) {
    showAlert("error", err.response.data.message);
  }
};

const signup = async (name, email, password, passwordConfirm) => {
  const res = await axios({
    method: "POST",
    url: "http://127.0.0.1:8000/api/v1/users/signup",
    data: {
      name,
      email,
      password,
      passwordConfirm,
    },
  });

  if (res.data.status === "success") {
    showAlert("success", "sign up successfully");
    window.setTimeout(() => {
      location.assign("/");
    }, 1500);
  } else {
    showAlert("error", err.response.data.message);
  }
};
if (signupform)
  signupform.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const passwordConfirm = document.getElementById("password-confirm").value;
    signup(name, email, password, passwordConfirm);
  });

if (userDataForm)
  userDataForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const form = new FormData();
    form.append("name", document.getElementById("name").value);
    form.append("email", document.getElementById("email").value);
    form.append("photo", document.getElementById("photo").files[0]);
    console.log(form);
    updateSettings(form, "data");
  });

if (userPasswordForm)
  userPasswordForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const passwordCurrent = document.getElementById("password-current").value;
    const password = document.getElementById("password").value;
    const passwordConfirm = document.getElementById("password-confirm").value;
    await updateSettings(
      { passwordCurrent, password, passwordConfirm },
      "password"
    );
    document.getElementById("password-current").value = "";
    document.getElementById("password").value = "";
    document.getElementById("password-confirm").value = "";
  });

if (logOutBtn) logOutBtn.addEventListener("click", logout);
loginForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  login(email, password);
});
