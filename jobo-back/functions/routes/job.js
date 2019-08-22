const { db } = require("../util/admin");


exports.addJob = (req, res) => {
  let jobId = null;
  db.collection("jobs")
    .add({
      company: req.body.companyId,
      companyName: req.body.companyName,
      title: req.body.title,
      location: req.body.location,
      yearsOfExperience: req.body.yearsOfExperience,
      salary: req.body.salary || "",
      description: req.body.description,
      category: req.body.category,
      views: 0,
      stars: 0,
      date:new Date().toLocaleString()
    })
    .then(doc => {
      jobId = doc.id;
      return db
        .collection("companies")
        .doc(req.body.companyId)
        .get();
    })
    .then(doc => {
      const newCompanyJobs = doc.data().companyJobs;
      newCompanyJobs.push(jobId);
      db.collection("companies")
        .doc(req.body.companyId)
        .update({
          companyJobs: newCompanyJobs
        });
    })
    .then(() => {
      return res.status(200).json({ message: "Job added successfuly" });
    })
    .catch(e => {
      return res.status(400).json(e);
    });
};

exports.getJob = (req, res) => {
  db.collection('jobs').doc(req.query.id).get()
  .then(doc=>{
    return res.status(200).json({id:doc.id, ...doc.data()})
  })
  .catch(e=>{
    return res.status(400).json({errorMessage:'Error geting the job'})
  })
}

exports.getCompanyJobs = (req, res) => {
  const companyId = req.body.id;
  const jobs = [];
    db.collection('jobs').where('company', '==', companyId).get()
    .then(snapshot=>{
      snapshot.forEach(doc => {
          jobs.push({
            id:doc.id,
            ...doc.data()
          })
      })
      return res.status(200).json({jobs})
    })
    .catch(e=>{
      return res.status(400).json({errorMessage: e})
    })
}

exports.removeJob = (req, res) => {
  db.collection("jobs")
    .doc(req.body.jobId)
    .get()
    .then(jobdoc => {
      return db
        .collection("companies")
        .doc(jobdoc.data().company)
        .get();
    })
    .then(comdoc => {
      const updatedJobs = comdoc.data().companyJobs.filter(job => {
        return job !== req.body.jobId;
      });
      db.collection("companies")
        .doc(comdoc.data().id)
        .update({
          companyJobs: updatedJobs
        });
    })
    .then(() => {
      db.collection("jobs")
        .doc(req.body.jobId)
        .delete();
    })
    .then(() => {
      return res.status(200).json({ message: "Job removed successfuly" });
    })
    .catch(e => {
      return res.status(400).json(e);
    });
};

exports.incrementJobView = (req, res) => {
  db.collection("jobs")
    .doc(req.body.jobId)
    .get()
    .then(doc => {
      db.collection("jobs")
        .doc(req.body.jobId)
        .update({
          views: parseInt(doc.data().views) + 1
        });
    })
    .then(() => {
      return res.status(200).json({ message: "Job views incremented" });
    })
    .catch(e => {
      return res.status(400).json(e);
    });
};

exports.addStarJob = (req, res) => {
  db.collection("jobs")
    .doc(req.body.jobId)
    .get()
    .then(doc => {
      db.collection("jobs")
        .doc(req.body.jobId)
        .update({
          stars: parseInt(doc.data().stars) + 1
        });
    })
    .then(() => {
      return res.status(200).json({ message: "Job stars incremented" });
    })
    .catch(e => {
      return res.status(400).json(e);
    });
};

exports.removeStarJob = (req, res) => {
  db.collection("jobs")
    .doc(req.body.jobId)
    .get()
    .then(doc => {
      db.collection("jobs")
        .doc(req.body.jobId)
        .update({
          stars: parseInt(doc.data().stars) - 1
        });
    })
    .then(()=>{
      return db.collection('users').doc(req.body.userId).get()
    })
    .then(doc=>{
      const stars = doc.data().staredJobs.filter(job=>{
        return req.body.jobId !== job;
      })
      return stars;
    })
    .then((stars)=>{
      db.collection('users').doc(req.body.userId).update({
        staredJobs:stars
      })
      return stars;
    })
    .then((stars) => {
      return res.status(200).json({staredJobs: stars });
    })
    .catch(e => {
      return res.status(400).json(e);
    });
};

exports.getStarredJobs = (req, res) => {
  const jobsId = req.body.jobs;
  const jobs = [];
    db.collection('jobs').get()
    .then(snapshot => {
      snapshot.forEach(doc=>{
        if(jobsId.indexOf(doc.id) !== -1){
          jobs.push({
            id: doc.id,
            ...doc.data()
          })
        }
      })
      return res.status(200).json({staredJobs: jobs})
    })
    .catch(e=>{
      return res.status(400).json({errorMessage: e})
    })
}

exports.getJobsFromQuery = (req, res) => {
  const jobs = [];
  let jobsRef = db.collection('jobs');
  const page = req.query.page ? req.query.page : 1;

  if(req.query.location && req.query.location !== 'All'){
    jobsRef = jobsRef.where('location', '==', req.query.location);
  }

  if(req.query.title && req.query.title.length){
    jobsRef = jobsRef.where('title', '==', req.query.title);
  }

  if(req.query.category && req.query.category !== 'All'){
    jobsRef = jobsRef.where('category', '==', req.query.category);
  }

  if(req.query.sort){
    if(req.query.sort === 'new'){
      jobsRef = jobsRef.orderBy('date', 'desc');
    }
    if(req.query.sort === 'old'){
      jobsRef = jobsRef.orderBy('date');
    }
  }
  
  jobsRef
  .get()
  .then(snapshot=>{
    if(snapshot.empty){
      return res.status(200).json({message:"No jobs found"})
    }
    snapshot.forEach(doc=>{
      jobs.push({
        id:doc.id,
        ...doc.data()
      })
    })

    
    return res.status(200).json({jobs: jobs.slice(page * 5 - 5, page * 5), jobsLength: jobs.length})
  })
  .catch(e=>{
    return res.status(400).json({er:e})
  })
}