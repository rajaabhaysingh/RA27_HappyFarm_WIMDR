import React, { memo, lazy, Suspense } from "react";
import "./CategoryScroll.css";

import ErrorBoundary from "../../../errorBoundary/ErrorBoundary";

const CategoryScrollItem = lazy(() => import("./CategoryScrollItem"));

function CategoryScroll({ categoryList }) {
  return (
    <div className="category_scroll_main_div">
      <div className="category_scroll_inner_div">
        <ErrorBoundary>
          <Suspense fallback={""}>
            {categoryList.map((category) => (
              <CategoryScrollItem
                key={category.name}
                categoryName={category.name}
                iconUrl={category.iconUrl}
              />
            ))}
          </Suspense>
        </ErrorBoundary>
      </div>
    </div>
  );
}

export default memo(CategoryScroll);
