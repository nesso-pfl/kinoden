"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useQuizzes } from "@/features/quiz";
import { cn } from "@/lib/utils";
import {
  Cell,
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  useReactTable,
} from "@tanstack/react-table";
import React, { useCallback, useState } from "react";
import { HelpTooltip } from "../../../../components/ui/help-tooltip";

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
  const [hideAnswers, setHideAnswers] = useState(false);
  const [hiddenAnswers, setHiddenAnswers] = useState<string[]>(quizzes.map((quiz) => quiz.question));
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
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

  const handleClickCell = useCallback(
    (cell: Cell<Quiz, unknown>) => () => {
      if (cell.column.id === "checked") {
        toggleQuizChecked(cell.row.original.question);
      } else if (cell.column.id === "answers" && hideAnswers) {
        setHiddenAnswers((prevHiddenAnswers) => {
          return prevHiddenAnswers.includes(cell.row.original.question)
            ? prevHiddenAnswers.filter((answer) => answer !== cell.row.original.question)
            : [...prevHiddenAnswers, cell.row.original.question];
        });
      }
    },
    [toggleQuizChecked, hideAnswers],
  );

  return (
    <div>
      <div className="flex gap-x-8 items-center flex-wrap">
        <div className="grid w-full max-w-sm items-center gap-1.5 mb-4">
          <Label>問題絞り込み</Label>
          <Input
            placeholder="アカトマトガエル"
            value={(table.getColumn("query")?.getFilterValue() as string) ?? ""}
            onChange={(event) => table.getColumn("query")?.setFilterValue(event.target.value)}
            className="max-w-sm text-base xl:text-sm"
          />
        </div>
        <div className="flex gap-4">
          <div className="flex items-center gap-2 ">
            <div>答え非表示</div>
            <HelpTooltip>
              答えを非表示にできます。
              <br />
              答えが表示されるはずの部分をクリックして、答えを表示できます。
            </HelpTooltip>
          </div>
          <Switch checked={hideAnswers} onCheckedChange={setHideAnswers} />
        </div>
      </div>
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
              >
                {row.getVisibleCells().map((cell) => {
                  return (
                    <TableCell
                      key={cell.id}
                      className={cn(
                        "h-auto p-2 md:h-[40px] md:px-4",
                        hideAnswers &&
                          hiddenAnswers.includes(cell.row.original.question) &&
                          cell.column.id === "answers" &&
                          "text-transparent",
                        cell.column.id === "checked" && "w-[40px] md:w-auto",
                      )}
                      onClick={handleClickCell(cell)}
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
