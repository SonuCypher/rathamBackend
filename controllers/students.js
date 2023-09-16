const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { Students } = require("../models/student");
const { FreeSession } = require("../models/freeSession");
const SECRETKEY = "JWTSECRET";

module.exports.signIn = async (req, res) => {
  const user = req.body;
  try {
    const studentExist = await Students.findOne({ studentId: user.studentId });
    if (studentExist) {
      const validPassword = await bcrypt.compare(
        user.password,
        studentExist.password
      );
      if (validPassword) {
        const token = jwt.sign(
          { studentId: studentExist.studentId,id:studentExist._id },
          SECRETKEY
        );
        res.json({ token });
      } else {
        res.json({ error: "invalid password or username" });
      }
    } else {
      const password = await bcrypt.hash(user.password, 12);
      const newUser = await new Students({ ...user, password: password });
      const token = jwt.sign({ studentId: user.studentId,id:newUser._id }, SECRETKEY);
      await newUser.save();
      res.json({ token , newUser });
    }
  } catch (error) {
    res.json({ message: error.message });
  }
};

module.exports.getSessions = async (req, res) => {
  const currentDate = new Date();
  try {
    const session = await FreeSession.find({
      booked: false,
      startTime: { $gt: currentDate },
    });
    res.json(session);
    console.log(session);
  } catch (error) {
    res.json({ message: error.message });
    console.log(error);
  }
};

module.exports.bookSessions = async (req, res) => {
  const { userid, sessionid } = req.params;
  try {
    const student = await Students.findById(userid);
   if (student) {
    const BookSession = await FreeSession.findByIdAndUpdate(
        sessionid,
        { studentId: student.studentId, booked: true },
        { new: true }
      );
      res.json(BookSession);
   } else {
    res.json("you are not allowed")
   }
  } catch (error) {
    res.json({ message: error.message });
    console.log(error);
  }
};
