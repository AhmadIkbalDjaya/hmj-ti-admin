import { useState, useEffect, useCallback } from "react";

export const useBulkSelection = ({
  items = [],
  totalRecords = 0,
  filters = {},
  onReset = () => {},
}) => {
  const [selectedIds, setSelectedIds] = useState(new Set());
  const [excludedIds, setExcludedIds] = useState(new Set());
  const [isSelectAllRecords, setIsSelectAllRecords] = useState(false);

  const resetSelection = useCallback(() => {
    setSelectedIds(new Set());
    setExcludedIds(new Set());
    setIsSelectAllRecords(false);
    onReset();
  }, [onReset]);

  // Reset selection when filters change
  useEffect(() => {
    resetSelection();
  }, [filters.search, filters.page, filters.perpage]);

  const isRowSelected = useCallback(
    (id) => {
      if (isSelectAllRecords) {
        return !excludedIds.has(id);
      }
      return selectedIds.has(id);
    },
    [isSelectAllRecords, excludedIds, selectedIds],
  );

  const selectedCount = isSelectAllRecords
    ? totalRecords - excludedIds.size
    : selectedIds.size;

  const isPageSelected =
    items.length > 0 && items.every((item) => isRowSelected(item.id));

  const toggleRow = (id) => {
    if (isSelectAllRecords) {
      setExcludedIds((prev) => {
        const next = new Set(prev);
        if (next.has(id)) {
          next.delete(id);
        } else {
          next.add(id);
        }
        return next;
      });
    } else {
      setSelectedIds((prev) => {
        const next = new Set(prev);
        if (next.has(id)) {
          next.delete(id);
        } else {
          next.add(id);
        }
        return next;
      });
    }
  };

  const togglePage = () => {
    if (isPageSelected) {
      // Deselect all on current page
      if (isSelectAllRecords) {
        resetSelection();
        // setExcludedIds((prev) => {
        //   const next = new Set(prev);
        //   items.forEach((item) => next.add(item.id));
        //   return next;
        // });
      } else {
        setSelectedIds((prev) => {
          const next = new Set(prev);
          items.forEach((item) => next.delete(item.id));
          return next;
        });
      }
    } else {
      // Select all on current page
      if (isSelectAllRecords) {
        setExcludedIds((prev) => {
          const next = new Set(prev);
          items.forEach((item) => next.delete(item.id));
          return next;
        });
      } else {
        setSelectedIds((prev) => {
          const next = new Set(prev);
          items.forEach((item) => next.add(item.id));
          return next;
        });
      }
    }
  };

  const activateSelectAll = () => {
    setIsSelectAllRecords(true);
    setExcludedIds(new Set());
    setSelectedIds(new Set());
  };

  const getBulkPayload = () => {
    if (isSelectAllRecords) {
      return {
        select_all: true,
        exclude_ids: Array.from(excludedIds),
        filters: filters,
      };
    }
    return {
      ids: Array.from(selectedIds),
    };
  };

  return {
    selectedIds,
    excludedIds,
    isSelectAllRecords,
    isRowSelected,
    selectedCount,
    isPageSelected,
    toggleRow,
    togglePage,
    activateSelectAll,
    getBulkPayload,
    resetSelection,
  };
};
