exports.getAllUsers = async (req , res) => {
    res.send("All User!");
};

exports.getUserById = async (req , res) => {
  
    const { id } = req.params;

    console.log(req.params);

    res.send("Getting User Details Having ID:" +id);
};

exports.addUser = async (req , res) => {
    const user = req.body;
    res.send("Adding User! "+ JSON.stringify(user));
};

exports.updateUser = async (req , res) => {
    const { id } = req.params;
    const user = req.body;

    res.send("Updating User having id "+id+" with "+ JSON.stringify(user));
};

exports.deleteUser = async (req , res) => {
    const { id } = req.params;

    res.send("Deleteing User having id :" +id);
};