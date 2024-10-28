import PreviewLiveText from "@/components/Admin/Content/LiveText/Preview";
import LiveText from "@/components/LiveText";
const LiveTextPage = ()=> {
  return <div className="max-w-2xl sm:m-6 mx-auto">
    <LiveText />
    <ol className="relative border-s border-gray-400 dark:border-gray-700">
      <li className="mb-10 ms-4">
        <div
            className="absolute w-3 h-3 bg-gray-400 rounded-full mt-1.5 -start-1.5 border border-white dark:border-gray-900 dark:bg-gray-700"></div>
        <time className="mb-1 text-sm font-normal leading-none text-red-400 dark:text-gray-500">February 2022</time>

        <h3 className="text-lg mt-3 font-semibold text-gray-900 dark:text-white">Application UI code in Tailwind CSS</h3>
        <p className="mb-4 text-base font-normal text-gray-500 dark:text-gray-400">Get access to over 20+ pages
          including a dashboard layout, charts, kanban board, calendar, and pre-order E-commerce & Marketing pages.</p>

      </li>
      <li className="mb-10 ms-4">
        <div
            className="absolute w-3 h-3 bg-gray-400 rounded-full mt-1.5 -start-1.5 border border-white dark:border-gray-900 dark:bg-gray-700"></div>
        <time className="mb-1 text-sm font-normal leading-none text-red-400 dark:text-gray-500">February 2022</time>

        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Application UI code in Tailwind CSS</h3>
        <p className="mb-4 text-base font-normal text-gray-500 dark:text-gray-400">Get access to over 20+ pages
          including a dashboard layout, charts, kanban board, calendar, and pre-order E-commerce & Marketing pages.</p>

      </li>
    </ol>


  </div>


}

export default LiveTextPage;