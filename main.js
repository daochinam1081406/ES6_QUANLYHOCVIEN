class Person {
  constructor(name, address, code, email) {
    this.name = name;
    this.address = address;
    this.code = code;
    this.email = email;
  }
}

class Student extends Person {
  constructor(name, address, code, email, math, physics, chemistry) {
    super(name, address, code, email);
    this.type = "Student"; // Thêm type
    this.math = math;
    this.physics = physics;
    this.chemistry = chemistry;
  }

  calculateAverage() {
    return (this.math + this.physics + this.chemistry) / 3;
  }
}

class Employee extends Person {
  constructor(name, address, code, email, workDays, dailySalary) {
    super(name, address, code, email);
    this.type = "Employee"; // Thêm type
    this.workDays = workDays;
    this.dailySalary = dailySalary;
  }

  calculateSalary() {
    return this.workDays * this.dailySalary;
  }
}

class Customer extends Person {
  constructor(name, address, code, email, companyName, orderValue, rating) {
    super(name, address, code, email);
    this.type = "Customer"; // Thêm type
    this.companyName = companyName;
    this.orderValue = orderValue;
    this.rating = rating;
  }
}

class ListPerson {
  constructor() {
    const storedData = localStorage.getItem("personList");
    if (storedData) {
      const parsedData = JSON.parse(storedData);
      this.persons = parsedData.map((item) => {
        if (item.type === "Student") {
          return new Student(
            item.name,
            item.address,
            item.code,
            item.email,
            item.math,
            item.physics,
            item.chemistry
          );
        } else if (item.type === "Employee") {
          return new Employee(
            item.name,
            item.address,
            item.code,
            item.email,
            item.workDays,
            item.dailySalary
          );
        } else if (item.type === "Customer") {
          return new Customer(
            item.name,
            item.address,
            item.code,
            item.email,
            item.companyName,
            item.orderValue,
            item.rating
          );
        }
      });
    } else {
      this.persons = [];
    }
  }

  addPerson(person) {
    this.persons.push(person);
    this.saveToLocalStorage();
  }

  removePerson(code) {
    this.persons = this.persons.filter((person) => person.code !== code);
    this.saveToLocalStorage();
  }

  updatePerson(code, updatedPerson) {
    const index = this.persons.findIndex((person) => person.code === code);
    if (index !== -1) {
      this.persons[index] = updatedPerson;
      this.saveToLocalStorage();
    }
  }

  sortByFullName() {
    this.persons.sort((a, b) => a.name.localeCompare(b.name));
  }

  filterByUserType(userType) {
    return this.persons.filter((person) => person.type === userType);
  }

  saveToLocalStorage() {
    localStorage.setItem("personList", JSON.stringify(this.persons));
  }
}

