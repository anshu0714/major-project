import { v } from "convex/values";
import { action } from "./_generated/server";
import { Resend } from "resend";

export const sendEmail = action({
  args: {
    to: v.string(),
    subject: v.string(),
    text: v.optional(v.string()),
    html: v.string(),
    apiKey: v.string(),
  },

  handler: async (_, args) => {
    const resend = new Resend(args.apiKey);

    try {
      console.log("Sending email with payload:", {
        from: "Splitzy <onboarding@splitzy.website>",
        to: args.to,
        subject: args.subject,
      });

      const result = await resend.emails.send({
        from: "Splitzy <onboarding@splitzy.website>",
        to: args.to,
        subject: args.subject,
        html: args.html,
        text: args.text ?? "",
      });

      if (!result || result.error) {
        console.error("Resend API error:", result);
        return {
          success: false,
          error: result.error?.message ?? "Unknown error",
        };
      }

      console.log("Email sent successfully:", result);
      return { success: true, id: result.id };
    } catch (err) {
      console.error("Exception when sending email:", err);
      return {
        success: false,
        error: err instanceof Error ? err.message : String(err),
      };
    }
  },
});
