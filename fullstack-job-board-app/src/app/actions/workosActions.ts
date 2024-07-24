"use server";
import {
  AutoPaginatable,
  OrganizationMembership,
  WorkOS,
} from "@workos-inc/node";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

const workos = new WorkOS(process.env.WORKOS_API_KEY);
export const createCompany = async (companyName: string, userId: string) => {
  const organization = await workos.organizations.createOrganization({
    name: companyName,
  });
  await workos.userManagement.createOrganizationMembership({
    userId: userId,
    organizationId: organization.id,
    roleSlug: "admin",
  });
  revalidatePath("/new-listing");
  redirect("/new-listing");
};
