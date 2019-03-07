const db = require('../models');

module.exports = {
  findAll: function(req, res) {
    db
      .Accounts
      .findAll({
        attributes: ["id", "firstName", "lastName", "fullName", "userName", "savings", "goal"]
      })
      .then(dbData => res.json(dbData))
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  },
  findByName: function (req, res) {
    db
      .Accounts
      .findOne({
        attributes: ["id", "firstName", "lastName", "fullName", "userName", "savings", "goal"],
        where: {
          userName: req.params.userName
        },
        include: [db.Posts]
      })
      .then(dbData => res.json(dbData))
      .catch(err => {
        console.log(err);
        res.status(404).json(err);
      });
  },
  userCheck: function(req, res) {
    if (req.user) {
      return res.json(req.user);
    }
    else {
      return res.status(422).json({error: "Not logged in!"})
    }
  },
  update: function (req, res) {
    db
      .Accounts
      .update(req.entry, {
        where: {
          userName: req.params.userName
        }
      })
      .then(dbData => res.json(dbData))
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  },
  delete: function (req, res) {
    db
      .Accounts
      .destroy({
        where: {
          userName: req.params.userName
        }
      })
      .then(dbData => res.json(dbData))
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  },
  register: function(req, res) {
    /* 
      req.body => {
        first_name: "Alex",
        last_name: "Rosenkranz",
        email: "alex@alex.com",
        password: "123456"
      }
    */
    db
      .Accounts
      .create(req.entry)
      .then(function (userInfo) {
        // Upon successful signup, log user in
        req
          .login(userInfo, function (err) {
            if (err) {
              console.log(err)
              return res
                .status(422)
                .json(err);
            }
            console.log(req.user);
            return res.json("/");
          });
      })
      .catch(function (err) {
        console.log(err);
        res
          .status(422)
          .json(err);
      });
  },
  login: function(req, res) {
    console.log(req.user);
    res.json("/");
  }
}