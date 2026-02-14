"use client";

export default function Input({
                                  label,
                                  type = "text",
                                  ...props
                              }: {
    label: string;
    type?: string;
    [key: string]: any;
}) {
    return (
        <div className="mb-6">
            <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                {label}
            </label>
            <input
                type={type}
                {...props}
                className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-white/20
        bg-white dark:bg-black/40
        focus:ring-2 focus:ring-blue-500 outline-none transition"
            />
        </div>
    );
}