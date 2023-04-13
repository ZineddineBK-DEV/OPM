const bcrypt = require('bcrypt');
const Admin = require('../models/adminModel');
const tokenGen = require("../middlewares/tokenMiddleware");


exports.login = async (req, res) => {
    const { email, password } = req.body;
try {
      const admin = await Admin.findOne({ email });
      if (!admin) {
        return res.status(401).json({ message: 'Invalid email or password' });
      }
  
      const passwordMatch = await bcrypt.compare(password, admin.password);
      if (!passwordMatch) {
        return res.status(401).json({ message: 'Invalid email or password' });
      }
      const { accessToken } = await tokenGen.generateToken(admin);
      res.setHeader('Authorization', `Bearer ${accessToken}`);
      //res.setHeader('Refresh-Token', refreshToken); it will be sent with httpOnly cookie 
      res.status(200).json({ message: 'Login successful' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error logging in' });
    }
  };