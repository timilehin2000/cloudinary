const User = require("../model/user");
const cloudinary = require("../utils/cloudinary");
exports.createUser = async (req, res) => {
  const { name } = req.body;
  const image = req.file;
  try {
    const result = await cloudinary.uploader.upload(image.path);

    let user = new User({
      name,
      avatar: result.secure_url,
      cloudinary_id: result.public_id,
    });

    await user.save();
    res.json({ user });
  } catch (err) {
    console.log(err);
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    let user = await User.find();
    res.json(user);
  } catch (err) {
    console.log(err);
  }
};

exports.updateUser = async (req, res) => {
  const { name, avatar } = req.body;
  try {
    let findUser = await User.findById(req.params.id);

    await cloudinary.uploader.destroy(findUser.cloudinary_id);
    const result = await cloudinary.uploader.upload(req.file.path);
    console.log(result);

    const data = {
      name: req.body.name || findUser.name,
      imageUrl: result.secure_url || findUser.image,
      cloudinary_id: result.public_id || findUser.cloudinary_id,
    };
    user = await User.findByIdAndUpdate(req.params.id, data, { new: true });

    res.json({
      message: "Details successully updated!",
      user,
    });
  } catch (err) {
    console.log(err);
  }
};
exports.deleteUser = async (req, res) => {
  const id = req.params.id;
  try {
    const findUser = await User.findById(id);
    if (findUser) {
      await User.deleteOne(findUser);
      await cloudinary.uploader.destroy(findUser.cloudinary_id);

      return res.json({
        message: "Successfully removed user!",
      });
    }
    return res.status(401).json({
      message: "User not found!. Try again",
    });
  } catch (err) {
    console.log(err);
  }
};
