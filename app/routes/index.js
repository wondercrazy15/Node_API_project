const studentsRoutes = require('./student_routes');
const authenticatioRoutes = require('./authenticatio_routes');
const fileUploadRoutes = require('./file_upload_routes');
const reqStatusCodeRoutes = require('./req_status_code_routes');
const sendMailRoutes = require('./send_mail_routes')
module.exports = function(app, db) {
  studentsRoutes(app, db);
  authenticatioRoutes(app, db);
  sendMailRoutes(app, db);
  fileUploadRoutes(app, db);
  reqStatusCodeRoutes(app, db);
 
  // Other route groups could go here, in the future
};