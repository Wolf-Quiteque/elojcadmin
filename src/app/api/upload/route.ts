import { NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

interface CloudinaryUploadResult {
  secure_url: string;
  [key: string]: unknown;
}

export async function POST(request: Request) {
  const formData = await request.formData();
  const file = formData.get("file") as File;

  if (!file) {
    return NextResponse.json({ error: "No file provided" }, { status: 400 });
  }

  const fileBuffer = await file.arrayBuffer();
  const mime = file.type;
  const encoding = "base64";
  const base64Data = Buffer.from(fileBuffer).toString("base64");
  const fileUri = `data:${mime};${encoding},${base64Data}`;

  try {
    const uploadToCloudinary = (): Promise<CloudinaryUploadResult> => {
      return new Promise((resolve, reject) => {
        cloudinary.uploader
          .upload(fileUri, { invalidate: true })
          .then(resolve)
          .catch(reject);
      });
    };

    const result = await uploadToCloudinary();
    return NextResponse.json({ url: result.secure_url });
  } catch (error) {
    console.error("Error uploading to Cloudinary:", error);
    return NextResponse.json(
      { error: "Error uploading to Cloudinary" },
      { status: 500 }
    );
  }
}
