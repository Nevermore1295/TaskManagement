import { connectDB, initDB } from "@/utils/db";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  await initDB(); // Ensure the database table exists

  const { email, password, name } = req.body;
  if (!email || !password || !name) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const db = await connectDB();

    // Check if the email already exists
    const [existingUser] = await db.execute("SELECT id FROM users WHERE email = ?", [email]);

    if (existingUser.length > 0) {
      await db.end();
      return res.status(400).json({ message: "Email is already in use" });
    }

    // Insert user into the database
    const [result] = await db.execute(
      "INSERT INTO users (email, password, name, created_) VALUES (?, ?, ?)",
      [email, password, name]
    );

    await db.end();

    res.status(201).json({ 
      message: "User registered successfully!", 
      userId: result.insertId 
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
}