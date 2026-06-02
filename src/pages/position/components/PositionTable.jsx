import { useEffect, useMemo, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { tableHeadStyle } from "../../../styles/tableStyles";
import EmptyData from "../../../components/EmptyData";
import TableSkeleton from "../../../components/TableSkeleton";
import PositionTableRow from "./PositionTableRow";

const TABLE_HEADERS = ["Nama Jabatan", "Level", "Status", "Aksi"];

const sortPositions = (positions) =>
  [...positions].sort((first, second) => {
    const firstLevel = first.level ?? Number.MAX_SAFE_INTEGER;
    const secondLevel = second.level ?? Number.MAX_SAFE_INTEGER;
    const firstOrder = first.order_index ?? Number.MAX_SAFE_INTEGER;
    const secondOrder = second.order_index ?? Number.MAX_SAFE_INTEGER;

    if (firstLevel !== secondLevel) {
      return firstLevel - secondLevel;
    }

    if (firstOrder !== secondOrder) {
      return firstOrder - secondOrder;
    }

    return first.name.localeCompare(second.name);
  });

const buildTree = (positions) => {
  const nodesById = new Map(
    positions.map((position) => [
      position.id,
      {
        ...position,
        children: [],
      },
    ]),
  );

  const roots = [];

  sortPositions(positions).forEach((position) => {
    const node = nodesById.get(position.id);
    const parent = nodesById.get(position.parent_id);

    if (parent && parent.id !== node.id) {
      parent.children.push(node);
      return;
    }

    roots.push(node);
  });

  const sortTree = (nodes) =>
    sortPositions(nodes).map((node) => ({
      ...node,
      children: sortTree(node.children),
    }));

  return sortTree(roots);
};

const filterTree = (nodes, search) => {
  const query = search.trim().toLowerCase();

  if (!query) {
    return nodes;
  }

  return nodes.reduce((filteredNodes, node) => {
    const filteredChildren = filterTree(node.children, search);
    const isMatch = node.name.toLowerCase().includes(query);

    if (isMatch || filteredChildren.length > 0) {
      filteredNodes.push({
        ...node,
        children: filteredChildren,
      });
    }

    return filteredNodes;
  }, []);
};

const flattenTree = (nodes, expandedIds, depth = 0) =>
  nodes.flatMap((node) => {
    const row = { ...node, depth };

    if (!expandedIds.has(node.id)) {
      return [row];
    }

    return [row, ...flattenTree(node.children, expandedIds, depth + 1)];
  });

const collectExpandableIds = (nodes) =>
  nodes.reduce((ids, node) => {
    if (node.children.length > 0) {
      ids.push(node.id, ...collectExpandableIds(node.children));
    }

    return ids;
  }, []);

export default function PositionTable({
  positions = [],
  loading = false,
  search = "",
  onDeleteData = () => {},
}) {
  const [expandedIds, setExpandedIds] = useState(new Set());

  const positionTree = useMemo(() => buildTree(positions), [positions]);
  const filteredTree = useMemo(
    () => filterTree(positionTree, search),
    [positionTree, search],
  );
  const rows = useMemo(
    () => flattenTree(filteredTree, expandedIds),
    [filteredTree, expandedIds],
  );

  useEffect(() => {
    setExpandedIds(new Set(collectExpandableIds(filteredTree)));
  }, [filteredTree]);

  const handleToggleExpanded = (positionId) => {
    setExpandedIds((prevExpandedIds) => {
      const nextExpandedIds = new Set(prevExpandedIds);

      if (nextExpandedIds.has(positionId)) {
        nextExpandedIds.delete(positionId);
      } else {
        nextExpandedIds.add(positionId);
      }

      return nextExpandedIds;
    });
  };

  if (!loading && rows.length === 0) {
    return <EmptyData message="Tidak ada jabatan yang ditemukan" />;
  }

  return (
    <>
      <TableContainer
        sx={{
          margin: "20px 0 10px 0",
          border: "1px solid #C4CDD5",
          borderRadius: "3px",
        }}
      >
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: "gray-100" }}>
              {TABLE_HEADERS.map((header) => (
                <TableCell
                  key={header}
                  align={header === "Status" || header === "Aksi" ? "center" : "left"}
                  sx={tableHeadStyle}
                >
                  {header}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          {loading ? (
            <TableSkeleton rows={8} columns={4} />
          ) : (
            <TableBody>
              {rows.map((position) => (
                <PositionTableRow
                  key={position.id}
                  position={position}
                  expanded={expandedIds.has(position.id)}
                  onToggleExpanded={handleToggleExpanded}
                  onDeleteData={onDeleteData}
                />
              ))}
            </TableBody>
          )}
        </Table>
      </TableContainer>
    </>
  );
}
