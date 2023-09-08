const users = require("../Models/userSchema");

exports.addUser = async (req, res) => {
   console.log(req.file);
   console.log("Inside adduser");

   const { fname, lname, email, mobile, gender, status, location } = req.body;
   try {
      const isUser = await users.findOne({ email });
      if (isUser) {
         res.status(406).json("User already exist!");
      } else {
         const newUser = new users({
            fname,
            lname,
            email,
            mobile,
            gender,
            status,
            profile: req.file.filename,
            location,
         });

         await newUser.save();
         res.status(200).json(newUser);
      }
   } catch (error) {
      res.status(401).json("Error: ", error);
   }
};

exports.getAllUsers = async (req, res) => {
   const search = req.query.search;
   const query = {
      fname: { $regex: search, $options: "i" },
   };
   try {
      const allUsers = await users.find(query);
      res.status(200).json(allUsers);
   } catch (error) {
      res.status(401).json("Error: ", err);
   }
};

exports.removeUser = async (req, res) => {
   const { id } = req.params;
   try {
      const response = await users.findByIdAndDelete({ _id: id });
      res.status(200).json(response);
   } catch (error) {
      res.status(401).json("Error: ", err);
   }
};

exports.editUser = async (req, res) => {
   const { id } = req.params;
   const { fname, lname, email, mobile, gender, status, location, profile } = req.body;
   const file = req.file ? req.file.filename : profile;
   try {
      const updatedUser = await users.findByIdAndUpdate(
         id,
         {
            fname,
            lname,
            email,
            mobile,
            gender,
            status,
            profile: file,
            location,
         },
         { new: true }
      );
      await updatedUser.save();
      res.status(200).json(updatedUser);
   } catch (error) {
      res.status(401).json("Error: ", err);
   }
};
