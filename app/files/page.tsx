"use client";
import {
  deleteFile,
  getAllCloudFiles,
  uploadFile,
} from "@/clientApi/cloudFile";
import { appDomain } from "@/helpers/config";
import { useSession } from "next-auth/react";
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
      <h1 className="text-3xl font-bold text-center p-5">Files</h1>
      <div className="float-right p-4">
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
      </div>

      <p style={{ display: isUploading ? "" : "none" }}>
        Uploading na sya, chill ka muna
      </p>
      <ul>
        {(isLoading || isUploading) && (
          <Image
            src="/icons/loading-spinner.svg"
            alt="loading-spinner"
            width={300}
            height={300}
            className="absolute top-[0] bottom-0 right-0 left-0 m-auto"
          />
        )}
        <div className="w-full p-6">
          <div className="grid grid-cols-3 w-full gap-1">
            <h1 className="col-span-2 text-center font-bold border-solid border-black border-2 text-xl p-2 rounded-md">
              File Name
            </h1>
            <h1 className="text-center font-bold border-solid border-black border-2 text-xl p-2 rounded-md">
              Actions
            </h1>
          </div>
          {cloudFiles.map((cf, index) => {
            return (
              <div
                key={"cf" + index}
                className="grid grid-cols-3 w-full border-2 border-black border-solid my-1"
                style={{
                  backgroundColor: index % 2 === 0 ? "#dbd3d8" : "#eff1f3",
                }}
              >
                <div className="flex items-center break-all col-span-2">
                  <img
                    className="w-[40px]"
                    src={`/icons/${cf.contentType}.png`}
                  />
                  <a href={cf.downloadUrl}>
                    <p className="text-blue-500 underline ">{cf.fileName}</p>
                  </a>
                </div>
                <div className="flex items-center w-full justify-center  ">
                  <button
                    className="mr-4 px-2 bg-red-600 w-fit rounded-lg text-white"
                    onClick={() => {
                      console.log("delete" + cf.fileName);
                      deleteFile(cf.fileName).then(() => {
                        trigger().then(() => {
                          console.log("tapos na delete");
                        });
                      });
                    }}
                  >
                    Delete
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </ul>
    </div>
  );
};
export default Files;
