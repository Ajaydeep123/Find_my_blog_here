import { Button } from '@/components/ui/button'
import Link from 'next/link'
import React from 'react'
import { EyeOpenIcon, Pencil1Icon, TrashIcon } from "@radix-ui/react-icons";
import { Switch} from "@/components/ui/switch"
export default function BlogTable() {
  return (
    <div className='rounded-md bg-graident-dark border-[0.5px] overflow-x-scroll'>
    <div className="w-[800px] md:w-full">
      <div className='grid grid-cols-5 p-5 text-gray-500 border-b'>
        <h1 className='col-span-2'>Title</h1>
        <h1>Premium</h1>
        <h1>Publish</h1>
      </div>
      <div className='grid grid-cols-5 p-5'>
        <h1 className='col-span-2'>Blog Title</h1>
        <Switch checked={false}/>
        <Switch checked={true}/>
        <Actions/>
      </div>
    </div>
    </div>
  )
}


const Actions = () => {
  return (
      <div className="flex items-center gap-2 md:flex-wrap">

              <Button className="flex gap-2 items-center" variant="outline">
                <EyeOpenIcon />
                View
              </Button>

              <Button className="flex gap-2 items-center" variant="outline">
                <Pencil1Icon />
                Edit
              </Button>
              <Button className="flex gap-2 items-center" variant="outline">
                <TrashIcon />
                Delete
              </Button>
          </div>
  )
}