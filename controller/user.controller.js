const User = require("../model/user.model");

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

    res.send("Getting User Details Having ID:" +id);
    }
};

exports.getUserByEmail = async (req , res) => {
  
    const { email } = req.params;
     try {
    const user = await User.findOne({ email });
    if (!user) {
    return res.status(404).json({ error: "User not found"});
    }
    res.json(user);
    }catch (error) {

    res.send("Getting User Details Having ID:" +id);
    }
};

exports.addUser = async (req , res) => {
    const user = req.body;

    try{
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
    const deleteUser = await User.findByIdAndDelete(id , user, {new:true});
    if (!deleteUser) {
    return res.status(404).json({ error: "User not found"});
    }
    res.json(deleteUser);
    }catch (err) {

    res.status(500).json({ error: "Failed to delete user" });
    }

};