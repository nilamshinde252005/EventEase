import { registerUser, loginUser } from "./service.js";

export async function registerController(req, res) {
  try {
    const { name, email, password } = req.body;

    const result = await registerUser({ name, email, password });

    return res.status(201).json({
      success: true,
      message: "User registered successfully",
      data: result,
    });
  } catch (err) {
    console.error("Register error:", err);

    const status = err.status || 500;
    return res.status(status).json({
      success: false,
      message: err.message || "Something went wrong during registration",
    });
  }
}

export async function loginController(req, res) {
  try {
    const { email, password } = req.body;

    const result = await loginUser({ email, password });

    return res.status(200).json({
      success: true,
      message: "Login successful",
      data: result,
    });
  } catch (err) {
    console.error("Login error:", err);

    const status = err.status || 500;
    return res.status(status).json({
      success: false,
      message: err.message || "Something went wrong during login",
    });
  }
}
