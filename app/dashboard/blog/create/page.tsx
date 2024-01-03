"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { cn } from "@/lib/utils";
import Image from "next/image";

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { toast } from "@/components/ui/use-toast"
import { EyeOpenIcon,	Pencil1Icon,
	RocketIcon,
	StarIcon, } from "@radix-ui/react-icons"
import {BsSave} from "react-icons/bs"
import { Switch } from "@/components/ui/switch"
import { useState } from "react"
import { Textarea } from "@/components/ui/textarea";
import MarkdownPreview from "@/components/markdown/MarkdownPreview";

const FormSchema = z.object({
  title: z.string().min(2, {
    message: "Title must be at least 2 characters.",
  }),
  image_url: z.string().url({message:"Invalid url"}),
  content:z.string().min(2,{
    message:"Content must be at least 2 characters."
  }),
  is_published:z.boolean(),
  is_premium: z.boolean(),
}).refine(
		(data) => {
			const image_url = data.image_url;
			try {
				const url = new URL(image_url);
				return url.hostname === "images.unsplash.com";
			} catch {
				return false;
			}
		},
		{
			message: "Currently we are supporting only the image from unsplash",
			path: ["image_url"],
		}
	);

export default function BlogForm() {

  const [isPreview, setPreview] = useState(false);
  const form = useForm<z.infer<typeof FormSchema>>({
    mode:"all",
    resolver: zodResolver(FormSchema),
    defaultValues: {
      title: "",
      content:"",
      image_url:"",
      is_premium:false,
      is_published:true,
    },
  })

  function onSubmit(data: z.infer<typeof FormSchema>) {
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
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full border rounded-md space-y-6">
        <div className="p-5 flex items-center border-b flex-wrap justify-between gap-5">
          <div className="flex gap-5 items-center flex-wrap">
          <span role="button"
							tabIndex={0}
							className="flex gap-1 items-center border p-2 rounded-md hover:ring-2 hover:ring-zinc-400 transition-all bg-zinc-700"
              onClick={()=>setPreview(!isPreview && !form.getFieldState("image_url").invalid)}
              >
                {isPreview?(
                <>
                <Pencil1Icon/>
                Edit
                </>):(
                <>
                <EyeOpenIcon />
                Preview
                </>
                )}
          </span>
						<FormField
							control={form.control}
							name="is_premium"
							render={({ field }) => (
								<FormItem>
									<FormControl>
										<div className="flex items-center gap-1 border p-2 rounded-md bg-zinc-700">
											<StarIcon />
											<span >
												Premium
											</span>
											<Switch 
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      />
											
										</div>
									</FormControl>
								</FormItem>
							)}
						/>
            <FormField
							control={form.control}
							name="is_published"
							render={({ field }) => (
								<FormItem>
									<FormControl>
										<div className="flex items-center gap-1 border p-2 rounded-md bg-zinc-700">
											<RocketIcon />
											<span >
												Publish
											</span>
											<Switch checked={field.value}
                      onCheckedChange={field.onChange}
                      />
										</div>
									</FormControl>
								</FormItem>
							)}
						/>
            </div>
            <Button className="flex items-center gap-1"
                    disabled={!form.formState.isValid}
            >
              <BsSave/>
              Submit
            </Button>
        </div>
				<FormField
					control={form.control}
					name="title"
					render={({ field }) => (
						<FormItem>
							<FormControl>
								<>
									<div
										className={cn(
											"w-full flex break-words p-2 gap-2",
											isPreview
												? "divide-x-0"
												: "divide-x"
										)}
									>
										<Input
											placeholder="Blog title"
											{...field}
											autoFocus
											className={cn(
												"border-none text-lg font-medium leading-relaxed focus:ring-1 ring-green-500",
												isPreview
													? "w-0 p-0"
													: "w-full lg:w-1/2"
											)}
										/>
										<div
											className={cn(
												"lg:px-10",
												isPreview
													? "mx-auto w-full lg:w-4/5 "
													: " w-1/2 lg:block hidden "
											)}
										>
											<h1 className="text-3xl font-bold dark:text-gray-200">
												{form.getValues().title ||
													"Untitle blog"}
											</h1>
										</div>
									</div>
								</>
							</FormControl>

							{form.getFieldState("title").invalid &&
								form.getValues().title && (
									<div className="px-2">
										<FormMessage />
									</div>
								)}
						</FormItem>
					)}
				/>
        <FormField
					control={form.control}
					name="image_url"
					render={({ field }) => {
						return (
							<FormItem>
								<FormControl>
									<div
										className={cn(
											"w-full flex divide-x p-2 gap-2 items-center",
											isPreview
												? "divide-x-0"
												: "divide-x"
										)}
									>
										<Input
											placeholder="🔗 Image url"
											{...field}
											className={cn(
												"border-none text-lg font-medium leading-relaxed focus:ring-1 ring-green-500 ",
												isPreview
													? "w-0 p-0"
													: "w-full lg:w-1/2"
											)}
											type="url"
										/>
										<div
											className={cn(
												" relative",
												isPreview
													? "px-0 mx-auto w-full lg:w-4/5 "
													: "px-10 w-1/2 lg:block hidden"
											)}
										>
											{isPreview ? (
												<div className="w-full h-80 relative mt-10 border rounded-md">
													<Image
														src={
															form.getValues()
																.image_url
														}
														alt="preview"
														fill
														className=" object-cover object-center rounded-md"
													/>
												</div>
											) : (
												<p className="text-gray-400">
													👆 click on preview to see
													image
												</p>
											)}
										</div>
									</div>
								</FormControl>

								<div className="px-3">
									<FormMessage />
								</div>
							</FormItem>
						);
					}}
				/>
        <FormField
					control={form.control}
					name="content"
					render={({ field }) => (
						<FormItem>
							<FormControl>
								<div
									className={cn(
										"w-full flex p-2 gap-2 ",
										!isPreview
											? "divide-x h-70vh"
											: "divide-x-0"
									)}
								>
									<Textarea
										placeholder="Blog content"
										{...field}
										className={cn(
											"border-none text-lg font-medium leading-relaxed focus:ring-1 ring-green-500  h-70vh resize-none",
											isPreview
												? "w-0 p-0"
												: "w-full lg:w-1/2"
										)}
									/>
									<div
										className={cn(
											"overflow-scroll h-full",
											isPreview
												? "mx-auto w-full lg:w-4/5 "
												: "w-1/2 lg:block hidden"
										)}
									>
										<MarkdownPreview
											content={form.getValues().content}
											className="lg:px-10"
										/>
									</div>
								</div>
							</FormControl>

							{form.getFieldState("content").invalid &&
								form.getValues().content && <FormMessage />}
						</FormItem>
					)}
				/>
      </form>
    </Form>
  )
}
