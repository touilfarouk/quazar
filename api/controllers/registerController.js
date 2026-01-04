import bcrypt from 'bcrypt';
import { promises as fsPromises } from 'fs';
import path from 'path';
import { readFile } from 'fs/promises';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const loadUsers = async () => {
  try {
    const usersData = await readFile(join(__dirname, '../model/users.json'), 'utf8');
    return JSON.parse(usersData);
  } catch (error) {
    return [];
  }
};

let usersDB = {
    users: [],
    setUsers: function (data) { this.users = data; }
};

const handleNewUser = async (req, res) => {
    usersDB.users = await loadUsers();
    const { user, pwd } = req.body;
    if (!user || !pwd) return res.status(400).json({ 'message': 'Username and password are required.' });
    const duplicate = usersDB.users.find(person => person.username === user);
    if (duplicate) return res.sendStatus(409); // Conflict
    try {
        const hashedPwd = await bcrypt.hash(pwd, 10);
        const newUser = {
            "username": user,
            "roles": { "User": 2001 },
            "password": hashedPwd
        };
        usersDB.setUsers([...usersDB.users, newUser]);
        await fsPromises.writeFile(
            path.join(path.dirname(''), '..', 'model', 'users.json'),
            JSON.stringify(usersDB.users)
        );
        console.log(usersDB.users);
        res.status(201).json({ 'success': `New user ${user} created!` });
    } catch (err) {
        res.status(500).json({ 'message': err.message });
    }
};

export default { handleNewUser };
