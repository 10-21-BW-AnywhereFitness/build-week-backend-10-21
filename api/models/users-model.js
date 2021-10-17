const db = require('./../data/db-config');

async function addUser({ username, password, role_id }){
    let newUser = { username, password, role_id }
    const role = await db('roles').where('role_type', role_id).first(); 
    newUser = { ... newUser, role_id: role.role_id}
    
    const [newUserObject] = await db('users').insert(newUser, ['user_id', 'username', 'role_id'])

    return newUserObject;
}

module.exports = {
    addUser,

}