const jwt = require('jsonwebtoken');
const Token = require('../models/tokenModel');
const User = require('../models/userModel');

exports.generateToken = async (user) => {
    try {
        
        const payload = { _id: user._id, roles: user.authority };
        const accessToken = jwt.sign(
            payload,
            process.env.ACCESS_TOKEN_PRIVATE_KEY,
            { expiresIn: "15m" }
        );
        const refreshToken = jwt.sign(
            payload,
            process.env.REFRESH_TOKEN_PRIVATE_KEY,
            { expiresIn: "30d" }
        );
        
        const token = await Token.findOne({ userId: user._id });
        if (token) await Token.remove();

        await new Token({ userId: user._id, accessToken: accessToken, refreshToken: refreshToken }).save();
        return ({ accessToken });
    } catch (err) {
        return err;
    }
};

exports.verifyToken = async (accessToken) => {
  try {
    const privateKey = process.env.REFRESH_TOKEN_PRIVATE_KEY;
    const doc = await Token.findOne({ accessToken: accessToken });

    if (!doc) {
      return { error: true, message: "Invalid access token" };
    }

 
    const tokenDetails = await jwt.verify(accessToken, privateKey, async function(err, AccessToken) {
      if (err) {
        console.log("accessToken expired");
        
       return await jwt.verify(doc.refreshToken, privateKey, async function(err) {
          if (err) {
            console.log("refreshToken expired");
            return { error: true, message: "refreshToken expired" };
          } else { //refresh token didn't expire
            // generate and update new access token
            const user = await User.findOne({_id: doc.userId});
            try {
              const payload = { _id: user._id, roles: user.__t };
              const AccessToken = jwt.sign(
                  payload,
                  process.env.ACCESS_TOKEN_PRIVATE_KEY,
                  { expiresIn: "5s" }
              );
              await Token.findOneAndUpdate({accessToken: accessToken}, {accessToken: AccessToken});
              return { AccessToken, error: false, message: "New token generated" };
            }
              catch (error){
                return error;
              } 
          }
        });


      } else {
        return { AccessToken, error: false, message: "Valid access token" };
      }
    });
    console.log(tokenDetails)
    if(tokenDetails)
    return { tokenDetails };

  } catch (error) {
    throw { error: true, message: "error" };
  }
};


  exports.deleteToken = async (accessToken) => {
    try {
      const doc = await Token.findOne({ accessToken: accessToken });
      if (!doc) {
        return { error: false, message: "already logged out or invalid token" };
      }
      
      await Token.deleteOne({ accessToken : accessToken });
      return { error: false, message: "logged out" };
      
    } catch (error) {
      throw { error: true, message: "error" };
    }
  };