import { connectDB } from "../../../lib/mongodb"; // MongoDB se connect karne ka function
import Message from "../../../models/message"; // Message model
import nodemailer from "nodemailer";

export async function POST(req) {
  try {
    const { name, email, message } = await req.json();

    // 1️⃣ MongoDB se connect karo
    await connectDB();

    // 2️⃣ MongoDB me message save karo
    const newMessage = new Message({ name, email, message });
    await newMessage.save();

    // 3️⃣ Nodemailer configuration
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER, // Tumhara Gmail
        pass: process.env.EMAIL_PASS, // App Password
      },
    });

    // 4️⃣ Email send karne ke liye details
    const mailOptions = {
      from: email, // User ka email
      to: process.env.EMAIL_USER, // Tumhara email
      subject: `New Contact Form Submission from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
    };

    // 5️⃣ Email send karo
    await transporter.sendMail(mailOptions);

    return Response.json({ success: true, message: "Message saved & email sent successfully!" });
  } catch (error) {
    console.error("Error:", error);
    return Response.json({ success: false, message: "Failed to save & send message." });
  }
}