document.addEventListener("DOMContentLoaded", function () {
  const personList = new ListPerson();

  const addPersonButton = document.getElementById("addPersonButton");
  const savePersonButton = document.getElementById("savePersonButton");

  const nameInput = document.getElementById("name");
  const addressInput = document.getElementById("address");
  const codeInput = document.getElementById("code");
  const emailInput = document.getElementById("email");
  const userTypeInput = document.getElementById("userType");

  // Lắng nghe sự kiện modal hiển thị
  $("#addPersonModal").on("shown.bs.modal", function () {
    const selectedUserType = userTypeInput.value;

    // Ẩn tất cả các trường nhập dữ liệu
    mathInput.style.display = "none";
    mathLabel.style.display = "none";
    physicsInput.style.display = "none";
    physicsLabel.style.display = "none";
    chemistryInput.style.display = "none";
    chemistryLabel.style.display = "none";
    workDaysInput.style.display = "none";
    workDaysLabel.style.display = "none";
    dailySalaryInput.style.display = "none";
    dailySalaryLabel.style.display = "none";
    companyNameInput.style.display = "none";
    companyNameLabel.style.display = "none";
    orderValueInput.style.display = "none";
    orderValueLabel.style.display = "none";
    ratingInput.style.display = "none";
    ratingLabel.style.display = "none";

    // Hiển thị các trường nhập dữ liệu dựa trên lựa chọn
    if (selectedUserType === "Student") {
      mathInput.style.display = "block";
      physicsInput.style.display = "block";
      chemistryInput.style.display = "block";
      mathLabel.style.display = "block";
      physicsLabel.style.display = "block";
      chemistryLabel.style.display = "block";
    } else if (selectedUserType === "Employee") {
      workDaysInput.style.display = "block";
      dailySalaryInput.style.display = "block";
      workDaysLabel.style.display = "block";
      dailySalaryLabel.style.display = "block";
    } else if (selectedUserType === "Customer") {
      companyNameInput.style.display = "block";
      orderValueInput.style.display = "block";
      ratingInput.style.display = "block";
      companyNameLabel.style.display = "block";
      orderValueLabel.style.display = "block";
      ratingLabel.style.display = "block";
    }
  });
  // Lắng nghe sự kiện thay đổi của dropdown
  const userTypeFilter = document.getElementById("filterUserType");

  userTypeFilter.addEventListener("change", function () {
    const selectedUserType = userTypeFilter.value;

    // Gọi hàm filterByUserType để lọc dữ liệu theo loại người dùng
    const filteredData = personList.filterByUserType(selectedUserType);

    // Render lại danh sách người dùng với dữ liệu đã được lọc
    if (selectedUserType === "All") renderUserList();
    else renderUserListAll(filteredData);
  });

  // Lắng nghe sự kiện thay đổi lựa chọn loại người dùng
  userTypeInput.addEventListener("change", function () {
    const selectedUserType = userTypeInput.value;

    // Ẩn tất cả các trường nhập dữ liệu
    mathInput.style.display = "none";
    mathLabel.style.display = "none";
    physicsInput.style.display = "none";
    physicsLabel.style.display = "none";
    chemistryInput.style.display = "none";
    chemistryLabel.style.display = "none";
    workDaysInput.style.display = "none";
    workDaysLabel.style.display = "none";
    dailySalaryInput.style.display = "none";
    dailySalaryLabel.style.display = "none";
    companyNameInput.style.display = "none";
    companyNameLabel.style.display = "none";
    orderValueInput.style.display = "none";
    orderValueLabel.style.display = "none";
    ratingInput.style.display = "none";
    ratingLabel.style.display = "none";

    // Hiển thị các trường nhập dữ liệu dựa trên lựa chọn
    if (selectedUserType === "Student") {
      mathInput.style.display = "block";
      physicsInput.style.display = "block";
      chemistryInput.style.display = "block";
      mathLabel.style.display = "block";
      physicsLabel.style.display = "block";
      chemistryLabel.style.display = "block";
    } else if (selectedUserType === "Employee") {
      workDaysInput.style.display = "block";
      dailySalaryInput.style.display = "block";
      workDaysLabel.style.display = "block";
      dailySalaryLabel.style.display = "block";
    } else if (selectedUserType === "Customer") {
      companyNameInput.style.display = "block";
      orderValueInput.style.display = "block";
      ratingInput.style.display = "block";
      companyNameLabel.style.display = "block";
      orderValueLabel.style.display = "block";
      ratingLabel.style.display = "block";
    }
  });

  const mathInput = document.getElementById("math");
  const physicsInput = document.getElementById("physics");
  const chemistryInput = document.getElementById("chemistry");
  const workDaysInput = document.getElementById("workDays");
  const dailySalaryInput = document.getElementById("dailySalary");
  const companyNameInput = document.getElementById("companyName");
  const orderValueInput = document.getElementById("orderValue");
  const ratingInput = document.getElementById("rating");

  const mathLabel = document.querySelector('label[for="math"]');
  const physicsLabel = document.querySelector('label[for="physics"]');
  const chemistryLabel = document.querySelector('label[for="chemistry"]');
  const workDaysLabel = document.querySelector('label[for="workDays"]');
  const dailySalaryLabel = document.querySelector('label[for="dailySalary"]');
  const companyNameLabel = document.querySelector('label[for="companyName"]');
  const orderValueLabel = document.querySelector('label[for="orderValue"]');
  const ratingLabel = document.querySelector('label[for="rating"]');

  const userList = document.getElementById("userList");

  let selectedUserCode = null;

  function isDataValid(name, address, code, email, userType) {
    if (!name || !address || !code || !email || !userType) {
      alert("Vui lòng điền đầy đủ thông tin.");
      return false;
    }

    if (userType === "Student") {
      const math = parseFloat(mathInput.value);
      const physics = parseFloat(physicsInput.value);
      const chemistry = parseFloat(chemistryInput.value);
      if (isNaN(math) || isNaN(physics) || isNaN(chemistry)) {
        alert("Điểm Toán, Lý, và Hóa phải là số.");
        return false;
      }
    } else if (userType === "Employee") {
      const workDays = parseFloat(workDaysInput.value);
      const dailySalary = parseFloat(dailySalaryInput.value);
      if (isNaN(workDays) || isNaN(dailySalary)) {
        alert("Số ngày làm việc và lương hàng ngày phải là số.");
        return false;
      }
    } else if (userType === "Customer") {
      const orderValue = parseFloat(orderValueInput.value);
      const rating = parseInt(ratingInput.value);
      if (isNaN(orderValue)) {
        alert("Giá trị đơn hàng  phải là số.");
        return false;
      }
    }

    return true;
  }

  addPersonButton.addEventListener("click", function () {
    clearForm();
  });

  function isCodeUnique(code) {
    return !personList.persons.some(
      (person) => person.code.toUpperCase() === code.toUpperCase()
    );
  }

  savePersonButton.addEventListener("click", function () {
    const name = nameInput.value;
    const address = addressInput.value;
    const code = codeInput.value;
    const email = emailInput.value;
    const userType = userTypeInput.value;

    if (!isDataValid(name, address, code, email, userType)) {
      return;
    }

    if (!isCodeUnique(code)) {
      alert("Mã người dùng đã tồn tại. Vui lòng chọn mã khác.");
      return;
    }

    let person;
    if (userType === "Student") {
      const math = parseFloat(mathInput.value);
      const physics = parseFloat(physicsInput.value);
      const chemistry = parseFloat(chemistryInput.value);
      person = new Student(
        name,
        address,
        code,
        email,
        math,
        physics,
        chemistry
      );
    } else if (userType === "Employee") {
      const workDays = parseFloat(workDaysInput.value);
      const dailySalary = parseFloat(dailySalaryInput.value);
      person = new Employee(name, address, code, email, workDays, dailySalary);
    } else if (userType === "Customer") {
      const companyName = companyNameInput.value;
      const orderValue = parseFloat(orderValueInput.value);
      const rating = parseInt(ratingInput.value);
      person = new Customer(
        name,
        address,
        code,
        email,
        companyName,
        orderValue,
        rating
      );
    }

    if (selectedUserCode) {
      personList.updatePerson(selectedUserCode, person);
      selectedUserCode = null;
    } else {
      personList.addPerson(person);
    }

    renderUserList();
    clearForm();
  });

  userList.addEventListener("click", function (event) {
    if (event.target.classList.contains("delete-button")) {
      const code = event.target.getAttribute("data-code");
      personList.removePerson(code);
      renderUserList();
    }
  });

  userList.addEventListener("click", function (event) {
    if (event.target.classList.contains("edit-button")) {
      const code = event.target.getAttribute("data-code");
      const person = personList.persons.find((p) => p.code === code);
      populateForm(person);
      selectedUserCode = code;
    }
  });

  function renderUserList() {
    userList.innerHTML = "";

    for (const person of personList.persons) {
      const row = document.createElement("tr");
      row.innerHTML = `
            <td>${person.name}</td>
            <td>${person.address}</td>
            <td>${person.code}</td>
            <td>${person.email}</td>
            <td>${person.constructor.name}</td>
            <td>
              <button class="edit-button btn btn-primary btn-sm" data-code="${person.code}">Chỉnh sửa</button>
              <button class="delete-button btn btn-danger btn-sm" data-code="${person.code}">Xóa</button>
            </td>
          `;
      userList.appendChild(row);
    }
  }
  function renderUserListAll(data) {
    userList.innerHTML = "";

    for (const person of data) {
      const row = document.createElement("tr");
      row.innerHTML = `
            <td>${person.name}</td>
            <td>${person.address}</td>
            <td>${person.code}</td>
            <td>${person.email}</td>
            <td>${person.constructor.name}</td>
            <td>
              <button class="edit-button btn btn-primary btn-sm" data-code="${person.code}">Chỉnh sửa</button>
              <button class="delete-button btn btn-danger btn-sm" data-code="${person.code}">Xóa</button>
            </td>
          `;
      userList.appendChild(row);
    }
  }

  function clearForm() {
    nameInput.value = "";
    addressInput.value = "";
    codeInput.value = "";
    emailInput.value = "";
    userTypeInput.value = "Student";
    mathInput.value = "";
    physicsInput.value = "";
    chemistryInput.value = "";
    workDaysInput.value = "";
    dailySalaryInput.value = "";
    companyNameInput.value = "";
    orderValueInput.value = "";
    ratingInput.value = "";
  }

  function populateForm(person) {
    nameInput.value = person.name;
    addressInput.value = person.address;
    codeInput.value = person.code;
    emailInput.value = person.email;
    userTypeInput.value = person.constructor.name;

    if (person instanceof Student) {
      mathInput.value = person.math;
      physicsInput.value = person.physics;
      chemistryInput.value = person.chemistry;
    } else if (person instanceof Employee) {
      workDaysInput.value = person.workDays;
      dailySalaryInput.value = person.dailySalary;
    } else if (person instanceof Customer) {
      companyNameInput.value = person.companyName;
      orderValueInput.value = person.orderValue;
      ratingInput.value = person.rating;
    }
  }

  renderUserList();
});
