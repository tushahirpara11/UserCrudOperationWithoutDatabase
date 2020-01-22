const fs = require('fs');
const DB_FILE = 'userData.json';

let flag = 0, userRecord = '';
const DB_RECORDS = JSON.parse(fs.readFileSync(DB_FILE));

function commonDisplay(statusCode, status, message, jsonData = "") {
	let obj = {
		statusCode: statusCode,
		status: status,
		message: message,
		data: jsonData
	}
	return JSON.stringify(obj);
}

function addUser(data) {
	let msg;
	DB_RECORDS.some((ele) => {
		flag = false;
		if (ele.id != data.id) {
			if (ele.email != data.email) {
				if (ele.contact != data.contact) {
					flag = true;
				}
				else {
					msg = 'contact already exist..!';
				}
			}
			else {
				msg = 'email already exist..!';
			}
		}
		else {
			msg = 'id already exist..!';
		}
	});
	if (flag) {
		DB_RECORDS.push(data);
		fs.writeFileSync(DB_FILE, JSON.stringify(DB_RECORDS));
		return commonDisplay(200, 'Ok', 'User added Successfully');
	}
	else {
		return commonDisplay(200, 'Ok', msg);
	}
}

function deleteUser(data) {
	const userDelete = DB_RECORDS.splice(DB_RECORDS.findIndex(() => {
		return data.id;
	}), 1);
	if (userDelete) {
		fs.writeFileSync(DB_FILE, JSON.stringify(DB_RECORDS));
		return commonDisplay("200", "OK", 'User Deleted Successfully..!');
	}
	else {
		return commonDisplay("200", "OK", "No User Found..!");
	}
}

function updateUser(data) {
	const userKeys = ['userFirstName', 'userLastName', 'email', 'contact'];
	const updateUserFlag = DB_RECORDS.some((dbElement) => {
		if (dbElement.id == data.id) {
			Object.keys(data).forEach(element => {
				if (userKeys.find((ele) => { if (ele == element) return true; })) {
					if (data[element] !== '') {
						dbElement[element] = data[element];
					}
				}
			});
		}
		return true;
	});
	if (updateUserFlag) {
		fs.writeFileSync(DB_FILE, JSON.stringify(DB_RECORDS));
		return commonDisplay("200", "OK", "User Updated successfully..!");
	}
	else {
		return commonDisplay("200", "OK", "No User Found..!");
	}
}

function getUser(data) {
	const getUser = DB_RECORDS.some((element) => {
		if (element.id == data.id) {
			userRecord = element;
			return userRecord;
		}
	});
	if (getUser) {
		return commonDisplay("200", "OK", "Data Found", userRecord);
	}
	else {
		return commonDisplay("200", "OK", "No User Found..!");
	}
}

module.exports = {
	addUser,
	deleteUser,
	updateUser,
	getUser,
	commonDisplay
}