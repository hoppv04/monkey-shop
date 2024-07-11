type Props = {
  currentPage: number;
  totalPages: number;
  onPageChange: (pageItem: number) => void;
};

const Pagination = ({ currentPage, totalPages = 10, onPageChange }: Props) => {
  const generateNoOfPages = () => {
    const pages = [];

    for (let i = 1; i <= totalPages; i++) {
      pages.push(i);
    }

    return pages;
  };

  return (
    <>
      <nav aria-label="Page navigation">
        <ul className="pagination justify-content-center">
          <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
            <button
              onClick={() => onPageChange(currentPage - 1)}
              className="page-link"
            >
              Previous
            </button>
          </li>
          {generateNoOfPages().map((pageItem) => (
            <li
              className={`page-item ${
                currentPage === pageItem ? "active" : ""
              }`}
              key={pageItem}
            >
              <button
                className="page-link"
                onClick={() => onPageChange(pageItem)}
              >
                {pageItem}
              </button>
            </li>
          ))}
          <li
            className={`page-item ${
              currentPage === totalPages ? "disabled" : ""
            }`}
          >
            <button
              onClick={() => onPageChange(currentPage + 1)}
              className="page-link"
            >
              Next
            </button>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default Pagination;
