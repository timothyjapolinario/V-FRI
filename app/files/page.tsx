"use client";
import { getAllCloudFiles, uploadFile } from "@/clientApi/cloudFile";
import { appDomain } from "@/helpers/config";
import { useEffect, useState } from "react";

const Files = () => {
  const { cloudFiles, refreshCloudFiles } = getAllCloudFiles();
  const [selectedFile, setSelectedFile] = useState<File>();
  const [isUploading, setIsUploading] = useState(false);
  return (
    <div>
      <h1>Files</h1>
      <input
        type="file"
        onChange={(e) => {
          const files = e.target.files;
          if (files) {
            setSelectedFile(files[0]);
          }
        }}
      />
      <button
        className="bg-green-500 p-1 rounded-md"
        onClick={() => {
          if (selectedFile) {
            setIsUploading(true);
            uploadFile(selectedFile).then(() => {
              refreshCloudFiles(() => {
                setIsUploading(false);
              });
            });
          }
        }}
        disabled={isUploading}
      >
        Upload!
      </button>
      <p style={{ display: isUploading ? "" : "none" }}>
        Uploading na sya, chill ka muna
      </p>
      <ul>
        {cloudFiles.map((cf, index) => {
          return (
            <div
              key={"cf" + index}
              className="border-black border-solid border-2 w-fit"
            >
              <p>Filename: {cf.fileName}</p>
              <p>ContentType: {cf.contentType}</p>
            </div>
          );
        })}
      </ul>
    </div>
  );
};
export default Files;
