const fs = require('fs');
const DB_FILE = 'userData.json';

let flag = 0, userRecord = '';
const DB_RECORDS = JSON.parse(fs.readFileSync(DB_FILE));

const userDataArray = DB_RECORDS.map((element) => { return element; });

function commonDisplay(statusCode, status, message, jsonData = "") {
	let obj = {
		statusCode: statusCode,
		status: status,
		message: message,
		data: jsonData
	}
	return JSON.stringify(obj);
}

// function addUser(data) {
// 	// let flag;
// 	const parseData = JSON.parse(data);
// 	DB_RECORDS.forEach(ele => {
// 		flag = false;
// 		console.log(ele.id, parseData.id)
// 		if (ele.id === parseData.id) {
// 			return commonDisplay("200", "OK", 'id already exist..!');
// 		} else if (ele.email == parseData.email) {
// 			return commonDisplay("200", "OK", 'email already exist..!');
// 		} else if (ele.contact == parseData.contact) {
// 			return commonDisplay("200", "OK", 'contact already exist..!');
// 		}
// 		if (ele.id !== parseData.id) {
// 			if (ele.email !== parseData.email) {
// 				if (ele.contact !== parseData.contact) {
// 					flag = true;
// 				}
// 			}
// 		}
// 	});
// 	if (flag == true) {
// 		DB_RECORDS.push(parseData);
// 		fs.writeFile(DB_FILE, JSON.stringify(DB_RECORDS), function (err) {
// 			if (err) return commonDisplay("502", "Error", err);
// 		});
// 		return commonDisplay("200", "OK", 'User added successfully..!');
// 	}
// }

function addUser(data) {
	const parseData = JSON.parse(data);
	let msg;
	DB_RECORDS.forEach(ele => {
		flag = false;
		if (ele.id === parseData.id) {
			msg = 'id already exist..!';
		} else if (ele.email == parseData.email) {
			msg = 'email already exist..!';
		} else if (ele.contact == parseData.contact) {
			msg = 'contact already exist..!';
		}
		if (ele.id != parseData.id) {
			if (ele.email != parseData.email) {
				if (ele.contact != parseData.contact) {
					flag = true;
				}
			}
		}
	})
	if (flag) {
		userDataArray.push(parseData);
		fs.writeFile(DB_FILE, JSON.stringify(userDataArray), function (err) {
			if (err) return commonDisplay("502", "Error", err);
		});
		return commonDisplay(200, 'Ok', 'User added Successfully');
	}
	else {
		return commonDisplay(200, 'Ok', msg);
	}
}


function deleteUser(data) {
	DB_RECORDS.forEach((element) => {
		if (element.id == data["id"]) {
			userDataArray.splice(DB_RECORDS.indexOf(element), 1);
			flag = 1;
		}
	});
	if (flag == 1) {
		fs.writeFile(DB_FILE, JSON.stringify(userDataArray), function (err) {
			if (err) return commonDisplay("statusCode", "Error", err);
		});
		return commonDisplay("200", "OK", 'User Deleted Successfully..!');
	}
	else {
		return commonDisplay("200", "OK", "No User Found..!");
	}
}

function updateUser(data) {
	DB_RECORDS.forEach((dbElement) => {
		if (dbElement.id == data.id) {
			Object.keys(data).forEach((dataKey) => {
				if (dataKey == 'userFirstName') {
					if (data.userFirstName != "") {
						dbElement.userFirstName = data.userFirstName;
					}
				}
				if (dataKey == 'userLastName') {
					if (data.userLastName != "") {
						dbElement.userLastName = data.userLastName;
					}
				}
				if (dataKey == 'email') {
					if (data.email != "") {
						dbElement.email = data.email;
					}
				}
				if (dataKey == 'contact') {
					if (data.contact != "") {
						dbElement.contact = data.contact;
					}
				}
			});
			flag = 1;
		}
	});
	if (flag == 1) {
		fs.writeFile(DB_FILE, JSON.stringify(userDataArray), function (err) {
			if (err) return commonDisplay("502", "Error", err);

		});
		return commonDisplay("200", "OK", "User Updated successfully..!");
	}
	else {
		return commonDisplay("200", "OK", "No User Found..!");
	}
}

function getUser(data) {
	DB_RECORDS.forEach((element) => {
		if (element.id == data.id) {
			userRecord = element;
			flag = 1;
		}
	});
	if (flag == 1) {
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