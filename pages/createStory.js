import React from "react";
import Layout from "../components/Layout";
import TextEditor from "../components/TextEditor";

const CreateStory = () => {
  return (
    <Layout>
      <div className="w-full flex items-center flex-col min-h-screen">
        <div className="w-2/3 h-64">
          <TextEditor />
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded float-right">
            Save
          </button>
        </div>
      </div>
    </Layout>
  );
};

export default CreateStory;
