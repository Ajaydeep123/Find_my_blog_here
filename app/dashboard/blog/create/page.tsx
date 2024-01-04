"use client";
import React from "react";
import { toast } from "@/components/ui/use-toast";
import BlogForm from "../../components/BlogForm";
import { BlogFormSchemaType } from "../../schema";


function page() {
  const onHandleSubmit = async (data:BlogFormSchemaType) =>{
        toast({
        title: "You submitted the following values:",
        description: (
          <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
            <code className="text-white">{JSON.stringify(data, null, 2)}</code>
          </pre>
        ),
      })
  }

  return (
    <BlogForm
      onHandleSubmit={onHandleSubmit}
    />
    )
}

export default page