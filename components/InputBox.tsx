import {
  CameraIcon,
  EmojiHappyIcon,
  VideoCameraIcon,
} from "@heroicons/react/solid";
import { NextComponentType } from "next";
import { useSession } from "next-auth/react";
import Image from "next/image";
import React, { useRef, useState } from "react";
import { db, storage } from "../firebase";
import {
  addDoc,
  collection,
  doc,
  setDoc,
  Timestamp,
  updateDoc,
} from "firebase/firestore";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import { url } from "inspector";

const InputBox: NextComponentType = () => {
  const { data: session, status } = useSession();
  const inputRef = useRef<HTMLInputElement>(null);
  const curInputRef = inputRef.current!;
  const filePickerRef = useRef<HTMLInputElement>(null);
  const curFilePickerRef = filePickerRef.current!;
  const [imageToPost, setImageToPost] = useState<
    string | ArrayBuffer | null | undefined
  >(null);

  const sendPost = async (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    const inputVal = inputRef.current!.value;
    const filePickerVal = curFilePickerRef.value;
    curFilePickerRef.value = "";
    console.log(inputVal);
    inputRef.current!.value = "";

    if (!inputVal) return;

    const postCol = collection(db, "posts");

    await addDoc(postCol, {
      message: inputVal,
      name: session?.user?.name,
      email: session?.user?.email,
      image: session?.user?.image,
      timestamp: Timestamp.fromDate(new Date()),
    })
      .then((d) => {
        if (imageToPost) {
          const uploadRef = ref(storage, `posts/${d.id}`);

          uploadString(uploadRef, imageToPost as string, "data_url")
            .then((snapShot) => {
              getDownloadURL(snapShot.ref)
                .then((url) => {
                  updateDoc(doc(postCol, d.id), {
                    postImage: url,
                  }).catch((e) => {
                    console.log("Update postImage Error : ", e);
                  });
                })
                .catch((e) => {
                  console.log("Get URL Error : ", e);
                });
            })
            .catch((e) => {
              console.log("upload error : ", e);
            });
        }
      })
      .catch((e) => {
        console.log("add post error : ", e);
      });

    setImageToPost(null);
  };

  const addImageToPost = (e: React.FormEvent<HTMLInputElement>) => {
    const event = e.target as HTMLInputElement;

    const reader = new FileReader();
    if (event.files![0]) {
      reader.readAsDataURL(event.files![0]);
    }

    reader.onload = (readerE) => {
      setImageToPost(readerE.target!.result);
    };
  };

  const removeImage = () => {
    setImageToPost(null);
    curFilePickerRef.value = "";
  };

  return (
    <div className="bg-white p-2 rounded-2xl shadow-md text-gray-500 font-medium mt-6">
      <div className="flex space-x-4 p-4 items-center">
        <Image
          className="rounded-full"
          src={session?.user?.image!}
          width={40}
          height={40}
          layout="fixed"
        />
        <form className="flex flex-1">
          <input
            type="text"
            ref={inputRef}
            className="rounded-full h-12 bg-gray-100 flex-grow px-5 focus:outline-none"
            placeholder={`what's on your mind, ${session?.user?.name}`}
          />
          <button hidden type="submit" onClick={sendPost}>
            Submit
          </button>
        </form>
        {imageToPost && (
          <div
            onClick={() => removeImage()}
            className="flex flex-col filter hover:brightness-110 transition duration-150 transform hover:scale-105 cursor-pointer"
          >
            <img
              className="h-10 object-contain"
              src={imageToPost as string}
              alt="previewPost"
            />
            <p className="text-xs text-red-500 text-center">Remove</p>
          </div>
        )}
      </div>
      <div className="flex justify-evenly p-3 border-t">
        <div className="inputIcon">
          <VideoCameraIcon className="h-7 text-red-500" />
          <p className="text-xs sm:text-sm xl:text-base">Live Video</p>
        </div>
        <div
          className="inputIcon"
          onClick={() => {
            curFilePickerRef.click()!;
          }}
        >
          <CameraIcon className="h-7 text-green-500" />
          <p className="text-xs sm:text-sm xl:text-base">Photo/Video</p>
          <input
            hidden
            ref={filePickerRef}
            onInput={(e) => {
              addImageToPost(e);
            }}
            type="file"
          />
        </div>
        <div className="inputIcon">
          <EmojiHappyIcon className="h-7 text-yellow-500" />
          <p className="text-xs sm:text-sm xl:text-base">Felling/Activity</p>
        </div>
      </div>
    </div>
  );
};

export default InputBox;
