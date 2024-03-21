import axios from "axios";

export const UploadImage = async (images) => {
  console.log(images, "adjfklasjdflkasdjf");
  // return;
  try {
    const uploadedImages = await Promise.all(
      images.map(async (img) => {
        console.log(img, "sajfdasdjflasjdfasjd");
        const formData = new FormData();
        formData.append("file", img);
        formData.append("upload_preset", "bdfqt5ve");
        formData.append("folder", "next");

        const response = await fetch(
          "https://api.cloudinary.com/v1_1/dgveluvei/image/upload",
          {
            method: "POST",
            body: formData,
          }
        );
        const data = await response.json();
        console.log(data, "asdfjkjasdkf");
        return { imageFile: data };
      })
    );
    const tryapi = await fetch("http://localhost:3000/api/category/image", {
      method: "POST",
      body: JSON.stringify({ msg: "hai" }),
    });
    console.log(tryapi, "thisistryapi");
    console.log(uploadedImages, "Uploaded images");
    if (uploadedImages) {
      return uploadedImages;
    }
  } catch (error) {
    console.error("Error uploading images to Cloudinary:", error);
    throw error;
  }
};

export const deleteImage = async (imageFile, id) => {
  const data = { imageFile, id };
  const response = await fetch(`http://localhost:3000/api/category/image`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ data: data }),
  });
  const res = await response.json();
  // if (res.category) {
  //   setEditFormData((pre) => {
  //     return { ...pre, image: [res?.category?.image] };
  //   });
  //   setCarousalCount(0);
  // }
  console.log(res, "c");
  return res;
};
