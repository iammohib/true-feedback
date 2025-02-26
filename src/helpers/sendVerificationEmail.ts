import { ApiResponse } from "@/types/ApiResponse";
import { resend } from "@/lib/resend";
import VerificationEmail from "../../emails/VerificationEmail";

export async function sendVerificationEmail(
  email: string,
  username: string,
  verificationCode: string
): Promise<ApiResponse> {
  try {
    await resend.emails.send({
      from: `${process.env.WEBSITE_NAME} <support@mail.mohibs.site>`,
      to: email,
      subject: "True-Feedback verification code",
      react: VerificationEmail({ username, otp: verificationCode }),
    });
    return {
      success: true,
      message: "Verification email sent to your email successfullly.",
    };
  } catch (emailError) {
    console.error("Error sending verification email:", emailError);
    return {
      success: false,
      message: "Failed to send verification email.",
    };
  }
}
