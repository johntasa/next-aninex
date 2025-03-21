"use client";
import TabLinks from "./TabLinks";

export default function Topbar() {
  return (
    <div className="fixed top-0 left-0 right-0 w-full bg-teal-700 text-white shadow-md z-50">
      <div className="container mx-auto p-4 flex items-center justify-between">
        <h1 className="text-xl font-bold sm:text-4xl cursor-default">
          ANINEX
        </h1>
        <TabLinks />
      </div>
    </div>
  );
}