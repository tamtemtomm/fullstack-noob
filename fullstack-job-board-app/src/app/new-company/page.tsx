import { createCompany } from "../actions/workosActions";
import { getUser } from "@workos-inc/authkit-nextjs";
import { WorkOS } from "@workos-inc/node";

const NewCompanyPage = async () => {
  const workos = new WorkOS(process.env.WORKOS_API_KEY);
  const { user } = await getUser();
  const handleNewCompanyFormSubmit = async (data: FormData) => {
    "use server";
    if (user) {
      await createCompany(data.get("newCompanyName") as string, user.id);
    }
  };

  if (!user) {
    ("Login to use this page");
  }
  return (
    <div className="container">
      {" "}
      <h2 className="text-lg mt-6">Create a new company</h2>
      <p className="text-gray-500 text-sm mb-2">
        To create a job listing you first need to register the company
      </p>
      <form action={handleNewCompanyFormSubmit} className="flex gap-2">
        <input
          className="p-2 border border-gray-400 rounded-md"
          name="newCompanyName"
          type="text"
          placeholder="company name"
        />
        <button
          type="submit"
          className="flex gap-2 items-center bg-gray-200 px-4 py-2 rounded-md"
        >
          Create a Company
        </button>
      </form>
    </div>
  );
};

export default NewCompanyPage;
