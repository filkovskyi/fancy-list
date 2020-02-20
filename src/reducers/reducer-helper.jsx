const filterItemsByName = (data, param) => {
  if (!param) {
    return data
  }

  return data.filter(account => {
    let accountName = account.name.toLowerCase()
    return accountName.indexOf(param.toLowerCase()) !== -1
  })
}

const filterItemsByNumber = (data, param) => {
  if (param > 1) {
    return data.filter(account => {
      return account.accountNumber < param
    })
  } else {
    return data
  }
}

const maxAccountNumber = data => {
  return Math.max(
    ...data.map(account => {
      return account.accountNumber
    })
  )
}
export { filterItemsByName, filterItemsByNumber, maxAccountNumber }
