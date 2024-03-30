"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useQuizzes } from "@/features/quiz";
import { cn } from "@/lib/utils";
import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  useReactTable,
} from "@tanstack/react-table";
import React, { useCallback } from "react";

const columns: ColumnDef<Quiz>[] = [
  {
    accessorKey: "question",
    header: "問題",
  },
  {
    accessorKey: "query",
  },
  {
    accessorKey: "answers",
    header: "答え",
  },
  {
    accessorKey: "checked",
    header: "チェック",
    cell: ({ row }) => <Checkbox defaultChecked={row.getValue("checked")} checked={row.getValue("checked")} />,
  },
];

type Quiz = {
  question: string;
  query: string;
  answers: string[];
  checked: boolean | undefined;
};

type Props = {
  quizzes: Quiz[];
};

export const QuizTable: React.FC<Props> = () => {
  const { quizzes, toggleQuizChecked } = useQuizzes();
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
  const handleChangeChecked = useCallback(
    (question: string) => () => {
      toggleQuizChecked(question);
    },
    [toggleQuizChecked],
  );

  const table = useReactTable({
    data: quizzes,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnFiltersChange: setColumnFilters,
    state: {
      columnFilters,
      columnVisibility: { query: false },
    },
  });

  return (
    <div>
      <Input
        placeholder="アカトマトガエル"
        value={(table.getColumn("query")?.getFilterValue() as string) ?? ""}
        onChange={(event) => table.getColumn("query")?.setFilterValue(event.target.value)}
        className="max-w-sm"
      />
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead
                    key={header.id}
                    className={cn(header.column.id === "checked" && "px-1 w-[30px] md:w-auto")}
                  >
                    {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                className="cursor-pointer select-none hover:bg-transparent md:hover:bg-muted/50"
                data-state={row.getIsSelected() && "selected"}
                onClick={handleChangeChecked(row.original.question)}
              >
                {row.getVisibleCells().map((cell) => {
                  return (
                    <TableCell
                      key={cell.id}
                      className={cn(
                        "h-auto p-2 md:h-[40px] md:px-4",
                        cell.column.id === "checked" && "w-[40px] md:w-auto",
                      )}
                    >
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  );
                })}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};
