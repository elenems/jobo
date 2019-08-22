const { db } = require("../util/admin");

exports.getCompanies = (req, res) => {
  db.collection("companies")
    .get()
    .then(data => {
      let companies = [];
      data.forEach(doc => {
        companies.push({
          id: doc.id
        });
      });
      return res.status(200).json(companies);
    })
    .catch(err => {
      return res.status(400).json(err);
    });
};

exports.getCompany = (req, res) => {
  db.collection('companies').doc(req.query.id).get()
  .then(doc=>{
    return res.status(200).json({...doc.data(),id:doc.id})
  })
  .catch(e=>{
    return res.status(400).json({errorMessage: e});
  })
}

exports.addCompany = (req, res) => {
  const userId = req.body.email;
  const companyOwnerId = userId;
  const companyName = req.body.companyName;
  const companyJobs = [];
  const companySite = req.body.companySite || "";
  const companyDescription = req.body.companyDescription || "";
  const companyCategory = req.body.companyCategory || "";
  db.collection("users")
    .doc(userId)
    .get()
    .then(doc => {
     if(doc.data().companyId){
       return res.status(400).json({errorMessage: "It's possible to create only one company"})
     }
     return true;
    })
    .then((status) => {
      if(status === true){
        return db.collection("companies").add({
          companyOwnerId,
          companyName,
          companyJobs,
          companySite,
          companyDescription,
          companyCategory
        });
      }
       return false;
    })

    .then(data => {
      if(data !== false){
        db.collection("users")
        .doc(userId)
        .update({
          companyId: data.id
        });
      }
    })
    .then(() => {
      return res.status(200).json({ message: "Company added successfuly" });
    })
    .catch(e => {
      return res.status(400).json(e);
    });
};

exports.removeCompany = (req, res) => {
  const id = req.body.companyId;
  const userId = req.body.userId;
  db.collection("companies")
    .doc(id)
    .delete()
    .then(() => {
      db.collection("users")
        .doc(userId)
        .update({
          companyId: ""
        });
    });
};

exports.updateCompany = (req, res) => {
  const newCompany = req.body;
  db.collection("companies")
    .doc(req.body.id)
    .get()
    .then(doc => {
      return doc.data();
    })
    .then(company => {
      db.collection("companies")
        .doc(req.body.id)
        .set(Object.assign(company, newCompany));
    })
    .then(() => {
      return res.status(200).json({ message: "Company updated successfuly" });
    })
    .catch(e => {
      return res.status(400).json(e);
    });
};
