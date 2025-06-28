import { type TextareaHTMLAttributes } from "react";

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
    
}
export const Textarea = ({...rest}:TextareaProps) => {
    return (
        <textarea
        {...rest}
        className=" mt-2 border-[1px] border-gray-300 shadow-lg focus:border-indigo-600 focus:outline-none focus:ring-1 focus:ring-indigo-600 rounded-lg px-3 py-3 text-md w-full bg-transparent"
        rows={6}
        />
    )
}
