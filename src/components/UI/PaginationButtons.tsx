import { useSearchFilters } from "@/hooks/useSearchFilters";
import { PageInfo } from '@/interfaces/PageInfo';

export default function Pagination(pageInfo: PageInfo) {
  const { setPage } = useSearchFilters();

  return (
    <div className="flex justify-center items-center gap-4 mt-8">
      <button
        onClick={() => setPage(pageInfo.currentPage - 1)}
        disabled={pageInfo.currentPage === 1}
        className={
          `min-w-24 px-4 py-2 bg-teal-700 text-white rounded-lg disabled:opacity-50  transition-colors ${
            pageInfo.currentPage === 1 ? 'cursor-not-allowed' : 'hover:bg-teal-600 cursor-pointer'
          }`
        }
      >
        Previous
      </button>
      <span className="text-gray-700">
        Page {pageInfo.currentPage} of {pageInfo.lastPage}
      </span>
      <button
        onClick={() => setPage(pageInfo.currentPage + 1)}
        disabled={!pageInfo.hasNextPage}
        className={
          `min-w-24 cursor-pointer px-4 py-2 bg-teal-700 text-white rounded-lg disabled:opacity-50 hover:bg-teal-600 transition-colors ${
            !pageInfo.hasNextPage ? 'cursor-not-allowed' : 'hover:bg-teal-600 cursor-pointer'
          }`
        }
      >
        Next
      </button>
    </div>
  )
}