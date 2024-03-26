"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useQuizzes } from "@/features/quiz";
import { ColumnDef, flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table";
import React, { useCallback } from "react";

const columns: ColumnDef<Quiz>[] = [
  {
    accessorKey: "question",
    header: "問題",
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
  });

  return (
    <Table>
      <TableHeader>
        {table.getHeaderGroups().map((headerGroup) => (
          <TableRow key={headerGroup.id}>
            {headerGroup.headers.map((header) => {
              return (
                <TableHead key={header.id}>
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
              className="cursor-pointer select-none"
              data-state={row.getIsSelected() && "selected"}
              onClick={handleChangeChecked(row.original.question)}
            >
              {row.getVisibleCells().map((cell) => (
                <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
              ))}
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
  );
};
