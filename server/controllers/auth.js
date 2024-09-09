import user from '../models/user.js';
import { hashPassword, comparePassword } from '../utils/helpers/auth.js';
import colors from 'colors';
import JWT from 'jsonwebtoken';

export const signIn = async (req, res) => {
  try {
    const email = req.query.email;
    const password = req.query.password;

    if (!email || !password) {
      return res.status(401).send({
        success: false,
        message: 'Invalid Crediantials!'
      });
    }
    const existingUser = await user.findOne({ email });
    if (!existingUser) {
      return res.status(200).send({
        success: false,
        message: "User doesn't Exists!"
      });
    }

    const isMatched = await comparePassword(password, existingUser.password);

    if (!isMatched) {
      return res.status(200).send({
        success: false,
        message: 'Invalid Password!'
      });
    }

    const token = JWT.sign(
      { _id: existingUser._id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.send({
      success: true,
      message: 'Signed In Successfully!',
      user: {
        name: existingUser.name,
        email: existingUser.email,
        phone: existingUser.phone,
        address: existingUser.address,
        privilege: existingUser.privilege
      },
      token
    });
  } catch (error) {
    console.log(error);
    res.send({
      success: false,
      message: "Error in SignIn!",
      error
    });
  }
}

export const signUp = async (req, res) => {
  try {
    console.log(req.body);
    const { name, email, password, phone, address } = await req.body;

    if (!name) {
      console.log('Name is Required!'.red);
      return res.send({ error: 'Name is Required!' });
    }
    if (!email) {
      console.log('Email is Required!'.red);
      return res.send({ error: 'Email is Required!' });
    }
    if (!password) {
      console.log('Password is Required!'.red);
      return res.send({ error: 'Password is Required!' });
    }
    if (!phone) {
      console.log('Phone is Required!'.red);
      return res.send({ error: 'Phone is Required!' });
    }
    if (!address) {
      console.log('Address is Required!'.red);
      return res.send({ error: 'Address is Required!' });
    }

    const existingUser = await user.findOne({ email });
    if (existingUser) {
      return res.status(200).send({
        success: true,
        message: 'User Already Signed up!'
      });
    }

    const hashedPassword = await hashPassword(password);
    const newUser = await new user({ name, email, password: hashedPassword, phone, address }).save();
    res.status(201).send({
      success: true,
      message: 'Signed up Successfully!',
      user: {
        name: newUser.name,
        email: newUser.email,
        phone: newUser.phone,
        address: newUser.address,
        privilege: newUser.privilege
      }
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: 'Sign up Error!',
      error
    });
  }
};

export const setStatus = async (req, res) => {
  res.status(200).send({ status: true });
}
