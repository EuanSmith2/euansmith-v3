"use client";
import { Printer } from "lucide-react";

export default function PrintButton() {
  return (
    <button
      onClick={() => window.print()}
      className="inline-flex items-center gap-2 rounded border border-gray-300 bg-white px-4 py-2 text-sm text-gray-600 shadow-sm hover:bg-gray-50 print:hidden"
    >
      <Printer className="size-4" />
      Print / Save as PDF
    </button>
  );
}
