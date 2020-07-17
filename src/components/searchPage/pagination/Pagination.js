import React from "react";
import "./Pagination.css";

const Pagination = ({
  totalPage,
  activePage,
  gotoSpecificPage,
  gotoNextPage,
  gotoPrevPage,
  gotoStart,
  gotoEnd,
}) => {
  // getPageClass
  const getPageClass = (pageNo) => {
    return pageNo === activePage
      ? "pagination_page_active"
      : "pagination_page_inactive";
  };

  // renderMultiplePage
  const renderMultiplePage = () => {
    if (activePage === 1 || activePage === 2) {
      return;
    } else if (activePage === totalPage || activePage === totalPage - 1) {
    } else {
    }
  };

  // renderPaginationContent
  const renderPaginationContent = () => {
    if (totalPage === 1) {
      activePage = 1;
      return (
        <div className="pagination_page_list">
          <div className="pagination_page_active">1</div>
        </div>
      );
    } else if (totalPage > 1 && totalPage <= 5) {
      switch (totalPage) {
        case 2:
          return (
            <div className="pagination_page_list">
              <div className="pagination_next_prev">
                <i className="fas fa-angle-left"></i>
              </div>
              <div
                onClick={() => gotoSpecificPage(1)}
                className={getPageClass(1)}
              >
                1
              </div>
              <div
                onClick={() => gotoSpecificPage(2)}
                className={getPageClass(2)}
              >
                2
              </div>
              <div className="pagination_next_prev">
                <i className="fas fa-angle-right"></i>
              </div>
            </div>
          );
        case 3:
          return (
            <div className="pagination_page_list">
              <div className="pagination_next_prev">
                <i className="fas fa-angle-left"></i>
              </div>
              <div
                onClick={() => gotoSpecificPage(1)}
                className={getPageClass(1)}
              >
                1
              </div>
              <div
                onClick={() => gotoSpecificPage(2)}
                className={getPageClass(2)}
              >
                2
              </div>
              <div
                onClick={() => gotoSpecificPage(3)}
                className={getPageClass(3)}
              >
                3
              </div>
              <div className="pagination_next_prev">
                <i className="fas fa-angle-right"></i>
              </div>
            </div>
          );
        case 4:
          return (
            <div className="pagination_page_list">
              <div className="pagination_next_prev">
                <i className="fas fa-angle-left"></i>
              </div>
              <div
                onClick={() => gotoSpecificPage(1)}
                className={getPageClass(1)}
              >
                1
              </div>
              <div
                onClick={() => gotoSpecificPage(2)}
                className={getPageClass(2)}
              >
                2
              </div>
              <div
                onClick={() => gotoSpecificPage(3)}
                className={getPageClass(3)}
              >
                3
              </div>
              <div
                onClick={() => gotoSpecificPage(4)}
                className={getPageClass(4)}
              >
                4
              </div>
              <div className="pagination_next_prev">
                <i className="fas fa-angle-right"></i>
              </div>
            </div>
          );
        case 5:
          return (
            <div className="pagination_page_list">
              <div className="pagination_next_prev">
                <i className="fas fa-angle-left"></i>
              </div>
              <div
                onClick={() => gotoSpecificPage(1)}
                className={getPageClass(1)}
              >
                1
              </div>
              <div
                onClick={() => gotoSpecificPage(2)}
                className={getPageClass(2)}
              >
                2
              </div>
              <div
                onClick={() => gotoSpecificPage(3)}
                className={getPageClass(3)}
              >
                3
              </div>
              <div
                onClick={() => gotoSpecificPage(4)}
                className={getPageClass(4)}
              >
                4
              </div>
              <div
                onClick={() => gotoSpecificPage(5)}
                className={getPageClass(5)}
              >
                5
              </div>
              <div className="pagination_next_prev">
                <i className="fas fa-angle-right"></i>
              </div>
            </div>
          );

        default:
          break;
      }
    } else if (totalPage > 5) {
      return (
        <div className="pagination_page_list">
          {renderMultiplePage()}
          <div className="pagination_page_active">
            {"<<"} {"<"} [1] 2 ... 5 6 {">"} {">>"}
            {"<<"} {"<"} ... 3 [4] 5 ... {">"} {">>"}
            {"<<"} {"<"} [1] 2 ... [5] 6 {">"} {">>"}
          </div>
        </div>
      );
    }
  };
  return (
    <div className="pagination_main_div">
      <div className="pagination_inner_div">{renderPaginationContent()}</div>
    </div>
  );
};

export default Pagination;
