const express=require("express")
const app=express()
const mongoose=require("mongoose")
const cors=require("cors")
const EmployeeModel=require('./models/Employee')
const DashboardModel=require('./models/Dashboard')
const FeedbackModel=require('./models/Feedback')
const AccountModel = require('./models/Account');
app.use(express.json())
app.use(cors())
mongoose.connect("mongodb://127.0.0.1:27017/employee")
.then(()=>{
    console.log("mongodb connected");  
})
.catch(()=>{
    console.log("failed to connect to mongodb");
})
app.post('/signup', (req, res) => {
    const { name, email, password } = req.body;
    EmployeeModel.findOne({ email })
        .then(existingEmployee => {
            if (existingEmployee) {
                return res.json({
                    status: "Error",
                    message: "Email already exists, please choose a different email"
                });
            }
            EmployeeModel.create({ name, email, password })
                .then(employee => {
                    const newAccount = new AccountModel({
                        email: email, 
                        loggedInEmail: email,
                        name: name 
                    });
                    newAccount.save()
                        .then(account => {
                            console.log("New Account Created: ", account);
                            res.json({
                                status: "Success",
                                message: "Signup successful, account created with logged-in email"
                            });
                        })
                        .catch(err => {
                            console.error("Error creating account:", err);
                            res.json({
                                status: "Error",
                                message: "Failed to create account",
                                error: err
                            });
                        });
                })
                .catch(err => {
                    console.error("Error during signup:", err);
                    res.json({
                        status: "Error",
                        message: "Signup failed",
                        error: err
                    });
                });
        })
        .catch(err => {
            console.error("Error checking existing email:", err);
            res.json({
                status: "Error",
                message: "Error checking email",
                error: err
            });
        });
});
app.post('/login', (req, res) => {
    const { email, password } = req.body;
    EmployeeModel.findOne({ email: email })
        .then(user => {
            if (user) {
                if (user.password === password) {
                    res.json({ status: "Success" });
                } else {
                    res.json({ status: "Error", message: "The password is incorrect" });
                }
            } else {
                res.json({ status: "Error", message: "No record exists. Please sign up first." });
            }
        })
        .catch(err => res.json({ status: "Error", message: "An error occurred", error: err }));
});
app.post('/updateTotalUsers', (req, res) => {
    DashboardModel.findOne()
      .then(stats => {
        if (!stats) {
          const newStats = new DashboardModel({ totalUsers: 1 });
          newStats.save()
            .then(() => res.json({ status: "Success", message: "User count set to 1 (new stats created)" }))
            .catch(err => res.json({ status: "Error", message: "Failed to create stats", error: err }));
        } else {
          stats.totalUsers += 1;
          stats.save()
            .then(() => res.json({ status: "Success", message: "User count incremented" }))
            .catch(err => res.json({ status: "Error", message: "Failed to update stats", error: err }));
        }
      })
      .catch(err => res.json({ status: "Error", message: "Failed to find stats", error: err }));
  });  
  app.post('/updateBookedTickets', (req, res) => {
    DashboardModel.findOne()
      .then(stats => {
        if (!stats) {
          const newStats = new DashboardModel({ bookedTickets: 1 });
          newStats.save()
            .then(() => res.json({ status: "Success", message: "Booked ticket count set to 1" }))
            .catch(err => res.json({ status: "Error", message: "Failed to create stats", error: err }));
        } else {
          stats.bookedTickets += 1;
          stats.save()
            .then(() => res.json({ status: "Success", message: "Booked ticket count incremented" }))
            .catch(err => res.json({ status: "Error", message: "Failed to update stats", error: err }));
        }
      })
      .catch(err => res.json({ status: "Error", message: "Failed to find stats", error: err }));
  });
  app.post('/updateCanceledTickets', (req, res) => {
    DashboardModel.findOne()
      .then(stats => {
        if (!stats) {
          const newStats = new DashboardModel({ canceledTickets: 1 });
          newStats.save()
            .then(() => res.json({ status: "Success", message: "Canceled ticket count set to 1" }))
            .catch(err => res.json({ status: "Error", message: "Failed to create stats", error: err }));
        } else {
          stats.canceledTickets += 1;
          stats.save()
            .then(() => res.json({ status: "Success", message: "Canceled ticket count incremented" }))
            .catch(err => res.json({ status: "Error", message: "Failed to update stats", error: err }));
        }
      })
      .catch(err => res.json({ status: "Error", message: "Failed to find stats", error: err }));
  });
app.get('/getDashboardStats', (req, res) => {
    DashboardModel.findOne()
      .then(stats => {
        if (stats) {
          res.json({
            status: "Success",
            totalUsers: stats.totalUsers,
            bookedTickets: stats.bookedTickets,
            canceledTickets: stats.canceledTickets,
          });
        } else {
          res.json({ status: "Error", message: "No dashboard stats found" });
        }
      })
      .catch(err => res.json({ status: "Error", message: "Failed to fetch stats", error: err }));
  }); 
app.post('/feedback', (req, res) => {
  const { feedback } = req.body;
  const newFeedback = new FeedbackModel({
    feedback,
  });
  newFeedback.save()
    .then(() => res.json({ status: 'Success', message: 'Feedback submitted successfully' }))
    .catch((err) => res.json({ status: 'Error', message: 'Error submitting feedback', error: err }));
});
app.get('/getFeedbacks', (req, res) => {
    FeedbackModel.find()
      .then(feedbacks => {
        if (feedbacks) {
          res.json({
            status: "Success",
            feedbacks: feedbacks,
          });
        } else {
          res.json({ status: "Error", message: "No feedbacks found" });
        }
      })
      .catch(err => res.json({ status: "Error", message: "Failed to fetch feedbacks", error: err }));
  });
  app.delete('/deleteFeedback/:id', (req, res) => {
    FeedbackModel.findByIdAndDelete(req.params.id)
      .then(() => res.json({ status: "Success", message: "Feedback deleted successfully" }))
      .catch(err => res.json({ status: "Error", message: "Failed to delete feedback", error: err }));
  });
  app.delete('/clearAllFeedbacks', (req, res) => {
    FeedbackModel.deleteMany()
      .then(() => res.json({ status: "Success", message: "All feedbacks cleared" }))
      .catch(err => res.json({ status: "Error", message: "Failed to clear feedbacks", error: err }));
  }); 
app.listen(8000,()=>{
    console.log("server is running")
})