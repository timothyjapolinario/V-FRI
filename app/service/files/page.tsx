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
    <div className="flex flex-col justify-center items-center relative ">
      <h1 className="text-3xl font-bold text-center p-5">Files</h1>
      <div className="p-4">
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
          className="bg-green-700 p-1 rounded-md text-white"
          onClick={onClickUpload}
          disabled={isUploading}
        >
          Upload!
        </button>
      </div>

      {(isLoading || isUploading) && (
        <Image
          src="/icons/loading-spinner.svg"
          alt="loading-spinner"
          width={300}
          height={300}
          className="absolute top-[50px] bottom-0 right-0 left-0 m-auto z-20"
        />
      )}
      <div className="min-w-[70vw] w-full max-h-[60vh] p-6 flex gap-4 flex-wrap justify-center overflow-y-scroll">
        {cloudFiles.map((cf, index) => {
          return (
            <div
              key={"cf" + index}
              className="h-[200px] flex flex-col border-4 border-[#791212] border-solid my-1  w-[200px] p-2 relative gap-4 justify-between"
              style={{
                backgroundColor: index % 2 === 0 ? "#dbd3d8" : "#eff1f3",
              }}
            >
              <button
                className="px-2 bg-red-600 rounded-lg text-sm w-fit text-white "
                onClick={() => {
                  console.log("delete" + cf.fileName);
                  deleteFile(cf.fileName).then(() => {
                    trigger().then(() => {
                      console.log("file deleted");
                    });
                  });
                }}
              >
                Delete
              </button>
              <div className="flex items-center">
                <img
                  className="w-[100px]"
                  src={`/icons/${cf.contentType}.png`}
                />
                <a href={cf.downloadUrl}>
                  <p className="text-blue-500 underline">{cf.fileName}</p>
                </a>
              </div>
              <div className="flex items-center w-full justify-center">
                <a className="w-full" href={cf.downloadUrl}>
                  <button
                    className="px-2 bg-green-700 w-full rounded-lg text-white"
                    onClick={() => {
                      console.log("delete" + cf.fileName);
                      // deleteFile(cf.fileName).then(() => {
                      //   trigger().then(() => {
                      //     console.log("file deleted");
                      //   });
                      // });
                    }}
                  >
                    Download
                  </button>
                </a>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default Files;
