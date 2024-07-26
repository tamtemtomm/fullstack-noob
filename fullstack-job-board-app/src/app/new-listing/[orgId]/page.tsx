import { getUser } from "@workos-inc/authkit-nextjs";
import { WorkOS } from "@workos-inc/node";
import React from "react";

type PageProps = {
  params: {
    orgId: string;
  };
};

const NewListingForOrgPage = async (props: PageProps) => {
  const { user } = await getUser();
  const workos = new WorkOS(process.env.WORKOS_API_KEY);
  if (!user) {
    return "Please Log In";
  }

  const orgId = props.params.orgId;
  const oms = await workos.userManagement.listOrganizationMemberships({
    userId: user.id,
    organizationId: orgId,
  });
  const hasAcces = oms.data.length > 0;
  if (!hasAcces) {
    return "No Access";
  }

  return (
    <form action="" className="container mt-6">
      {/* {JSON.stringify(props)} */}
      <input type="text" className="border p-2" placeholder="Job title"/>
    </form>
  );
};

export default NewListingForOrgPage;
