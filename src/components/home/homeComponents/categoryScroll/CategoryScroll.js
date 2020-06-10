import React, { memo, lazy, Suspense } from "react";
import "./CategoryScroll.css";

import FallbackLazy from "../../../FallbackLazy";
import ErrorBoundary from "../../../errorBoundary/ErrorBoundary";

const CategoryScrollItem = lazy(() => import("./CategoryScrollItem"));

function CategoryScroll({ categoryList }) {
  return (
    <div className="category_scroll_main_div">
      <div className="category_scroll_inner_div">
        {categoryList.map((category) => (
          <ErrorBoundary>
            <Suspense fallback={<FallbackLazy />}>
              <CategoryScrollItem
                key={category.name}
                categoryName={category.name}
                iconURL={category.catIconUrl}
              />
            </Suspense>
          </ErrorBoundary>
        ))}
      </div>
    </div>
  );
}

export default memo(CategoryScroll);
