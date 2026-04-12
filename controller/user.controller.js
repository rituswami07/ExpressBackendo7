const User = require("../model/user.model");
const { hashPassword } = require("../utils/hash");

exports.getAllUsers = async (req , res) => {
    try{
        const users = await User.find();
        res.json(users);
    }catch (error) {
        res.status(500).json({ error: "Failed to fetch users" });
    }
};

exports.getUserById = async (req , res) => {
  
    const { id } = req.params;
    try {
    const user = await User.findById(id);
    if (!user) {
    return res.status(404).json({ error: "User not found"});
    }
    res.json(user);
    }catch (error) {

    res.status(500).json({ error : "Failed to fetch user"});
    }
};

exports.getUserByEmail = async (req , res) => {
  
    const { email } = req.params;
     try {
    const user = await User.findOne({ email });
    if (!user) {
    return res.status(404).json({ error: "User not found"});
    }
    delete user.password;
    delete user.__v;
    res.json(user);
    }catch (error) {

    res.status(500).json({ error: "Failed to fetch user"});
    }
};

exports.addUser = async (req , res) => {
    const user = req.body;

    try{
        const hashedPassword = await hashPassword(user.password);

        user.password = hashedPassword;

        const newUser = new User(user);
        const savedUser = await newUser.save();

        const userDto = {...savedUser._doc};
        delete userDto.password;
        delete userDto.__v;

        res.status(201).json(userDto);

      } catch (err) {
        console.error(err);

        res.status(500).json({ error: "Failed to add user"});
    };
      }


exports.updateUser = async (req , res) => {
    const { id } = req.params;
    const user = req.body;
    try {
    const updateUser = await User.findByIdAndUpdate(id , user, {new:true});
    if (!updateUser) {
    return res.status(404).json({ error: "User not found"});
    }
    res.json(updateUser);
    }catch (err) {

    res.status(500).json({ error: "Failed to update user" });
    }

};

exports.deleteUser = async (req , res) => {
     const { id } = req.params;
    
    try {
    const deleteUser = await User.findByIdAndDelete(id);
    if (!deleteUser) {
    return res.status(404).json({ error: "User not found"});
    }
    res.json(deleteUser);
    }catch (err) {

    res.status(500).json({ error: "Failed to delete user" });
    }

};