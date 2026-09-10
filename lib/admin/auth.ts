import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export async function requireAdmin() {

    const supabase = await createClient();

    const {
        data: claimsData,
        error: claimsError,
    } = await supabase.auth.getClaims();

    const userId =
        claimsData?.claims?.sub;

    if (
        claimsError ||
        !userId
    ) {
        redirect("/admin/login");
    }


    const {
        data: admin,
        error: adminError,
    } = await supabase
        .from("admin_users")
        .select("user_id")
        .eq("user_id", userId)
        .maybeSingle();


 if (
    adminError ||
    !admin
) {

    redirect(
        "/admin/login?error=unauthorized"
    );
}


    return {
        userId,
        supabase,
    };
}