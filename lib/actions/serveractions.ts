"use server";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { utapi } from "../UTApi";

export const getFiles = async (uploaderId: string) => {
  const data = await prisma.uploads.findMany({
    where: {
      uploaderId: uploaderId,
    },
  });
  return data;
};
import { PDFLoader } from "langchain/document_loaders/fs/pdf";
export const deleteFile = async (mongoid: string, utId: string) => {
  await prisma.$transaction(async (tx) => {
    await tx.uploads.delete({
      where: {
        id: mongoid,
      },
    });

    await utapi.deleteFiles(utId);
  });

  revalidatePath("/dashboard");
};

export const getFileById = async (fileId: string) => {
  const data = await prisma.uploads.findUnique({
    where: { id: fileId },
  });
  return data;
};

export const upload = async (
  fileUrl: string,
  fileKey: string,
  name: string,
  uploaderId: string,
) => {
  await prisma.uploads.create({
    data: {
      name: name,
      url: fileUrl,
      uploaderId: uploaderId,
      filekey: fileKey,
    },
  });

  revalidatePath("/dashboard");
};

export const currentPdf = async (fileUrl: string) => {
  const pdf = await fetch(fileUrl);
  const pdfBlob = await pdf.blob();

  const loader = new PDFLoader(pdfBlob, {
    splitPages: false,
  });

  const docs = await loader.load();
  return docs;
};
