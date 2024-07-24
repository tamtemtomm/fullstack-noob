"use server";
import { getUser } from "@workos-inc/authkit-nextjs";
import {
  AutoPaginatable,
  OrganizationMembership,
  WorkOS,
} from "@workos-inc/node";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

const NewListing = async () => {
  const workos = new WorkOS(process.env.WORKOS_API_KEY);
  const { user } = await getUser();
  if (!user) {
    return (
      <div className="container">
        <div>You need to be logged in to post a job</div>
      </div>
    );
  }

  const organizationMemberships: AutoPaginatable<OrganizationMembership> | null =
    await workos.userManagement.listOrganizationMemberships({
      userId: user.id,
    });

  const activeOrganizationMemberships = organizationMemberships.data.filter(
    (om) => om.status === "active"
  );
  const organizationsNames: { [key: string]: string } = {};
  for (const activeMemberships of activeOrganizationMemberships) {
    const organization = await workos.organizations.getOrganization(
      activeMemberships.organizationId
    );
    organizationsNames[organization.id] = organization.name;
  }

  return (
    <div className="container">
      <div>
        {/* <pre>{JSON.stringify(organizationsNames)}</pre> */}

        <h2 className="text-lg mt-6">Your companies</h2>
        <p className="text-gray-500 text-sm mb-2">
          Select company to create a job ad for
        </p>
        <div>
          <div className="border inline-block rounded-md ">
            {Object.keys(organizationsNames).map((orgId) => (
              <Link
                href={"/new-listing/" + orgId}
                key={orgId}
                className={
                  "py-2 px-4 block flex gap-2 items-center" +
                  (Object.keys(organizationsNames)[0] === orgId
                    ? ""
                    : "border-t")
                }
              >
                {organizationsNames[orgId]}
                <FontAwesomeIcon className="h-4" icon={faArrowRight} />
              </Link>
            ))}
          </div>
        </div>

        {organizationMemberships.data.length === 0 && (
          <div className="border border-blue-300 bg-blue-50 p-4 rounded-md">
            No company found assigned to your users
          </div>
        )}

        <Link
          href={"/new-company"}
          className="inline-flex bg-gray-200 px-4 py-2 rounded-md mt-6 items-center gap-2"
        >
          Create a new company
          <FontAwesomeIcon className="h-4" icon={faArrowRight} />
        </Link>
      </div>
    </div>
  );
};

export default NewListing;
