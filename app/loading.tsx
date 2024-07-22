export default function Loading() {
    return (
        <div className="flex justify-center items-center h-screen w-full">

            <div className="inline-block h-10 w-10 animate-spin rounded-full border-2 border-primary border-solid border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_1.5s_linear_infinite] dark:text-white" />
        </div>
    );
}