const fs = require('fs');
const DB_FILE = 'userData.json';
const userDataArray = [];
let flag = 0;

let rawData = fs.readFileSync(DB_FILE);

for (let i = 0; i < JSON.parse(rawData).length; i++) {
	userDataArray.push(JSON.parse(rawData)[i]);
}

function addUser(data) {

	for (let i = 0; i < JSON.parse(rawData).length; i++) {
		if (JSON.parse(rawData)[i].id == data.id) {
			return 'id already exist..!';
		} else if (JSON.parse(rawData)[i].email == data.email) {
			return 'email already exist..!';
		} else if (JSON.parse(rawData)[i].contact == data.contact) {
			return 'contact already exist..!';
		}
		if ((JSON.parse(rawData)[i].id !== data.id) && (JSON.parse(rawData)[i].email !== data.email) &&
			(JSON.parse(rawData)[i].contact !== data.contact)) {
			userDataArray.push(JSON.parse(data));
			flag = 1;
			break;
		}
	}
	if (flag == 1) {
		fs.writeFile(DB_FILE, JSON.stringify(userDataArray), function (err) {
			if (err) throw err;
			return 'User added successfully..!';
		});
	}
}

function deleteUser(data) {
	for (let i = 0; i < JSON.parse(rawData).length; i++) {
		if (JSON.parse(rawData)[i].id == data["id"]) {
			userDataArray.splice(rawData.indexOf(rawData[i]), 1);
			flag = 1;
			break;
		}
	}
	if (flag == 1) {
		fs.writeFile(DB_FILE, JSON.stringify(userDataArray), function (err) {
			if (err) throw err;
			return 'User Deleted Successfully..!';
		});
	}
	else {
		return "No User Found..!";
	}
}
function updateUser(data) {
	for (let i = 0; i < JSON.parse(rawData).length; i++) {
		console.log(data.id);
		if (JSON.parse(rawData)[i].id == data.id) {
			if (data.id != "") {
				userDataArray[i].id = data.id;
			}
			if (data.userFirstName != "") {
				userDataArray[i].userFirstName = data.userFirstName;
			}
			if (data.userLastName != "") {
				userDataArray[i].userLastName = data.userLastName;
			}
			if (data.email != "") {
				userDataArray[i].email = data.email;
			}
			if (data.contact != "") {
				userDataArray[i].contact = data.contact;
			}
			flag = 1;
			break;
		}
	}
	if (flag == 1) {
		fs.writeFile(DB_FILE, JSON.stringify(userDataArray), function (err) {
			if (err) throw err;
			return 'User Updated successfully..!';
		});
	}
	else {
		return "No User Found..!";
	}
}

module.exports = {
	addUser,
	deleteUser,
	updateUser
}