import React from "react";

// Badge Component
const Badge = ({ text, className }) => (
  <span
    className={`text-xs font-medium px-4 py-0.5 rounded-full border ${className}`}
  >
    {text}
  </span>
);

// ActionButtons Component
const ActionButtons = ({ actions }) => (
  <div className="flex items-center space-x-2">
    {actions.map((action, index) => (
      <a
        key={index}
        href={action.link}
        type="button"
        data-drawer-target={action.drawerTarget}
        data-drawer-show={action.drawerShow}
        data-drawer-placement={action.drawerPlacement}
        aria-controls={action.drawerTarget}
        className={`font-medium rounded flex items-center justify-center px-2 py-2 ${action.className}`}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox={action.svg.viewBox}
          strokeWidth={action.svg.strokeWidth}
          stroke="currentColor"
          className="w-4 h-4"
        >
          {action.svg.paths.map((path, pathIndex) => (
            <path
              key={pathIndex}
              strokeLinecap="round"
              strokeLinejoin="round"
              d={path}
            />
          ))}
        </svg>
      </a>
    ))}
  </div>
);

// Table Component
const Table = ({ headers = [], rows = [] }) => (
  <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
    <div className="relative w-full overflow-auto">
      <table className="w-full caption-bottom text-sm bg-white">
        {/* Header */}
        <thead className="[&_tr]:border-b uppercase bg-gray-200">
          <tr className="border-b hover:bg-muted/50">
            {headers.map((header, index) => (
              <th
                key={index}
                className="p-4 text-left align-middle font-bold text-muted-foreground"
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>

        {/* Body */}
        <tbody className="[&_tr:last-child]:border-0">
          {rows.map((row, rowIndex) => (
            <tr
              key={rowIndex}
              className="border-b transition-colors hover:bg-muted/50"
            >
              <td className="p-4 align-middle">
                <div className="flex flex-col leading-tight text-gr-700">
                  <label className="font-medium mb-2">{row.name}</label>
                  <label className="text-gray-500">{row.designation}</label>
                </div>
              </td>
              <td className="p-4 align-middle">
                <div className="flex flex-col leading-tight text-gr-700">
                  <label className="font-medium mb-2">{row.email}</label>
                  <label className="text-gray-500">{row.phone}</label>
                </div>
              </td>
              <td className="p-4">
                <div className="flex leading-tight text-gr-700">
                  <label className="font-medium">{row.date}</label>
                </div>
              </td>
              <td className="p-4">
                <div className="flex items-center leading-tight text-gr-700">
                  <label className="font-medium">{row.interviewsCount}</label>
                </div>
              </td>
              <td className="p-4">
                <Badge text={row.status.text} className={row.status.className} />
              </td>
              <td className="p-4">
                <ActionButtons actions={row.actions} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

export default Table;
