import { sendVerificationEmail } from "@/helpers/sendVerificationEmail";
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/user.model";
import { signUpSchema } from "@/schemas/signUpSchema";
import bcrypt from "bcryptjs";

const SignUpSchema = signUpSchema;

export async function POST(request: Request) {
  await dbConnect();
  try {
    const { username, email, password } = await request.json();

    const result = SignUpSchema.safeParse({ username, email, password });
    console.log(result);
    if (!result.success) {
      const signUpErrors = result.error.issues.map((e) => e.message) || [];
      return Response.json(
        {
          success: false,
          message: signUpErrors,
        },
        { status: 400 }
      );
    }

    const existingVerifiedUserByUsername = await UserModel.findOne({
      username,
      isVerified: true,
    });

    if (existingVerifiedUserByUsername) {
      return Response.json(
        {
          success: false,
          message: "Username is already taken",
        },
        { status: 400 }
      );
    }

    const existingUserByEmail = await UserModel.findOne({ email });
    const verificationCode = Math.floor(
      100000 + Math.random() * 900000
    ).toString();

    if (existingUserByEmail) {
      if (existingUserByEmail.isVerified) {
        return Response.json(
          {
            success: false,
            message: "User already exists with this email",
          },
          { status: 400 }
        );
      } else {
        const hashedPassword = await bcrypt.hash(password, 10);
        existingUserByEmail.username = username;
        existingUserByEmail.password = hashedPassword;
        existingUserByEmail.verificationCode = verificationCode;
        existingUserByEmail.verificationCodeExpiry = new Date(
          Date.now() + 3600000
        );
        await existingUserByEmail.save();
      }
    } else {
      const hashedPassword = await bcrypt.hash(password, 10);
      const verificationCodeExpiry = new Date();
      verificationCodeExpiry.setHours(verificationCodeExpiry.getHours() + 1);

      const newUser = new UserModel({
        username,
        email,
        password: hashedPassword,
        verificationCode,
        verificationCodeExpiry,
        isVerified: false,
        isAcceptingMessages: true,
        messages: [],
      });
      await newUser.save();
    }

    // send verification code
    const emailResponse = await sendVerificationEmail(
      email,
      username,
      verificationCode
    );
    if (!emailResponse.success) {
      return Response.json(
        {
          success: false,
          messgae: emailResponse.message,
        },
        { status: 500 }
      );
    }

    return Response.json(
      {
        success: true,
        message: "User registered successfully. Please verify your account.",
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error registering user:", error);
    return Response.json(
      {
        success: false,
        message: "Failed to register user, try again",
      },
      {
        status: 500,
      }
    );
  }
}
