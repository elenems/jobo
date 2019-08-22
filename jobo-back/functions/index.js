const functions = require("firebase-functions");
const cors = require("cors");
const app = require("express")();
app.use(cors());

const {
  signUp,
  signIn,
  signOut,
  changeUserInfo,
  getUser,
  startJob,
  unstarJob
} = require("./routes/user");

const {
  getCompanies,
  addCompany,
  removeCompany,
  updateCompany,
  getCompany
} = require("./routes/company");

const {
  addJob,
  removeJob,
  incrementJobView,
  addStarJob,
  removeStarJob,
  getCompanyJobs,
  getStarredJobs,
  getJob,
  getJobsFromQuery
} = require("./routes/job");

//user
app.post("/signUp", signUp);
app.post("/signIn", signIn);
app.post("/signOut", signOut);
app.post("/changeUserInfo", changeUserInfo);
app.get("/getUser", getUser);
app.post("/unstarJob", unstarJob);
app.post("/starJob", startJob);

//company
app.post("/addCompany", addCompany);
app.post("/removeCompany", removeCompany);
app.post("/updateCompany", updateCompany);
app.get("/getCompanies", getCompanies);
app.get("/getCompany", getCompany);

//job
app.post("/addJob", addJob);
app.post("/removeJob", removeJob);
app.post("/addStarJob", addStarJob);
app.post("/removeStarJob", removeStarJob);
app.post("/incrementJobView", incrementJobView);
app.post("/getCompanyJobs", getCompanyJobs);
app.post('/getStarredJobs', getStarredJobs);
app.get('/getJob', getJob);
app.get('/getJobsFromQuery', getJobsFromQuery);

exports.api = functions.region("europe-west1").https.onRequest(app);
