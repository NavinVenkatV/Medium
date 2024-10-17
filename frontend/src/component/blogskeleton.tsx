import { Circle } from "./Blogcard"

export const BlogSkeleton = ()=>{
    return <div role="status" className="max-w-sm animate-pulse">

        <div className=" p-7 border-b border-slate-200 pb-4 w-screen max-w-screen-md cursor-pointer ">
                <div className="flex">
                <div className="h-2.5 bg-gray-200 rounded-full w-48 mb-4"></div>
                    <div className="flex justify-center flex-col pl-2">
                        <Circle />
                    </div>
                    <div className="pl-2 font-thin text-slate-500 text-sm flex justify-center flex-col">
                    </div>
                </div>
                <div className="text-xl font-semibold pt-2">
                <div className="h-2.5 bg-gray-200 rounded-full w-48 mb-4"></div>

                </div>
                <div className="text-md font-thin">
                <div className="h-2.5 bg-gray-200 rounded-full w-48 mb-4"></div>
                </div>
                <div className="text-slate-500 text-sm font-thin pt-4">
                <div className="h-2.5 bg-gray-200 rounded-full w-48 mb-4"></div>
                </div>
        </div>
        <span className="sr-only">Loading...</span>
    </div>

}