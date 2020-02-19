import React from "react"
import { List, Typography } from 'antd';

const ItemList = data => {
  return data.data.map((item, key) => (
    <li key={item.id}>
      {item.accountName} and {item.accountNumber} and {item.vatRate}
    </li>
  ))
}

export { ItemList }
