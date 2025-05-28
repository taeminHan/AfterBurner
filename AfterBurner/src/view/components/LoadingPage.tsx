import {LoadingSpinner} from "@/component/LoadingSpinner.tsx";

const LoadingPage = () => {
    return (
        <div className="flex justify-center items-center h-screen w-screen fixed top-0 left-0">
            <LoadingSpinner />
        </div>
    );
}

export default LoadingPage;