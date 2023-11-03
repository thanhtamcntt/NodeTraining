
const connectDb = require('./config/configdb');
const fs = require('fs');
const path = require('path');
const Roles = require('./models/roles')
const User = require('./models/user')

const dotenv = require('dotenv');
const envPath = path.resolve(__dirname, '../.env');
dotenv.config({ path: envPath });

connectDb();

const roles = JSON.parse(
  fs.readFileSync(path.join(__dirname, './assets/roles.json'))
);

const user = JSON.parse(
  fs.readFileSync(path.join(__dirname, './assets/user.json'))
);
console.log(roles,user)
const ImportData = async () => {
  try {
    await Roles.create(roles);
    await User.create(user);
  } catch (error) {
    console.log(error);
  }
}

const DeleteData = async () => {
  try {
    await Roles.deleteMany();
    await User.deleteMany();
  } catch (error) {
    console.log(error);
  }
}

if(process.argv[2] === '-i')
{
  ImportData();
  console.log("Data imported");
}
if(process.argv[2] === '-d')
{
  DeleteData();
  console.log("Data deleted");
}