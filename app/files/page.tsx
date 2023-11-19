"use client";
import { getAllCloudFiles, uploadFile } from "@/clientApi/cloudFile";
import { appDomain } from "@/helpers/config";
import Image from "next/image";
import { useEffect, useState } from "react";

const Files = () => {
  const { cloudFiles, isLoading, isMutating, trigger } = getAllCloudFiles();
  const [selectedFile, setSelectedFile] = useState<File>();
  const [isUploading, setIsUploading] = useState(false);

  const onClickUpload = () => {
    if (selectedFile) {
      const existingFile = cloudFiles.find(
        (cf) => cf.fileName === selectedFile.name
      );
      if (existingFile) {
        alert("File Name already exist. Select other file or change file name");
        return;
      }
      setIsUploading(true);
      uploadFile(selectedFile).then(() => {
        console.log("tapos na mag upload");
        trigger().then(() => {
          console.log("tapos na mg fetch");
          setIsUploading(false);
        });
      });
    }
  };

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
        onClick={onClickUpload}
        disabled={isUploading}
      >
        Upload!
      </button>
      <p style={{ display: isUploading ? "" : "none" }}>
        Uploading na sya, chill ka muna
      </p>
      <ul>
        {(isLoading || isUploading) && (
          <Image
            src="/icons/loading-spinner.svg"
            alt="loading-spinner"
            width={100}
            height={100}
          />
        )}
        {cloudFiles.map((cf, index) => {
          return (
            <div
              key={"cf" + index}
              className="flex border-black border-solid border-2 w-full justify-between my-1"
            >
              <div className="flex items-center">
                <img src={`/icons/${cf.contentType}.png`} />
                <a href={cf.downloadUrl}>
                  <p className="text-blue-500 underline">
                    Filename: {cf.fileName}
                  </p>
                </a>
              </div>
            </div>
          );
        })}
      </ul>
    </div>
  );
};
export default Files;
