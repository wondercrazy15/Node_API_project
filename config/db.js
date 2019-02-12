let username = 'admin';
let password = 'admin123';
let dbhost = 'ds223015.mlab.com';
let port = '23015';
let dbname = 'student_db';

module.exports = {
    url: `mongodb://${username}:${password}@${dbhost}:${port}/${dbname}`
};