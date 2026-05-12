export default function Loading() {

    return (
        <>
            <div className="fixed inset-0 flex items-center justify-center bg-black/30 z-50">
                <div className="relative flex items-center justify-center min-h-screen z-2">
                    <span className="loading loading-ring loading-xs"></span>
                    <span className="loading loading-ring loading-sm"></span>
                    <span className="loading loading-ring loading-md"></span>
                    <span className="loading loading-ring loading-lg"></span>
                    <span className="loading loading-ring loading-xl"></span>
                </div>
            </div >
        </>
    )
}