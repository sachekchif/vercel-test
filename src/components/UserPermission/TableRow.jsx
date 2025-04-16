import React from "react";
import Switch from "./Switch";

const TableRow = ({ feature, description, isChecked, onChange }) => (
  
  <tr className="bg-white border-b">
    <th
      scope="row"
      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
    >
      {feature}
    </th>
    <td className="px-6 py-4">{description}</td>
    <td className="px-6 py-4 text-right">
      <Switch feature={feature} isChecked={isChecked} onChange={onChange} />
    </td>
  </tr>
);

export default TableRow;