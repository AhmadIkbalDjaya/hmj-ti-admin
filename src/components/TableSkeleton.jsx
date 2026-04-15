import { Skeleton, TableBody, TableCell, TableRow } from "@mui/material";

export default function TableSkeleton({ rows = 6, columns = 7 }) {
  return (
    <TableBody>
      {[...Array(rows)].map((_, index) => (
        <TableRow key={index}>
          {[...Array(columns)].map((_, colIndex) => (
            <TableCell key={colIndex} sx={{ paddingY: "8px" }}>
              <Skeleton height={25} />
            </TableCell>
          ))}
        </TableRow>
      ))}
    </TableBody>
  );
}
